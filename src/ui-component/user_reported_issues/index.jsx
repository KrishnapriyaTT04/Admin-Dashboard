import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TableContainer, Table, TextField, InputAdornment, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

import { getIssueReports, getIssuesCount } from 'container/ReportIssuesContainer/slice';
import { updIssueStts } from 'container/ReportIssuesContainer/slice';

import { userReport } from 'utils/TableConfig';

import MainCard from 'ui-component/cards/MainCard';
import EditIssueComment from './EditIssueComment';
import Pagination from 'utils/TablePagination';
import TableHead from 'utils/TableHead';
import TableRows from 'utils/TableRows';
import styles from '../common/style';
import ViewReport from './viewReport';
import cmnStyles from '../common/style1';
import ChangeStatusModal from '../common/commonStatusChange';

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
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showXSLModal, setshowXSLModal] = useState(false);
  const [limit, setLimit] = useState(20);
  const [getReqUrl, setGetReqUrl] = useState('');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const issueList = useSelector((state) => state?.reportIssue?.list);
  const count = useSelector((state) => state.reportIssue?.listCount || 0);
  const emissionFactorTypeXSLList = useSelector((state) => state.emission?.emissionFactorTypeXSLList || []);
  let tableDataFilter = emissionFactorTypeXSLList.map((item, index) => ({
    slno: index + 1,
    name: item.name,
    desc: item.desc
  }));
  let countPagination = Math.ceil(count / limit);
  const { config, keys } = userReport;

  useEffect(() => {
    let reqUrl = `issues?filter={"limit":${limit},"skip":${page},"order":["createdOn DESC"]}`;
    setGetReqUrl(reqUrl);
    dispatch(getIssueReports(reqUrl));
    dispatch(getIssuesCount());
  }, []);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filterObject = {
      limit: limit,
      skip: 0,
      order: ['createdOn DESC'],
      where: {
        reportedByName: {
          like: value,
          options: 'i'
        }
      }
    };

    const encodedFilter = encodeURIComponent(JSON.stringify(filterObject));
    let reqUrl = `issues?filter=${encodedFilter}`;
    dispatch(getIssueReports(reqUrl));
    setPage(0);
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

  const handleViewModal = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleFormModal = (item) => {
    setFormOpen(true);
    setSelectedItem(item);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const newSkip = selectedPage * limit;
    setPage(selectedPage);
    let reqUrl = `issues?filter={"limit":${limit},"skip":${newSkip},"order":["createdOn DESC"]}`;
    setGetReqUrl(reqUrl);
    dispatch(getIssueReports(reqUrl));
  };

  const handlProjectStatusModal = (userItem) => {
    setSelectedItem(userItem);
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedItem(null);
  };

  const handleUpdateStatus = (newStatus) => {
    let values = {
      id: selectedItem.id
    };
    dispatch(updIssueStts({ values, getReqestUrl: getReqUrl }));
    handleCloseStatusModal();
  };

  return (
    <>
      <MainCard>
          <Typography variant="h2" component="h5" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
            Reported Issues
          </Typography>

        <Grid
          container
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: { xs: 1, md: 2 } }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search by Reported User"
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
              hasComment={true}
              hasDelete={false}
              hasStatusChange={true}
              hasMore={false}
              handleViewModel={handleViewModal}
              // handleDeleteModal={handleDeleteModal}
              handleFormModal={handleFormModal}
              handlProjectStatusModal={handlProjectStatusModal}
              msg="Projects"
              tableData={issueList}
              filter={searchQuery || ''}
            />
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
          {countPagination > 0 && <Pagination page={page} countPagination={countPagination} handlePageClick={handlePageClick} />}
        </Box>
        {open && <ViewReport drawerOpen={open} setDrawerOpen={setOpen} item={selectedItem} />}

        {/* Status Change Modal */}
        {isStatusModalOpen && selectedItem && (
          <ChangeStatusModal
            open={isStatusModalOpen}
            facility={selectedItem}
            onClose={handleCloseStatusModal}
            onConfirm={handleUpdateStatus}
            title="Change Issue Status"
          />
        )}

        {formOpen && (
          <EditIssueComment drawerOpen={formOpen} setDrawerOpen={setFormOpen} item={selectedItem} setPage={setPage} getReqUrl={getReqUrl} />
        )}
      </MainCard>
    </>
  );
}
