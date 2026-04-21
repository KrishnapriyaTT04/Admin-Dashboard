import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Avatar
} from '@mui/material';

import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getStaff } from 'container/StaffContainer/slice';
import AddStaffForm from './AddStaffsForm';

const StaffCard = () => {
  const dispatch = useDispatch();

  const { staffList } = useSelector((state) => state.staff);

  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  // ✅ Fetch via saga
  useEffect(() => {
    dispatch(getStaff());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const safeStaffList = Array.isArray(staffList) ? staffList : [];

const filteredStaff = safeStaffList.filter((member) =>
  member.email?.toLowerCase().includes(search.toLowerCase()) ||
  member.customId?.toString().includes(search)
);

  return (
    <>
      <Grid container spacing={3}>

        {/* SEARCH + ADD */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">

                <Box display="flex" alignItems="center" gap={1} width="60%">
                  <SearchOutlined />
                  <TextField
                    placeholder="Search staff by ID or email..."
                    fullWidth
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Box>

                <Button
                  variant="contained"
                  startIcon={<PlusOutlined />}
                  onClick={handleOpen}
                  sx={{
                    borderRadius: 5,
                    textTransform: 'none',
                    backgroundColor: '#38c1b3ff',
                    '&:hover': { backgroundColor: '#32a087ff' }
                  }}
                >
                  Add Staff
                </Button>

              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* TABLE */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>

              <Grid container mb={2} sx={{ fontWeight: 'bold', color: 'gray' }}>
                <Grid item xs={3}>Staff</Grid>
                <Grid item xs={2}>ID</Grid>
                <Grid item xs={2}>Department</Grid>
                <Grid item xs={2}>Phone</Grid>
                <Grid item xs={3}>Email</Grid>
              </Grid>

              {filteredStaff.map((member) => (
                <Grid container key={member._id} alignItems="center" sx={{ py: 2, borderTop: '1px solid #eee' }}>
                  <Grid item xs={3} display="flex" alignItems="center" gap={2}>
                    <Avatar>{member.firstName?.charAt(0)}</Avatar>
                    <Typography fontWeight="bold">
                      {member.firstName} {member.lastName}
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>{member.customId}</Grid>
                  <Grid item xs={2}>{member.department}</Grid>
                  <Grid item xs={2}>{member.phone}</Grid>
                  <Grid item xs={3}>{member.email}</Grid>
                </Grid>
              ))}

              {filteredStaff.length === 0 && (
                <Typography textAlign="center" mt={3}>
                  No staff found
                </Typography>
              )}

            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ❌ remove refreshStaff */}
      <AddStaffForm open={open} handleClose={handleClose} />
    </>
  );
};

export default StaffCard;