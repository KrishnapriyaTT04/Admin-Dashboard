import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Chip
} from '@mui/material';

import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import AddDoctorForm from './AddDoctorsForm'; // ✅ FIXED NAME

const DoctorsCard = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  // ✅ FETCH DOCTORS
  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(res.data.doctors || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ✅ MODAL HANDLERS
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ✅ STATUS COLOR (UPDATED)
  const getStatusColor = (status) => {
    if (status === 'active') return 'success';
    if (status === 'inactive') return 'warning';
    if (status === 'blocked') return 'error';
    return 'default';
  };

  // ✅ SEARCH
  const filteredDoctors = doctors.filter((doc) =>
    doc.name?.toLowerCase().includes(search.toLowerCase())
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
                    placeholder="Search doctors..."
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
                  Add Doctor
                </Button>

              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* TABLE */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>

              {/* HEADER */}
              <Grid container mb={2} sx={{ fontWeight: 'bold', color: 'gray' }}>
                <Grid item xs={3}>Doctor</Grid>
                <Grid item xs={2}>Specialization</Grid>
                <Grid item xs={2}>Experience</Grid>
                <Grid item xs={2}>Availability</Grid>
                <Grid item xs={1}>Status</Grid>
              </Grid>

              {/* DATA */}
              {filteredDoctors.map((doc) => (
                <Grid
                  container
                  key={doc._id}
                  alignItems="center"
                  sx={{
                    py: 2,
                    borderTop: '1px solid #eee',
                    '&:hover': { backgroundColor: '#fafafa' }
                  }}
                >
                  {/* Doctor */}
                  <Grid item xs={3} display="flex" alignItems="center" gap={2}>
                    <Avatar src={doc.photo}>
                      {doc.name?.charAt(0)}
                    </Avatar>
                    <Typography fontWeight="bold">{doc.name}</Typography>
                  </Grid>

                  {/* Specialization */}
                  <Grid item xs={2}>
                    <Typography>{doc.specialization}</Typography>
                  </Grid>

                  {/* Experience */}
                  <Grid item xs={2}>
                    <Typography>{doc.experience}</Typography>
                  </Grid>

                  {/* Availability */}
                  <Grid item xs={2}>
                    <Typography>
                      {doc.availability?.length || 0} slots
                    </Typography>
                  </Grid>

                  {/* Status */}
                  <Grid item xs={1}>
                    <Chip
                      label={doc.status}
                      color={getStatusColor(doc.status)}
                      size="small"
                    />
                  </Grid>
                </Grid>
              ))}

              {/* EMPTY */}
              {filteredDoctors.length === 0 && (
                <Typography textAlign="center" mt={3} color="text.secondary">
                  No doctors found
                </Typography>
              )}

            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* MODAL */}
      <AddDoctorForm
        open={open}
        handleClose={handleClose}
        refreshDoctors={fetchDoctors}
      />
    </>
  );
};

export default DoctorsCard;