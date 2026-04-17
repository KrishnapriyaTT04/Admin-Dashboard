import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid
} from '@mui/material';
import axios from 'axios';

const AddStaffForm = ({ open, handleClose, refreshStaff }) => {
  const [formData, setFormData] = useState({
    customId: '',
    firstName: '',
    lastName: '',
    phone: '',
    department: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:7000/api/staff', formData);

      refreshStaff();
      handleClose();

      setFormData({
        customId: '',
        firstName: '',
        lastName: '',
        phone: '',
        department: '',
        email: '',
        password: ''
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add Staff</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>

          <Grid item xs={6}>
            <TextField fullWidth label="Custom ID" name="customId" type="number" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Department" name="department" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="First Name" name="firstName" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Last Name" name="lastName" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Phone" name="phone" type="number" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Email" name="email" onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: 5,
            textTransform: 'none',
            backgroundColor: '#38c1b3ff',
            '&:hover': { backgroundColor: '#32a087ff' }
          }}
        >
          Add Staff
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStaffForm;