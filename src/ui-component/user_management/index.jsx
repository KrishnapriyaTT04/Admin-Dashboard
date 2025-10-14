import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TableContainer, Table, TextField, InputAdornment, Button, Grid, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Add as AddIcon, FileDownloadOutlined as FileDownloadOutlinedIcon } from '@mui/icons-material';

import MainCard from 'ui-component/cards/MainCard';
import Pagination from 'utils/TablePagination';
import TableHead from 'utils/TableHead';
import TableRows from 'utils/TableRows';
import ViewFeedbackDetail from './viewUserDetail';
import ChangeStatusModal from '../common/commonStatusChange'; // <-- NEW IMPORT
// import UpdateForm from './addUser'; // <-- NEW IMPORT (Assuming this is your Add/Edit User Form)

import { getUsers, getUserCount,updateUser } from 'container/UsersContainer/slice'; // <-- ADD updateUser
import { usersHeads } from 'utils/TableConfig';
import styles from '../common/style';
import cmnStyles from '../common/style1';

export default function Users() {
  const theme = useTheme();
  const style = styles(theme);
  const cmnstyle = cmnStyles(theme);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false); // const [showDeleteModal, setShowDeleteModal] = useState(false); // <-- REMOVED
  // NEW STATE FOR EDIT AND STATUS CHANGE
  const [formOpen, setFormOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [getReqUrl, setGetReqUrl] = useState(''); // To refresh data after action
  // END NEW STATE
  const usersList = useSelector((state) => state.user?.list || []);
  const count = useSelector((state) => state.user?.listCount || 0);

  const { config, keys } = usersHeads;
  const countPagination = Math.ceil(count / limit); // Fetch users on mount and on page/search changes

  useEffect(() => {
    const filterObject = {
      limit,
      skip: page * limit,
      order: ['createdOn DESC'],
      where: searchQuery
        ? {
            fullName: { like: searchQuery, options: 'i' }
          }
        : {}
    };
    const reqUrl = `users?filter=${encodeURIComponent(JSON.stringify(filterObject))}`;
    setGetReqUrl(reqUrl); // <-- Save the request URL for post-action refresh
    dispatch(getUsers(reqUrl));
    dispatch(getUserCount());
  }, [dispatch, page, limit, searchQuery]); // Search handler

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset page when searching
  }; // Pagination handler

  const handlePageClick = (e) => {
    setPage(e.selected);
    const selectedPage = e.selected;
    const newSkip = selectedPage * limit;

    const filterObject = {
      limit,
      skip: newSkip,
      order: ['createdOn DESC'],
      where: searchQuery ? { fullName: { like: searchQuery, options: 'i' } } : {}
    };
    const reqUrl = `users?filter=${encodeURIComponent(JSON.stringify(filterObject))}`;
    setGetReqUrl(reqUrl);
    dispatch(getUsers(reqUrl));
  }; // View modal

  const handleViewModal = (item) => {
    setSelectedItem(item);
    setOpen(true);
  }; // EDIT ACTION HANDLERS
  const handleFormModal = (item) => {
    setSelectedItem(item);
    setFormOpen(true);
  }; // ADD ACTION HANDLER (Included for completeness, similar to Facility component)
  const handlProjectStatusModal = (userItem) => {
    setSelectedItem(userItem); // Save the user data
    setIsStatusModalOpen(true); // Open the modal
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedItem(null);
  };
  

  const handleUpdateStatus = (newStatus) => {
    let values = {
      status: newStatus,
      id: selectedItem.id
    }; // Dispatch the update action, passing the refresh URL
    dispatch(updateUser({ values, getReqestUrl: getReqUrl }));
    handleCloseStatusModal();
  }; // Delete modal (REMOVED: handleDeleteModal, closeDeleteModal, deleteHandler)

 return (
  <MainCard>
    {/* Header */}
    <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
      <Typography variant="h2" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
        Users
      </Typography>
    </Grid>

    {/* Search */}
    <Grid container sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', mt: 0, mb: 0 }}>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  pt: { xs: 1, md: 2 }  }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search by Name"
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

    {/* Table */}
    <TableContainer sx={{ mt: 0 }}>
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead
          keys={keys}
          config={config}
          sx={{
            '& th': {
              textAlign: 'center !important',
              paddingLeft: '0px',
              paddingRight: '0px'
            }
          }}
        />
        <TableRows
          data={usersList}
          keys={keys}
          config={config}
          currentPage={page + 1}
          tableLimit={limit}
          hasView
          hasEdit={false}
          hasDelete={false}
          hasStatusChange={true}
          handleViewModel={handleViewModal}
          handleFormModal={handleFormModal}
          handlProjectStatusModal={handlProjectStatusModal}
          tableData={usersList}
          filter={searchQuery || ''}
          sx={{
            '& td': {
              textAlign: 'center !important',
              paddingLeft: '0px',
              paddingRight: '0px'
            }
          }}
        />
      </Table>
    </TableContainer>

    {/* Pagination */}
    {countPagination > 1 && (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
        <Pagination page={page} countPagination={countPagination} handlePageClick={handlePageClick} />
      </Box>
    )}

    {/* View Modal */}
    {open && <ViewFeedbackDetail drawerOpen={open} setDrawerOpen={setOpen} item={selectedItem} />}

    {/* Edit/Add Form Modal */}
    {formOpen && (
      <UpdateForm
        drawerOpen={formOpen}
        setDrawerOpen={setFormOpen}
        item={selectedItem}
        setPage={setPage}
        getReqestUrl={getReqUrl}
      />
    )}

    {/* Status Change Modal */}
    {isStatusModalOpen && selectedItem && (
      <ChangeStatusModal
        open={isStatusModalOpen}
        facility={selectedItem}
        onClose={handleCloseStatusModal}
        onConfirm={handleUpdateStatus}
      />
    )}
  </MainCard>
);
}
