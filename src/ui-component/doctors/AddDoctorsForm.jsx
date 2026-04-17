import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Typography
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';

const AddDoctorForm = ({ open, handleClose, refreshDoctors }) => {

  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    specialization: '',
    experience: '',
    status: 'active',
    availability: [
      {
        day: '',
        startTime: '',
        endTime: '',
        breakStart: '',
        breakEnd: ''
      }
    ]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvailabilityChange = (index, e) => {
    const updated = [...formData.availability];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, availability: updated });
  };

  const addAvailability = () => {
    setFormData({
      ...formData,
      availability: [
        ...formData.availability,
        {
          day: '',
          startTime: '',
          endTime: '',
          breakStart: '',
          breakEnd: ''
        }
      ]
    });
  };

  const removeAvailability = (index) => {
    const updated = formData.availability.filter((_, i) => i !== index);
    setFormData({ ...formData, availability: updated });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/doctors', formData);
      refreshDoctors();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add Doctor</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>

          <Grid item xs={6}>
            <TextField fullWidth label="Name" name="name" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Photo URL" name="photo" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Specialization" name="specialization" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Experience" name="experience" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* AVAILABILITY */}
        <Typography mt={3} mb={1} fontWeight="bold">
          Availability
        </Typography>

        {formData.availability.map((slot, index) => (
          <Grid container spacing={2} key={index} alignItems="center" mb={1}>

            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Day"
                name="day"
                value={slot.day}
                onChange={(e) => handleAvailabilityChange(index, e)}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                type="time"
                label="Start"
                name="startTime"
                InputLabelProps={{ shrink: true }}
                value={slot.startTime}
                onChange={(e) => handleAvailabilityChange(index, e)}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                type="time"
                label="End"
                name="endTime"
                InputLabelProps={{ shrink: true }}
                value={slot.endTime}
                onChange={(e) => handleAvailabilityChange(index, e)}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                type="time"
                label="Break Start"
                name="breakStart"
                InputLabelProps={{ shrink: true }}
                value={slot.breakStart}
                onChange={(e) => handleAvailabilityChange(index, e)}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                type="time"
                label="Break End"
                name="breakEnd"
                InputLabelProps={{ shrink: true }}
                value={slot.breakEnd}
                onChange={(e) => handleAvailabilityChange(index, e)}
              />
            </Grid>

            <Grid item xs={1}>
              <IconButton color="error" onClick={() => removeAvailability(index)}>
                <Delete />
              </IconButton>
            </Grid>

          </Grid>
        ))}

        <Button startIcon={<Add />} onClick={addAvailability}>
          Add Slot
        </Button>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Doctor
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDoctorForm;