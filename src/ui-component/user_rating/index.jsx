import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TableContainer, Table, TextField, InputAdornment, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Add as AddIcon } from '@mui/icons-material';

// Redux Slice
import { getRatings } from 'container/RatingContainer/slice';

// Table Config for Ratings
import { userFeedback } from 'utils/TableConfig';

// Components
import MainCard from 'ui-component/cards/MainCard';
import Pagination from 'utils/TablePagination';
import TableHead from 'utils/TableHead';
import TableRows from 'utils/TableRows';
// import ConfirmModal from 'views/common/ConfirmModal';
import styles from '../common/style';
import cmnStyles from '../common/style1';

export default function UserRating() {
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

  // Redux State
  const ratingsList = useSelector((state) => state.rating?.list || []);
  const count = ratingsList.length; // If you have totalCount in API, replace here

  // Table config
  const { config, keys } = userFeedback;

  // Dispatch ratings
  useEffect(() => {
    dispatch(getRatings());
  }, [searchQuery]);

  // Search handler
  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPage(0);
  };

  // Export handler
  function handleDownloadExcel() {
    setshowXSLModal(true);
  }

  const XSLHandler = () => {
    excelExport();
    closeXSLModal();
  };

  const header = ['SL.NO', 'User', 'Feedback', 'Rating'];
  function excelExport() {
    // Replace with your export util
    // downloadExcel({ fileName: 'Ratings', sheet: 'Ratings', tablePayload: { header, body: ratingsList } });
  }

  const closeXSLModal = () => {
    setshowXSLModal(false);
  };

  // View modal
  const handleViewModal = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  // Edit form modal
  const handleFormModal = (item) => {
    setFormOpen(true);
    setSelectedItem(item);
  };

  // Add form modal
  const handleAddFormModal = () => {
    setFormOpen(true);
    setSelectedItem({});
  };

  // Pagination
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
  };

  // Delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedItem(item);
  };

  const deleteHandler = () => {
    // dispatch(deleteRating(selectedItem));
    setPage(0);
    closeDeleteModal();
  };

  let countPagination = Math.ceil(count / 10);

  return (
    <>
      <MainCard>
        {/* Header */}
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
          <Typography variant="h2" component="h5" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
            Ratings
          </Typography>
        </Grid>

        {/* Actions Row */}
        <Grid container spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
          {/* Add Button */}
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
                placeholder="Search by feedback"
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

          {/* Export Button */}
          <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleDownloadExcel}
                startIcon={<FileDownloadOutlinedIcon />}
                sx={{
                  color: '#242121',
                  backgroundColor: 'white',
                  borderColor: '#3dcd58',
                  width: '180px',
                  py: 1,
                  borderRadius: '30px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
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
                Export to Excel
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="ratings table">
            <TableHead keys={keys} config={config} />
            <TableRows
              data={ratingsList}
              keys={keys}
              config={config}
              currentPage={page + 1}
              hasView={true}
              hasEdit={true}
              hasDelete={true}
              hasStatusChange={false}
              hasMore={false}
              handleViewModel={handleViewModal}
              handleDeleteModal={handleDeleteModal}
              handleFormModal={handleFormModal}
              msg="Ratings"
              tableData={ratingsList}
              filter={searchQuery || ''}
            />
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
          {countPagination > 1 && <Pagination page={page} countPagination={countPagination} handlePageClick={handlePageClick} />}
        </Box>

        {/* Delete Confirmation */}
        {showDeleteModal && (
          <ConfirmModal
            show={showDeleteModal}
            handleCloseModal={closeDeleteModal}
            submitHandler={deleteHandler}
            modalTitle={'Delete Confirmation'}
            modalText={'Are you sure you want to delete this rating?'}
            btnsubmitText={'DELETE'}
          />
        )}

        {/* XSL Confirmation */}
        {/* {showXSLModal && (
          <ConfirmModal
            show={showXSLModal}
            handleCloseModal={closeXSLModal}
            submitHandler={XSLHandler}
            modalTitle={'Download Confirmation'}
            modalText={'Are you sure you want to download ratings?'}
            btnsubmitText={'DOWNLOAD'}
          />
        )} */}
      </MainCard>
    </>
  );
}
