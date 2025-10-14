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
import { FileUploadOutlined } from '@mui/icons-material';

import ChangeStatusModal from '../common/commonStatusChange'


// import { getEfType, deleteEfType, fetchEmissionFactorTypeXSL } from 'container/EmissionContainer/slice';
import { getFacilities, updateFacility, getFacilitiesCount} from 'container/FacilityContainer/slice';

import { facilityHeads } from 'utils/TableConfig';

const users = [
  { id: 1, name: 'Alice', age: 30, city: 'New York' },
  { id: 2, name: 'Bob', age: 24, city: 'London' },
  { id: 3, name: 'Charlie', age: 45, city: 'Paris' }
];
import MainCard from 'ui-component/cards/MainCard';
import Pagination from 'utils/TablePagination';
import TableHead from 'utils/TableHead';
import TableRows from 'utils/TableRows';
// import ConfirmModal from 'views/common/ConfirmModal';
import styles from '../common/style';
import UpdateForm from './addFacility';
import ViewFacilityDetail from './viewFacilityDetail';
import UploadBulkFile from './exportFileUpload';
import { Add as AddIcon } from '@mui/icons-material';
import cmnStyles from '../common/style1';

export default function Facility() {
  const theme = useTheme();
  const style = styles(theme);
  const cmnstyle = cmnStyles(theme);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showXSLUploadModal, setshowXSLUploadModal] = useState(false);
  const [showXSLModal, setShowXSLModal] = useState(false);
  const [getReqUrl, setGetReqUrl] = useState('');
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);


  const facilityList = useSelector((state) => state.facility?.list || []);


  let flattenedFacilityList = [];

  // const facilityList = useSelector(selectFacilityList);

  const count = useSelector((state) => state.facility?.listCount || 0);
  const isLoading = useSelector((state) => state.facility?.loading || false);
  // const count = useSelector((state) => state.emission?.efTypeListCount || 0);
  const emissionFactorTypeXSLList = useSelector((state) => state.emission?.emissionFactorTypeXSLList || []);
  let tableDataFilter = emissionFactorTypeXSLList.map((item, index) => ({
    slno: index + 1,
    name: item.name,
    desc: item.desc
  }));

  let countPagination = Math.ceil(count / limit);
  const { config, keys } = facilityHeads;

  // if(facilityList.length)

  //    flattenedFacilityList = facilityList.map(facility => ({
  //   id: facility.id,
  //   title: facility.title,
  //   email: facility.contactInfo?.email || 'N/A',
  //   phone: facility.contactInfo?.phone || 'N/A',
  //   // include other fields you need
  // }));

  const searchfilterObject = {
    limit: limit,
    skip: page,
    order: ['createdOn DESC'],
    where: {
      title: {
        // Note: The 'like' value must be escaped if it contains special characters,
        // but JSON.stringify handles basic string quoting.
        like: searchQuery,
        options: 'i' // Case-insensitive search
      }
    }
  };

  useEffect(() => {
    //deleted false
    let reqUrl = `facilities?filter={"limit":${limit},"skip":${page},"order":["createdOn DESC"]}`;
    let countUrl = `facilities/count`;
    setGetReqUrl(reqUrl);
    dispatch(getFacilitiesCount(countUrl));

    dispatch(getFacilities(reqUrl));
  }, [dispatch]);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filterObject = {
      limit: limit,
      skip: 0,
      order: ['createdOn DESC'],
      where: {
        title: {
          like: value,
          options: 'i'
        }
      }
    };

    const encodedFilter = encodeURIComponent(JSON.stringify(filterObject));
    let reqUrl = `facilities?filter=${encodedFilter}`;
    dispatch(getFacilities(reqUrl));
    setPage(0);
  };


  // Function to open the modal
  const handleStatusChangeModal = (facilityItem) => {
    console.log("--------------------------facilityItem----------------------",getReqUrl);
    
    setSelectedFacility(facilityItem); // Save the facility data
    setIsStatusModalOpen(true);        // Open the modal
  };

  // Function to close the modal
  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedFacility(null);
  };

    const handleUpdateStatus = (newStatus) => {
      // 💡 Implementation for updating status here
            console.log(`Updating facility 11${selectedFacility.id} to status: ${getReqUrl}`);

           let values ={
            "status": newStatus,
            "id":selectedFacility.id
           }
            dispatch(updateFacility({values,getReqestUrl:getReqUrl})); 
      
      console.log(`Updating facility ${selectedFacility.id} to status: ${getReqUrl}`);
      handleCloseStatusModal(); // Close after action
  };


  // function handleDownloadExcel() {
  //   setShowXSLModal(true);
  //   // dispatch(fetchEmissionFactorTypeXSL({ limit: count }));
  // }

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
    setShowXSLModal(false);
  };

  const handleViewModal = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleFormModal = (item) => {
    facilityList;
    const foundItem = facilityList.find((items) => items.id === item.id);
    setFormOpen(true);
    setSelectedItem(foundItem);
  };

  const handleAddFormModal = (item) => {
    setFormOpen(true);
    setSelectedItem({});
  };

  const handleExcelModal = (item) => {
    setShowXSLModal(true);
    // showXSLUploadModal(true);
    // setSelectedItem({});
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const newSkip = selectedPage * limit;
    setPage(selectedPage);
    let reqUrl = `facilities?filter={"limit":${limit},"skip":${newSkip},"order":["createdOn DESC"]}`;
    setGetReqUrl(reqUrl);
    dispatch(getFacilities(reqUrl));
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

  // console.log("Current facility list:", facilityList);

  return (
    <>
      <MainCard>
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
          <Typography variant="h2" component="h5" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
            Facilities
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
          {/* Left Button */}
          <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ ...cmnstyle.cmnBtn, ...cmnstyle.cmnBtnOutline, px: 3 }}
                onClick={handleAddFormModal}
              >
                Add
              </Button>
            </Box>
          </Grid>

          {/* Search Box */}
          <Grid item xs={12} sm={4} md={6} lg={6} xl={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: { xs: 1, md: 2 } }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search by Title"
                sx={{ maxWidth: 300, width: '100%' }}
                value={searchQuery}
                onChange={searchHandler}
                // onKeyDown={(e) => {
                //   if (!regex.test(e.key) && e.key !== 'Backspace') {
                //     e.preventDefault();
                //   }
                // }}
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

          {/* Export Button */}
          <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleExcelModal}
                startIcon={<FileUploadOutlined />}
                sx={{
                  color: '#242121',
                  backgroundColor: 'white',
                  borderColor: '#3dcd58',
                  width: '180px',
                  py: 1,
                  borderRadius: '30px',
                  whiteSpace: 'nowrap', // 🚀 keeps text in one line
                  textOverflow: 'ellipsis', // optional, trims if overflowing
                  overflow: 'hidden', // optional, prevents bulge
                  '&:hover': {
                    color: '#fcf9f9 !important',
                    backgroundColor: '#3dcd58',
                    borderColor: '#3dcd58'
                  },
                  '&:active': {
                    color: '#fcf9f9 !important',
                    backgroundColor: '#3dcd58',
                    borderColor: '#3dcd58'
                  }
                }}
              >
                Import Facilities
              </Button>
            </Box>
          </Grid>
        </Grid>
        {isLoading ? (
          <Typography>Loading facilities...</Typography>
        ) : facilityList.length > 0 ? (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="project table">
              <TableHead keys={keys} config={config} />
              <TableRows
                data={facilityList}
                keys={keys}
                config={config}
                currentPage={page + 1}
                tableLimit={limit}
                hasView={true}
                hasEdit={true}
                hasDelete={false}
                hasStatusChange={true}
                hasMore={false}
                handleViewModel={handleViewModal}
                // handleDeleteModal={handleDeleteModal}
                handleFormModal={handleFormModal}
                handlProjectStatusModal={handleStatusChangeModal}
                msg="Projects"
                tableData={facilityList}
                filter={searchQuery || ''}
              />
            </Table>
          </TableContainer>
        ) : (
          <Typography>No data found</Typography>
        )}
      {/* <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="project table">
            <TableHead keys={keys} config={config} />
            <TableRows
              data={facilityList}
              keys={keys}
              config={config}
              currentPage={page + 1}
              tableLimit={limit} 
              hasView={true}
              hasEdit={true}
              hasDelete={true}
              hasStatusChange={false}
              hasMore={false}
              handleViewModel={handleViewModal}
              handleDeleteModal={handleDeleteModal}
              handleFormModal={handleFormModal}
              msg="Projects"
              tableData={facilityList}
              filter={searchQuery || ''}
            />
          </Table>
        </TableContainer> */}
       
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
          {countPagination > 0 && <Pagination page={page} countPagination={countPagination} handlePageClick={handlePageClick} />}
        </Box>
        {open && <ViewFacilityDetail drawerOpen={open} setDrawerOpen={setOpen} item={selectedItem} />}

        {showXSLModal && <UploadBulkFile drawerOpen={showXSLModal} setDrawerOpen={setShowXSLModal} item={selectedItem} />}
        {formOpen && (
          <UpdateForm drawerOpen={formOpen} setDrawerOpen={setFormOpen} item={selectedItem} setPage={setPage} getReqestUrl={getReqUrl} />
        )}
        {selectedFacility && (
          <ChangeStatusModal
              open={isStatusModalOpen}
              facility={selectedFacility} 
              onClose={handleCloseStatusModal}
              onConfirm={handleUpdateStatus} // Pass the function to execute on confirm
          />
          
      )}
        {showDeleteModal && (
          <StatusChangeModal
              open={isStatusModalOpen}
              facility={selectedFacility} // Pass the selected data
              onClose={handleCloseStatusModal}
              onConfirm={handleUpdateStatus} // Pass the function to execute on confirm
          />
          // <ConfirmModal
          //   show={showDeleteModal}
          //   handleCloseModal={closeDeleteModal}
          //   submitHandler={deleteHandler}
          //   modalTitle={'Delete Confirmation'}
          //   modalText={'Are you sure you want to delete?'}
          //   btnsubmitText={'DELETE'}
          // />
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
