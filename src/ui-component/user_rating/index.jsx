import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TableContainer, Table, TextField, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

// Redux Slice
import { getRatings, getRatingCount } from 'container/RatingContainer/slice';

// Table Config
import { userRating } from 'utils/TableConfig';

// Components
import MainCard from 'ui-component/cards/MainCard';
import Pagination from 'utils/TablePagination';
import TableHead from 'utils/TableHead';
import TableRows from 'utils/TableRows';
import ViewRatingDetail from './viewRating';
import styles from '../common/style';
import cmnStyles from '../common/style1';

export default function UserRating() {
  const theme = useTheme();
  const style = styles(theme);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [open, setOpen] = useState(false);

  // Redux State
  const ratingsList = useSelector((state) => state.rating?.list || []);
  const count = useSelector((state) => state?.rating?.listCount || 0);
  // Table config
  const { config, keys } = userRating;

  // --- API Request Logic ---
  useEffect(() => {
    // Construct the filter object for the list API call
    const filterObject = {
      limit,
      skip: page * limit,
      order: ['createdOn DESC'],
      where: searchQuery
        ? {
            // Searching by facilityTitle, case-insensitive
            facilityTitle: { like: searchQuery, options: 'i' }
          }
        : {}
    };

    const encodedFilter = encodeURIComponent(JSON.stringify(filterObject));
    const reqUrl = `feedbacks?filter=${encodedFilter}`;
    
    // Construct the filter object for the count API call
    const countFilterObject = searchQuery
      ? {
          where: {
            facilityTitle: { like: searchQuery, options: 'i' }
          }
        }
      : {};

    const encodedCountFilter = encodeURIComponent(JSON.stringify(countFilterObject));
    const countUrl = `feedbacks/count?where=${encodedCountFilter}`;
    dispatch(getRatings(reqUrl)); 
    dispatch(getRatingCount());
  }, [dispatch, searchQuery, page, limit]);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPage(0); 
  };

  const handlePageClick = (e) => {
    setPage(e.selected);
  };
  // --- END API Request Logic ---

  const handleViewModal = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const countPagination = Math.ceil(count / limit);

  console.log("==countPagination", countPagination, count, limit);
  

  const displayedData = ratingsList.map((item) => {
    return {
      ...item,
      starRating: item.starRating
    };
  });

  return (
    <MainCard>
      {/* Header */}
      <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography variant="h2" component="h5" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
          Rating & Feedback
        </Typography>
      </Grid>

      {/* Search */}
      <Grid container sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', mt: 0 }}>
        <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search by Facility Title"
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
        <TableContainer sx={{ mt: 0 }}>
          <Table sx={{ minWidth: 650 }} aria-label="ratings table">
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
              data={displayedData}
              keys={keys}
              config={config}
              currentPage={page + 1}
              tableLimit={limit}
              hasView={true}
              hasEdit={false}
              hasDelete={false}
              hasStatusChange={false}
              hasMore={false}
              handleViewModel={handleViewModal}
              msg="Ratings"
              tableData={displayedData}
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

      {/* View Drawer */}
      {open && <ViewRatingDetail drawerOpen={open} setDrawerOpen={setOpen} item={selectedItem} />}
    </MainCard>
  );
}