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
// import ConfirmModal from 'views/common/ConfirmModal';

import { getUsers } from 'container/UsersContainer/slice';
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
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const usersList = useSelector((state) => state.user?.list || []);
  const count = useSelector((state) => state.user?.listCount || 0);

  const { config, keys } = usersHeads;
  const countPagination = Math.ceil(count / limit);

  // Fetch users on mount and on page/search changes
  useEffect(() => {
    const filterObject = {
      limit,
      skip: page * limit,
      order: ['createdOn DESC'],
      where: searchQuery
        ? {
            fullName: { like: searchQuery, options: 'i' },
          }
        : {},
    };
    const reqUrl = `users?filter=${encodeURIComponent(JSON.stringify(filterObject))}`;
    dispatch(getUsers(reqUrl));
  }, [dispatch, page, limit, searchQuery]);

  // Search handler
  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset page when searching
  };

  // Pagination handler
  const handlePageClick = (e) => {
    setPage(e.selected);
  };

  // View modal
  const handleViewModal = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  // Delete modal
  const handleDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const deleteHandler = () => {
    // dispatch(deleteUser(selectedItem.id)); // Implement your delete API call
    setShowDeleteModal(false);
    setPage(0);
  };

  return (
    <MainCard>
      <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography variant="h2" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
          Users
        </Typography>
      </Grid>

      {/* Search */}
      <Grid container spacing={2} sx={{ width: '100%', alignItems: 'center',justifyContent:'center'}}>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search by name"
            value={searchQuery}
            onChange={searchHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: style.searchBox,
            }}
          />
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer sx={{ mt: 2}}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead keys={keys} config={config} />
          <TableRows
            data={usersList}
            keys={keys}
            config={config}
            currentPage={page + 1}
            tableLimit={limit}
            hasView
            hasEdit={false}
            hasDelete
            handleViewModel={handleViewModal}
            handleDeleteModal={handleDeleteModal}
            tableData={usersList}
            filter={searchQuery || ''}
          />
        </Table>
      </TableContainer>

      {/* Pagination */}
      {countPagination > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination page={page} countPagination={countPagination} handlePageClick={handlePageClick} />
        </Box>
      )}

      {/* View Modal */}
      {open && <ViewFeedbackDetail drawerOpen={open} setDrawerOpen={setOpen} item={selectedItem} />}

      {/* Delete Modal */}
      {/* {showDeleteModal && (
        <ConfirmModal
          show={showDeleteModal}
          handleCloseModal={closeDeleteModal}
          submitHandler={deleteHandler}
          modalTitle="Delete Confirmation"
          modalText="Are you sure you want to delete this user?"
          btnsubmitText="DELETE"
        />
      )} */}
    </MainCard>
  );
}
