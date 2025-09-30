import React, { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { TableContainer, Table, TextField, InputAdornment, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Add as AddIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import cmnstyles from '../common/style';

// --- DUMMY/MOCK IMPORTS FOR MISSING COMPONENTS/DATA ---

// Mock regex for input validation (allowing letters and spaces for search)
const regex = /^[a-zA-Z\s]*$/;

// Mock data/config
const CountryData = {
  keys: ['id', 'name', 'code', 'action'],
  config: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Country Name' },
    { key: 'code', label: 'Code' },
    { key: 'action', label: 'Actions' },
  ],
};
const { config, keys } = CountryData;

// Mock components
const MainCard = ({ children }) => <Box sx={{ p: 3, border: '1px solid #ccc' }}>{children}</Box>;
const Pagination = ({ countPagination }) => <Typography variant="caption">Pagination: {countPagination} pages</Typography>;

// Mock TableHead and TableRows (necessary for JSX to compile)
const TableHead = ({ keys, config }) => (
  <thead>
    <tr>
      {config.map(col => <th key={col.key} style={{ textAlign: 'left', padding: '16px' }}>{col.label}</th>)}
    </tr>
  </thead>
);

const TableRows = ({ data, msg, filter }) => {
  if (data.length === 0) {
    return (
      <tr>
        <td colSpan={10} style={{ textAlign: 'center', padding: '20px' }}>
          <Typography variant="subtitle1" color="text.secondary">
            No {msg} Found {filter && `for "${filter}"`}.
          </Typography>
        </td>
      </tr>
    );
  }
  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          <td style={{ padding: '16px' }}>{row.name}</td>
          <td style={{ padding: '16px' }}>{row.code}</td>
          {/* ... other cells based on keys */}
        </tr>
      ))}
    </tbody>
  );
};
// -----------------------------------------------------------------------


export default function LandingPage() {
  // Use the actual MUI theme or fall back to a dummy one if hook fails (unlikely in a running app)
  const theme = useTheme() || dummyTheme; 
  
  // Dummy styles function declaration is moved out, but here for completeness:
  const styles = (theme) => ({
    root: { padding: theme.spacing(2) },
    searchBox: { paddingLeft: theme.spacing(1), borderRadius: '4px' } // Added mock searchBox style
  });

  const cmnStyles = (theme) => ({
    cmnBtn: { minWidth: 'auto', textTransform: 'none' }, // Added mock cmnBtn
    cmnBtnOutline: { borderColor: theme.palette.primary.main, color: theme.palette.primary.main }, // Added mock cmnBtnOutline
    tableCell: { padding: theme.spacing(1) },
  });

  // Now, initialize the style objects using the theme
  const style = useMemo(() => styles(theme), [theme]);
  const cmnstyle = useMemo(() => cmnStyles(theme), [theme]);


  // --- REDUX MOCKING ---
  // Mock useDispatch and useSelector since Redux is not set up here
  const dispatch = useDispatch || (() => console.log('Dispatch Called'));

  // Mock Redux state structure
  const mockReduxState = {
    additionalMasterData: {
      countryList: [
        { id: 'C1', name: 'India', code: 'IN' },
        { id: 'C2', name: 'United States', code: 'US' },
        { id: 'C3', name: 'Canada', code: 'CA' },
         { id: 'C1', name: 'India', code: 'IN' },
        { id: 'C2', name: 'United States', code: 'US' },
        { id: 'C3', name: 'Canada', code: 'CA' },
         { id: 'C1', name: 'India', code: 'IN' },
        { id: 'C2', name: 'United States', code: 'US' },
        { id: 'C3', name: 'Canada', code: 'CA' },
         { id: 'C1', name: 'India', code: 'IN' },
        { id: 'C2', name: 'United States', code: 'US' },
        { id: 'C3', name: 'Canada', code: 'CA' },
         { id: 'C1', name: 'India', code: 'IN' },
        { id: 'C2', name: 'United States', code: 'US' },
        { id: 'C3', name: 'Canada', code: 'CA' },
      ],
      countries: {
        count: 3, // Mock total count
      },
    },
  };
  
  const countryList = useSelector(state => mockReduxState.additionalMasterData?.countryList || []);
  const count = useSelector(state => mockReduxState.additionalMasterData?.countries.count || 0);

  // ----------------------------------------------------


  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState('');
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let countPagination = Math.ceil(count / 10);

  useEffect(() => {
    // dispatch(getCountries({ searchVal: searchQuery, page: page + 1 }));
    console.log(`Fetching countries for search: "${searchQuery}" on page: ${page + 1}`);
  }, [searchQuery, page]); // Dependency added: page

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPage(0);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
    // dispatch(getCountries({ searchVal: searchQuery, page: selectedPage + 1 }));
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

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedItem(item);
  };

  const deleteHandler = () => {
    // dispatch(deleteCountries(selectedItem));
    console.log('Delete called for:', selectedItem);
    setPage(0);
    closeDeleteModal();
  };

  return (
    <>
      <MainCard>
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
          <Typography variant="h2" component="h5" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
            Users
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
          <Grid item xs={12} lg={3} xl={3} md={3} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                // Apply the mock styles
                sx={{ ...cmnstyle.cmnBtn, ...cmnstyle.cmnBtnOutline, px: 3 }} 
                onClick={handleAddFormModal}
              >
                Add
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6} xl={6} md={6} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '28px' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search by name"
                sx={{ maxWidth: 300 }}
                value={searchQuery}
                onChange={searchHandler}
                onKeyDown={(e) => {
                  // The regex check was missing
                  if (!regex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                    e.preventDefault();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  // Apply the mock style
                  sx: style.searchBox 
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={3} xl={3} md={3} sm={3}></Grid>
        </Grid>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="project table">
            <TableHead keys={keys} config={config} />
            <TableRows
              data={countryList}
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
              msg="Countries" // Changed from 'Projects' for context
              tableData={countryList}
              filter={searchQuery || ''}
            />
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
          {countPagination > 1 && <Pagination page={page} countPagination={countPagination} handlePageClick={handlePageClick} />}
        </Box>
      </MainCard>
    </>
  );
}