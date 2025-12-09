import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Typography,
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser ,getUsers,getUserCount} from 'container/UsersContainer/slice';

// import { createUser } from "../../redux/actions/userActions";

const AddUser = ({ formOpen, setFormOpen, districts, getReqUrl }) => {
  const primary = '#039123';
  const lightGreen = '#e8f5e9';
  const textDark = '#364152';

  
  const dispatch = useDispatch();

  const defaultForm = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    district: '',
    password: '',
    address: '',
    userType: 'systemUser',
    defaultTenant: '64e4929f27adba7a4e6970bc',
    client_id: 'webapp',
    client_secret: 'saqw21!@'
  };

  const [formValues, setFormValues] = useState(defaultForm);
  const { operationLoading, operationSuccess, operationError } = useSelector((state) => state.user);

  useEffect(() => {
    if (operationSuccess) {
      dispatch(getUsers(getReqUrl)); 
    }
  }, [operationSuccess]);

  useEffect(() => {
    if (formOpen) setFormValues(defaultForm);
  }, [formOpen]);

  const updateForm = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const required = ['firstName', 'email', 'role', 'district', 'password'];

    for (const field of required) {
      if (!formValues[field]) {
        toast.error(`${field} is required`, { autoClose: 3000 });
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      toast.error('Please enter a valid email', { autoClose: 3000 });
      return false;
    }

    if (formValues.phone && formValues.phone.length < 10) {
      toast.error('Phone number must be at least 10 digits', { autoClose: 3000 });
      return false;
    }

    return true;
  };

  const handleSubmitUser = () => {
    if (!validate()) return;

    dispatch(createUser(formValues));

    setTimeout(() => {
      setFormOpen(false);
    }, 1000);
  };

  return (
    <Drawer
      anchor="right"
      open={formOpen}
      onClose={() => setFormOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 520, md: 560 },
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
          Create New User
        </Typography>

        <IconButton
          onClick={() => setFormOpen(false)}
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

      {/* Content */}
      <Box sx={{ p: 3, overflowY: 'auto', height: 'calc(100vh - 160px)' }}>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 3,
            color: textDark,
            fontSize: 18
          }}
        >
          User Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name *"
              fullWidth
              value={formValues.firstName}
              onChange={(e) => updateForm('firstName', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Middle Name"
              fullWidth
              value={formValues.middleName}
              onChange={(e) => updateForm('middleName', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Last Name" fullWidth value={formValues.lastName} onChange={(e) => updateForm('lastName', e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Email *" fullWidth value={formValues.email} onChange={(e) => updateForm('email', e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Phone" fullWidth value={formValues.phone} onChange={(e) => updateForm('phone', e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role *</InputLabel>
              <Select label="Role *" value={formValues.role} onChange={(e) => updateForm('role', e.target.value)}>
                <MenuItem value="districtAdmin">District Admin</MenuItem>
                <MenuItem value="onboardingOfficer">Onboarding Officer</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>District *</InputLabel>
              <Select label="District *" value={formValues.district} onChange={(e) => updateForm('district', e.target.value)}>
                {districts?.map((dist) => (
                  <MenuItem key={dist.id || dist._id} value={dist.districtName}>
                    {dist.districtName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Password *"
              type="password"
              fullWidth
              value={formValues.password}
              onChange={(e) => updateForm('password', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              multiline
              rows={2}
              value={formValues.address}
              onChange={(e) => updateForm('address', e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 3, borderTop: '1px solid #e5e7eb', background: '#fff' }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: primary,
            '&:hover': { backgroundColor: '#027e1d' },
            mb: 2,
            py: 1.2,
            fontWeight: 600
          }}
          onClick={handleSubmitUser}
        >
          Create User
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderColor: primary,
            color: primary,
            py: 1.2,
            fontWeight: 600,
            '&:hover': { backgroundColor: lightGreen }
          }}
          onClick={() => setFormOpen(false)}
        >
          Cancel
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddUser;
