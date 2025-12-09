import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TableContainer, Table, TextField, InputAdornment, Button, Grid, Typography, Box, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Add as AddIcon, FileDownloadOutlined as FileDownloadOutlinedIcon } from '@mui/icons-material';

import MainCard from 'ui-component/cards/MainCard';
import Pagination from 'utils/TablePagination';
import TableHead from 'utils/TableHead';
import TableRows from 'utils/TableRows';
import ViewFeedbackDetail from './viewUserDetail';
import ChangeStatusModal from '../common/commonStatusChange';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { getUsers, getUserCount, updateUser, getDistricts } from 'container/UsersContainer/slice';
import { userMe } from 'container/LoginContainer/slice';
import { usersHeads } from 'utils/TableConfig';
import styles from '../common/style';
import cmnStyles from '../common/style1';
import Drawer from '@mui/material/Drawer';
import AddUser from './addUser';

export default function Users() {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [getReqUrl, setGetReqUrl] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const isFilterApplied = selectedRoles.length > 0 || searchQuery.trim() !== '';
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const usersList = useSelector((state) => state.user?.list || []);
  const userData = useSelector((state) => state?.login?.userData || {});
  const districts = useSelector((state) => state.user?.districts || []);
  const count = useSelector((state) => state.user?.listCount || 0);

  const { config, keys } = usersHeads;
  const countPagination = Math.ceil(count / limit);

  const [currentFilter, setCurrentFilter] = useState({
    limit,
    skip: page * limit,
    order: ['createdOn DESC'],
    where: {}
  });

  useEffect(() => {
    dispatch(getDistricts());
  }, [dispatch]);

  useEffect(() => {
    const encodedFilter = encodeURIComponent(JSON.stringify(currentFilter));
    const reqUrl = `users?filter=${encodedFilter}`;
    setGetReqUrl(reqUrl);

    dispatch(getUsers(reqUrl));

    const where = currentFilter.where || {};
    const countUrl = Object.keys(where).length ? `users/count?where=${encodeURIComponent(JSON.stringify(where))}` : `users/count`;

    dispatch(getUserCount(countUrl));
  }, [dispatch, currentFilter]);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    setCurrentFilter((prev) => {
      const andConditions = [];

      // Keep role filter if present
      if (selectedRoles.length > 0) {
        andConditions.push({ role: { inq: selectedRoles } });
      }

      // Add search condition
      if (value.trim() !== '') {
        andConditions.push({
          or: [{ fullName: { like: value, options: 'i' } }, { email: { like: value, options: 'i' } }]
        });
      }

      return {
        ...prev,
        where: andConditions.length > 0 ? { and: andConditions } : {},
        skip: 0
      };
    });

    setPage(0);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setPage(selectedPage);
    setCurrentFilter((prev) => ({
      ...prev,
      skip: selectedPage * limit
    }));
  };

  const handleViewModal = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const handleFormModal = (item) => {
    setSelectedItem(item);
    setFormOpen(true);
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
      status: newStatus,
      id: selectedItem.id
    };
    dispatch(updateUser({ values, getReqestUrl: getReqUrl }));
    handleCloseStatusModal();
  };

  const handleToggleRoles = (role) => {
    setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]));
  };

  const handleApplyFilter = () => {
    setCurrentFilter((prev) => {
      const andConditions = [];

      // Add role filter
      if (selectedRoles.length > 0) {
        andConditions.push({ role: { inq: selectedRoles } });
      }

      // Add search filter if exists
      if (searchQuery.trim() !== '') {
        andConditions.push({
          or: [{ fullName: { like: searchQuery, options: 'i' } }, { email: { like: searchQuery, options: 'i' } }]
        });
      }

      return {
        ...prev,
        where: andConditions.length > 0 ? { and: andConditions } : {},
        skip: 0
      };
    });

    setPage(0);
    setFilterDrawerOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedRoles([]);

    setCurrentFilter({
      limit,
      skip: page * limit,
      order: ['createdOn DESC'],
      where: {}
    });

    setPage(0);
  };

  return (
    <>
      <MainCard>
        {/* Header */}
        <Typography variant="h2" sx={{ color: theme.palette.primary.dark, fontWeight: 500 }}>
          Users
        </Typography>

        {/* Search */}
        <Grid
          container
          spacing={2}
          sx={{
            width: '100%',
            mt: 0,
            mb: 2,
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          {userData.role === 'admin' && (
            <Grid item xs={6} sm={3} md={2} lg={1.5}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  startIcon={<PersonAddAltIcon />}
                  sx={{
                    ...cmnstyle.cmnBtn,
                    ...cmnstyle.cmnBtnOutline,
                    px: 2.5,
                    minWidth: 130,
                    borderRadius: '20px',
                    textTransform: 'none',
                    backgroundColor: '#fff',
                    '&:hover': {
                      backgroundColor: '#f9f9f9'
                    }
                  }}
                  onClick={() => {
                    setSelectedItem(null);
                    setFormOpen(true);
                  }}
                >
                  Add User
                </Button>
              </Box>
            </Grid>
          )}

          {/* Search Input */}
          <Grid item xs={12} sm="auto" md="auto" lg="auto">
            <Box component="form" autoComplete="off" sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search by Name or Email ID"
                sx={{
                  width: { xs: '90%', sm: 320, md: 300 },
                  minWidth: 160,
                  ...style.searchBox,
                  marginRight: 0,
                  marginBottom: 0
                }}
                value={searchQuery}
                onChange={searchHandler}
                autoComplete="new-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={style.searchIcon} />
                    </InputAdornment>
                  ),
                  sx: { px: 1.25 }
                }}
              />
            </Box>
          </Grid>

          {/* Filter Button */}
          <Grid item xs={6} sm={3} md={2} lg={1.5}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  sx={{
                    ...cmnstyle.cmnBtn,
                    ...cmnstyle.cmnBtnOutline,
                    px: 2.5,
                    minWidth: 110,
                    borderRadius: '20px',
                    textTransform: 'none'
                  }}
                  onClick={() => setFilterDrawerOpen(true)}
                >
                  Filter
                </Button>

                {isFilterApplied && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 3,
                      right: 8,
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
              hasComment={false}
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
        {countPagination > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
            <Pagination page={page} countPagination={countPagination} handlePageClick={handlePageClick} />
          </Box>
        )}

        {/* View Modal */}
        {open && <ViewFeedbackDetail drawerOpen={open} setDrawerOpen={setOpen} item={selectedItem} />}

        {/* Edit/Add Form Modal */}
        {/* {formOpen && (
          <UpdateForm drawerOpen={formOpen} setDrawerOpen={setFormOpen} item={selectedItem} setPage={setPage} getReqestUrl={getReqUrl} />
        )} */}

        {/* Add User Drawer */}
        {formOpen && (
          <AddUser
            formOpen={formOpen}
            setFormOpen={setFormOpen}
            districts={districts}
            getReqUrl={getReqUrl} // <---- pass it here
          />
        )}

        {/* Status Change Modal */}
        {isStatusModalOpen && selectedItem && (
          <ChangeStatusModal
            open={isStatusModalOpen}
            facility={selectedItem}
            onClose={handleCloseStatusModal}
            onConfirm={handleUpdateStatus}
            title="Change User Status"
          />
        )}
      </MainCard>

      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 520, md: 550 }, // perfect width for a single filter section
            backgroundColor: '#ffffff',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.08)',
            borderLeft: `4px solid ${primary}`,
            borderRadius: '12px 0 0 12px',
            overflow: 'hidden'
          }
        }}
      >
        {/* Header */}
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
            Filter by Role
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
          <Typography sx={{ fontWeight: 700, mb: 2.5, color: textDark, fontSize: 18, textAlign: 'left' }}>Select User Role</Typography>

          {/* Roles List */}
          <Grid container spacing={2}>
            {[
              { value: 'districtAdmin', label: 'District Admin' },
              { value: 'onboardingOfficer', label: 'Onboarding Officer' },
              { value: 'regular', label: 'Regular User' }
            ].map((role) => (
              <Grid item xs={12} sm={12} key={role.value}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 2,
                    p: 1.4,
                    transition: '0.2s',
                    border: '1px solid #e5e7eb',
                    '&:hover': { backgroundColor: bgSoft }
                  }}
                >
                  <Checkbox
                    checked={selectedRoles.includes(role.value)}
                    onChange={() => handleToggleRoles(role.value)}
                    sx={{ color: primary, '&.Mui-checked': { color: primary } }}
                  />

                  <Typography sx={{ ml: 1, fontSize: 16, color: textDark }}>{role.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer */}
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
