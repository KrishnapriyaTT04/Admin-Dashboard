import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TableContainer, Table, TextField, InputAdornment, Button, Typography, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Add as AddIcon } from '@mui/icons-material';

import MainCard from 'ui-component/cards/MainCard';
import Pagination from 'utils/TablePagination';
import TableHead from 'utils/TableHead';
import TableRows from 'utils/TableRows';
import styles from '../common/style';
import cmnStyles from '../common/style1';
import { userFeedback } from 'utils/TableConfig';
import { getRatings, selectRatingList, selectRatingListLoading, selectRatingListError } from 'container/RatingContainer/slice';

export default function UserRating() {
  const theme = useTheme();
  const style = styles(theme);
  const cmnstyle = cmnStyles(theme);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Redux state
  const ratings = useSelector(selectRatingList);
  const loading = useSelector(selectRatingListLoading);
  const error = useSelector(selectRatingListError);

  const { config, keys } = userFeedback;

  useEffect(() => {
    dispatch(getRatings());
  }, [dispatch]);

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleViewModal = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleFormModal = (item) => {
    setFormOpen(true);
    setSelectedItem(item);
  };

  const handleAddFormModal = () => {
    setFormOpen(true);
    setSelectedItem({});
  };

  const handlePageClick = (e) => {
    setPage(e.selected);
  };

  const closeDeleteModal = () => setShowDeleteModal(false);

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedItem(item);
  };

  const deleteHandler = () => {
    // Implement delete logic here
    setPage(0);
    closeDeleteModal();
  };

  // Filter ratings based on search
  const filteredRatings = ratings.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const countPagination = Math.ceil(filteredRatings.length / 10);

  return (
    <MainCard>
      <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography variant="h2" component="h5" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
          Ratings
        </Typography>
      </Grid>

      <Grid container spacing={2} sx={{ width: '100%', alignItems: 'center', my: 2 }}>
        {/* Add Button */}
        <Grid item xs={12} sm={4} md={3}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
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
        <Grid item xs={12} sm={4} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search by any field"
              value={searchQuery}
              onChange={searchHandler}
              sx={{ maxWidth: 300 }}
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
        <Grid item xs={12} sm={4} md={3}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Button
              variant="outlined"
              startIcon={<FileDownloadOutlinedIcon />}
              sx={{
                color: '#242121',
                backgroundColor: 'white',
                borderColor: '#3dcd58',
                width: '180px',
                py: 1,
                borderRadius: '30px',
                '&:hover': { color: '#fcf9f9 !important', backgroundColor: '#3dcd58', borderColor: '#3dcd58' },
                '&:active': { color: '#fcf9f9 !important', backgroundColor: '#3dcd58', borderColor: '#3dcd58' }
              }}
              onClick={() => {}}
            >
              Export to Excel
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Table / Messages */}
      {loading ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6">Loading ratings...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="error">{error.message || 'Failed to load ratings.'}</Typography>
        </Box>
      ) : filteredRatings.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6">No ratings found.</Typography>
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead keys={keys} config={config} />
              <TableRows
                data={filteredRatings}
                keys={keys}
                config={config}
                currentPage={page + 1}
                hasView={true}
                hasEdit={true}
                hasDelete={true}
                handleViewModel={handleViewModal}
                handleDeleteModal={handleDeleteModal}
                handleFormModal={handleFormModal}
                tableData={filteredRatings}
                filter={searchQuery || ''}
              />
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
            {countPagination > 1 && <Pagination page={page} countPagination={countPagination} handlePageClick={handlePageClick} />}
          </Box>
        </>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && (
        <ConfirmModal
          show={showDeleteModal}
          handleCloseModal={closeDeleteModal}
          submitHandler={deleteHandler}
          modalTitle="Delete Confirmation"
          modalText="Are you sure you want to delete?"
          btnsubmitText="DELETE"
        />
      )}
    </MainCard>
  );
}
