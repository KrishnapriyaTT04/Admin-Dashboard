import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TableContainer, Table, TextField, InputAdornment, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { downloadExcel } from 'react-export-table-to-excel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


 import { getIssueReports }from 'container/ReportIssuesContainer/slice';

// import { getEfType, deleteEfType, fetchEmissionFactorTypeXSL } from 'container/EmissionContainer/slice';
 import { userReport } from 'utils/TableConfig';


import MainCard from 'ui-component/cards/MainCard';
import Pagination from 'utils/TablePagination';
import TableHead from 'utils/TableHead';
import TableRows from 'utils/TableRows';
// import ConfirmModal from 'views/common/ConfirmModal';
import styles from '../common/style';
// import EFTypeView from './efTypeView';
import ViewReport from './viewReport';
// import UpdateEfTypeForm from './updateForm';
import { Add as AddIcon } from '@mui/icons-material';
import cmnStyles from '../common/style1';

export default function userReportedIssues() {
  const theme = useTheme();
  const style = styles(theme);
  const cmnstyle = cmnStyles(theme);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showXSLModal, setshowXSLModal] = useState(false);
   const [limit, setLimit] = useState(5);

  // const efTypeList = useSelector((state) => state.emission?.efTypeList || []);
  const issueList = useSelector((state) =>state?.reportIssue?.list);
  const count = useSelector((state) => state.emission?.efTypeListCount || 0);
  const emissionFactorTypeXSLList = useSelector((state) => state.emission?.emissionFactorTypeXSLList || []);
  let tableDataFilter = emissionFactorTypeXSLList.map((item, index) => ({
    slno: index + 1,
    name: item.name,
    desc: item.desc
  }));
  let countPagination = Math.ceil(count / 10);
  const { config, keys } = userReport;

console.log("==count", count);

  useEffect(() => {
    
     dispatch(getIssueReports());
    // dispatch(getEfType({ searchVal: searchQuery, page: page + 1 }));
  }, [searchQuery]);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPage(0);
  };

  function handleDownloadExcel() {
    setshowXSLModal(true);
    // dispatch(fetchEmissionFactorTypeXSL({ limit: count }));
  }

  const XSLHandler = () => {
    excelExport();
    closeXSLModal();
  };
  const header = ['SL.NO', 'Name', 'Description'];
  function excelExport() {
    downloadExcel({
      fileName: 'Emission Factor Type',
      sheet: 'Emission Factor Type',
      tablePayload: {
        header,
        body: tableDataFilter
      }
    });
  }

  const closeXSLModal = () => {
    setshowXSLModal(false);
  };

  const handleViewModal = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleFormModal = (item) => {
    setFormOpen(true);
    setSelectedItem(item);
  };

  const handleAddFormModal = (item) => {
    setFormOpen(true);
    setSelectedItem({});
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
    // dispatch(
    //   getEfType({
    //     page: selectedPage + 1,
    //     searchVal: searchQuery
    //   })
    // );
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedItem(item);
  };

  const deleteHandler = () => {
    // dispatch(deleteEfType(selectedItem));
    setPage(0);
    closeDeleteModal();
  };

  return (
    <>
      <MainCard>
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
          <Typography variant="h2" component="h5" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
            Report Issues
          </Typography>
        </Grid>
       <Grid 
  container 
  sx={{ 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center', 
 
  }}
>
  <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Search by name"
        sx={{ maxWidth: 300, width: '100%' }}
        value={searchQuery}
        onChange={searchHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: style.searchBox
        }}
      />
    </Box>
  </Grid>
</Grid>


        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="project table">
            <TableHead keys={keys} config={config} />
            <TableRows
              data={issueList}
              keys={keys}
              config={config}
               tableLimit={limit} 
              currentPage={page + 1}
              hasView={true}
              hasEdit={false}
              hasDelete={false}
              hasStatusChange={false}
              hasMore={false}
              handleViewModel={handleViewModal}
              handleDeleteModal={handleDeleteModal}
              handleFormModal={handleFormModal}
              msg="Projects"
              tableData={issueList}
              filter={searchQuery || ''}
            />
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
          {countPagination > 1 && <Pagination page={page} countPagination={countPagination} handlePageClick={handlePageClick} />}
        </Box>
         {open && <ViewReport drawerOpen={open} setDrawerOpen={setOpen} item={selectedItem} />}
        {/* {formOpen && <UpdateEfTypeForm drawerOpen={formOpen} setDrawerOpen={setFormOpen} item={selectedItem} setPage={setPage} />} */}
        {showDeleteModal && (
          <ConfirmModal
            show={showDeleteModal}
            handleCloseModal={closeDeleteModal}
            submitHandler={deleteHandler}
            modalTitle={'Delete Confirmation'}
            modalText={'Are you sure you want to delete?'}
            btnsubmitText={'DELETE'}
          />
        )}
        {/* {showXSLModal && (
          <ConfirmModal
            show={showXSLModal}
            handleCloseModal={closeXSLModal}
            submitHandler={XSLHandler}
            modalTitle={'Download Confirmation'}
            modalText={'Are you sure you want to download?'}
            btnsubmitText={'DOWNLOAD'}
          />
        )} */}
      </MainCard>
    </>
  );
}