import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TableContainer, Table, TextField, InputAdornment, Button, IconButton, RadioGroup, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
// import { downloadExcel } from 'react-export-table-to-excel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { FileUploadOutlined } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import { districtsData } from '../common/district';
import ChangeStatusModal from '../common/commonStatusChange';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

// import { getEfType, deleteEfType, fetchEmissionFactorTypeXSL } from 'container/EmissionContainer/slice';
import { getFacilities, updateFacility, getFacilitiesCount } from 'container/FacilityContainer/slice';

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
  const primary = '#039123';
  const lightGreen = '#e8f5e9';
  const textDark = '#364152';
  const bgSoft = '#f7faf9';

  const theme = useTheme();
  const style = styles(theme);
  const cmnstyle = cmnStyles(theme);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [currentFilter, setCurrentFilter] = useState({
    limit,
    skip: 0,
    order: ['createdOn DESC'],
    where: {}
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showXSLUploadModal, setshowXSLUploadModal] = useState(false);
  const [showXSLModal, setShowXSLModal] = useState(false);
  const [getReqUrl, setGetReqUrl] = useState('');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const isFilterApplied = selectedDistricts.length > 0 || selectedStatus.length > 0;

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

  const handleToggleDistrict = (districtLabel) => {
    setSelectedDistricts((prev) => {
      if (prev.includes(districtLabel)) {
        return prev.filter((d) => d !== districtLabel);
      } else {
        return [...prev, districtLabel];
      }
    });
  };

  const handleToggleStatus = (value) => {
    setSelectedStatus((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const [filters, setFilters] = useState({
    search: '',
    districts: []
  });

  // const handleClearDistricts = () => {
  //   setSelectedDistricts([]);

  //   // remove only the district filter, preserve others
  //   const newWhere = { ...(currentFilter.where || {}) };
  //   delete newWhere.district;

  //   const newFilter = {
  //     ...currentFilter,
  //     skip: 0,
  //     where: newWhere
  //   };

  //   setCurrentFilter(newFilter);
  //   setPage(0);
  // };

  // const searchfilterObject = {
  //   limit: limit,
  //   skip: page,
  //   order: ['createdOn DESC'],
  //   where: {
  //     title: {
  //       like: searchQuery,
  //       options: 'i'
  //     }
  //   }
  // };

  const handleClearFilters = () => {
    setSelectedDistricts([]);
    setSelectedStatus([]);

    const newFilter = {
      ...currentFilter,
      skip: 0,
      where: {}
    };

    setCurrentFilter(newFilter);
    setPage(0);
  };

  const handleApplyFilter = () => {
    const newWhere = { ...(currentFilter.where || {}) };

    // Districts
    if (selectedDistricts.length > 0) {
      newWhere.district = { inq: selectedDistricts };
    } else {
      delete newWhere.district;
    }

    // Status (MULTI)
    if (selectedStatus.length > 0) {
      newWhere.status = { inq: selectedStatus };
    } else {
      delete newWhere.status;
    }

    const newFilter = {
      ...currentFilter,
      limit,
      skip: 0,
      where: newWhere
    };

    setCurrentFilter(newFilter);
    setPage(0);
    setFilterDrawerOpen(false);
  };

  useEffect(() => {
    // build list URL from currentFilter
    const encodedFilter = encodeURIComponent(JSON.stringify(currentFilter));
    const reqUrl = `facilities?filter=${encodedFilter}`;
    setGetReqUrl(reqUrl);

    // build count URL — if there is a where clause send it to count endpoint
    const where = currentFilter.where || {};
    const hasWhere = where && Object.keys(where).length > 0;
    const countUrl = hasWhere ? `facilities/count?where=${encodeURIComponent(JSON.stringify(where))}` : `facilities/count`;

    // fetch list & count
    dispatch(getFacilitiesCount(countUrl));
    dispatch(getFacilities(reqUrl));
  }, [dispatch, currentFilter]);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // make a new where that preserves any other filters (like district) and adds/overwrites title
    const newWhere = { ...(currentFilter.where || {}) };

    if (value && value.trim() !== '') {
      newWhere.title = { like: value, options: 'i' };
    } else {
      // remove title filter if search cleared
      delete newWhere.title;
    }

    const newFilter = {
      ...currentFilter,
      limit,
      skip: 0, // reset to first page for new search
      where: newWhere
    };

    setCurrentFilter(newFilter);
    setPage(0);
  };

  // Function to open the modal
  const handleStatusChangeModal = (facilityItem) => {
    setSelectedFacility(facilityItem); // Save the facility data
    setIsStatusModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedFacility(null);
  };

  const handleUpdateStatus = (newStatus) => {
    // 💡 Implementation for updating status here
    console.log(`Updating facility 11${selectedFacility.id} to status: ${getReqUrl}`);

    let values = {
      status: newStatus,
      id: selectedFacility.id
    };
    dispatch(updateFacility({ values, getReqestUrl: getReqUrl }));

    console.log(`Updating facility ${selectedFacility.id} to status: ${getReqUrl}`);
    handleCloseStatusModal(); // Close after action
  };

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

    const newFilter = {
      ...currentFilter,
      skip: newSkip,
      limit
    };

    setCurrentFilter(newFilter);
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<StarIcon key={i} sx={{ color: '#FFD700', fontSize: '18px' }} />);
      } else if (rating >= i - 0.5) {
        stars.push(<StarHalfIcon key={i} sx={{ color: '#FFD700', fontSize: '18px' }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: '#FFD700', fontSize: '18px' }} />);
      }
    }

    return <Box sx={{ display: 'flex', justifyContent: 'left' }}>{stars}</Box>;
  };

  const displayedData = facilityList.map((item) => {
    return {
      ...item,
      avgStarRating: renderStars(item.avgStarRating)
    };
  });

  return (
    <>
      <MainCard>
        <Typography variant="h2" component="h5" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
          Facilities
        </Typography>

        <Grid container spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
          {/* Left Button */}
          <Grid item xs={6} sm={3}>
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
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: { xs: 1, md: 2 } }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search by Title"
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

          {/* FILTER BUTTON - NEW */}
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  sx={{
                    ...cmnstyle.cmnBtn,
                    ...cmnstyle.cmnBtnOutline,
                    px: 3,
                    position: 'relative' // important: makes dot stay inside
                  }}
                  onClick={() => setFilterDrawerOpen(true)}
                >
                  Filter
                </Button>

                {isFilterApplied && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 4, // inside button, near top edge
                      right: 10, // inside button, near right border
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#FF3B30',
                      border: '2px solid white',
                      boxShadow: '0 0 3px rgba(0,0,0,0.15)'
                    }}
                  />
                )}
              </Box>
            </Box>
          </Grid>

          {/* Export Button */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Button
                variant="outlined"
                onClick={handleExcelModal}
                startIcon={<FileUploadOutlined />}
                sx={{ ...cmnstyle.cmnBtn, ...cmnstyle.cmnBtnOutline, px: 3 }}
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
                data={displayedData}
                keys={keys}
                config={config}
                currentPage={page + 1}
                tableLimit={limit}
                hasView={true}
                hasComment={false}
                hasEdit={true}
                hasDelete={false}
                hasStatusChange={true}
                hasMore={false}
                handleViewModel={handleViewModal}
                // handleDeleteModal={handleDeleteModal}
                handleFormModal={handleFormModal}
                handlProjectStatusModal={handleStatusChangeModal}
                msg="Projects"
                tableData={displayedData}
                filter={searchQuery || ''}
              />
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ textAlign: 'center' }}>No data found</Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
          {countPagination > 0 && <Pagination page={page} countPagination={countPagination} handlePageClick={handlePageClick} />}
        </Box>
        {open && <ViewFacilityDetail drawerOpen={open} setDrawerOpen={setOpen} item={selectedItem} currentFilter={currentFilter} />}

        {showXSLModal && (
          <UploadBulkFile drawerOpen={showXSLModal} setDrawerOpen={setShowXSLModal} item={selectedItem} getReqestUrl={getReqUrl} />
        )}

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
        )}
      </MainCard>
      {/* FILTER DRAWER */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 750, md: 820 }, // ⬅️ WIDER, clean layout
            backgroundColor: '#ffffff',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.08)',
            borderLeft: `4px solid ${primary}`,
            borderRadius: '12px 0 0 12px',
            overflow: 'hidden'
          }
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            backgroundColor: lightGreen,
            p: 2.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${primary}33`
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: primary }}>
            Filters
          </Typography>

          <IconButton
            onClick={() => setFilterDrawerOpen(false)}
            sx={{
              color: primary,
              bgcolor: '#ffffff',
              '&:hover': { bgcolor: '#f1f1f1' },
              width: 36,
              height: 36
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer Content */}
        <Box sx={{ p: 3, overflowY: 'auto', height: 'calc(100vh - 160px)' }}>
          <Grid container spacing={4}>
            {/* LEFT — DISTRICTS */}
            <Grid item xs={12} sm={7}>
              {' '}
              {/* wider left side */}
              <Typography sx={{ fontWeight: 700, mb: 2, color: textDark, fontSize: 18 }}>Districts</Typography>
              <Grid container spacing={2}>
                {districtsData.map((d) => (
                  <Grid item xs={6} sm={4} key={d.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 2,
                        p: 1.2,
                        transition: '0.2s',
                        '&:hover': { backgroundColor: bgSoft }
                      }}
                    >
                      <Checkbox
                        checked={selectedDistricts.includes(d.label)}
                        onChange={() => handleToggleDistrict(d.label)}
                        sx={{ color: primary, '&.Mui-checked': { color: primary } }}
                      />
                      <Typography sx={{ fontSize: 15, color: textDark }}>{d.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* RIGHT — STATUS */}
            <Grid item xs={12} sm={5}>
              <Typography sx={{ fontWeight: 700, mb: 2, color: textDark, fontSize: 18,textAlign:'center' }}>Status</Typography>

              {[
                { value: 'draft', label: 'Draft' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'active', label: 'Active' },
                { value: 'rejected', label: 'Rejected' }
              ].map((item) => (
                <Box
                  key={item.value}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1,
                    borderRadius: 1.5,
                    transition: '0.2s',
                    '&:hover': { backgroundColor: bgSoft },
                    maxWidth: 200, // limit width of the box
                    ml: 'auto' // push box to the right
                  }}
                >
                  <Checkbox
                    checked={selectedStatus.includes(item.value)}
                    onChange={() => handleToggleStatus(item.value)}
                    sx={{ color: primary, '&.Mui-checked': { color: primary } }}
                  />
                  <Typography sx={{ ml: 1.2, fontSize: 15, color: textDark }}>{item.label}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>

        {/* Sticky Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#fff'
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={handleApplyFilter}
            sx={{
              backgroundColor: primary,
              '&:hover': { backgroundColor: '#027e1d' },
              mb: 1.5,
              py: 1.2,
              fontWeight: 600
            }}
          >
            Apply Filters
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleClearFilters}
            sx={{
              borderColor: primary,
              color: primary,
              py: 1.2,
              fontWeight: 600,
              '&:hover': { backgroundColor: lightGreen, borderColor: primary }
            }}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
