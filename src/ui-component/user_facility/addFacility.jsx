import { Button, Box, Typography, IconButton, Grid, useTheme } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // ✅ Ensure all are imported
import { useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


 import { createFacility } from 'container/FacilityContainer/slice'; 

// Box, Typography, TextField, Select
// Assuming these are defined elsewhere:
// import { createEfType, updateEfType } from 'container/EmissionContainer/slice'; 
// import cmnstyles from '../common/style';

// --- Base Initial Values (Full Structure) ---
const baseInitialValues = {
  title: '', category: '', isPaid: false, facilityType: '', openingTime: '', closingTime: '', is24H: false,
  seatCapacity: 0, remarks: '', status: 'active', frequency: [],
  contactInfo: { name: '', email: '', phone: '' },
  city: '', state: 'kerala', district: '', pinCode: '', geoLoc: ['', ''], landmark: '',
};

// --- Validation Schema (Correct as is) ---
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  isPaid: Yup.boolean(),
  facilityType: Yup.string(),
  openingTime: Yup.string().when('is24H', { is: false, then: (schema) => schema.required('Opening time is required'), otherwise: (schema) => schema.nullable(), }),
  closingTime: Yup.string().when('is24H', { is: false, then: (schema) => schema.required('Closing time is required'), otherwise: (schema) => schema.nullable(), }),
  is24H: Yup.boolean(),
  seatCapacity: Yup.number().integer().min(0, 'Capacity cannot be negative'),
  remarks: Yup.string().max(500, 'Remarks must be under 500 characters'),
  status: Yup.string().required('Status is required'),
  frequency: Yup.array().of(Yup.string())
//   .min(1, 'Select at least one day'),
  ,contactInfo: Yup.object({
    name: Yup.string().required('Contact name is required'),
    email: Yup.string().email('Invalid email format'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Phone must be only digits'),
  }),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  district: Yup.string(),
  pinCode: Yup.string().matches(/^[0-9]{6}$/, 'Pin Code must be 6 digits'),
  geoLoc: Yup.array().of(Yup.string().required('Lat/Long value is required')).min(2).max(2, 'Must provide both Latitude and Longitude'),
  landmark: Yup.string(),
});

// --- Function to Map Item Data to Formik Values (Correct as is) ---
const getInitialValues = (item) => ({
    ...baseInitialValues, 
    title: item?.title || baseInitialValues.title,
    category: item?.category || baseInitialValues.category,
    isPaid: item?.isPaid ?? baseInitialValues.isPaid,
    facilityType: item?.facilityType || baseInitialValues.facilityType,
    openingTime: item?.openingTime || baseInitialValues.openingTime,
    closingTime: item?.closingTime || baseInitialValues.closingTime,
    is24H: item?.is24H ?? baseInitialValues.is24H,
    seatCapacity: item?.seatCapacity ?? baseInitialValues.seatCapacity,
    remarks: item?.remarks || baseInitialValues.remarks,
    status: item?.status || baseInitialValues.status,
    frequency: item?.frequency || baseInitialValues.frequency,
    contactInfo: {
      name: item?.contactInfo?.name || baseInitialValues.contactInfo.name,
      email: item?.contactInfo?.email || baseInitialValues.contactInfo.email,
      phone: item?.contactInfo?.phone || baseInitialValues.contactInfo.phone,
    },
    city: item?.city || baseInitialValues.city,
    state: item?.state || baseInitialValues.state,
    district: item?.district || baseInitialValues.district,
    pinCode: item?.pinCode || baseInitialValues.pinCode,
    geoLoc: item?.geoLoc?.length === 2 ? item.geoLoc : baseInitialValues.geoLoc,
    landmark: item?.landmark || baseInitialValues.landmark,
    // id: item?.id || '', 
});

// -------------------------------------------------------------------------
// ----------------------- THE MAIN COMPONENT ------------------------------
// -------------------------------------------------------------------------

const UpdateForm = ({ drawerOpen, setDrawerOpen, item, setPage }) => {
  const theme = useTheme();
  // const cmnstyle = cmnstyles(theme); // Keep commented if not used
  const dispatch = useDispatch();

  const submit = (values) => {


         const token = JSON.parse(localStorage.getItem('klooToken'));
          console.log('Updating Facility:', token);

   values.contactInfo.phone=  values.contactInfo.phone.toString()

    if (values.id) { 
      // dispatch(updateEfType(values)); 
      console.log('Updating Facility:', values);
    } else {
      dispatch(createFacility(values));
    }
    //setDrawerOpen(false);
  };

  return (
    <Formik
      initialValues={getInitialValues(item)} 
      validationSchema={validationSchema} 
      onSubmit={submit}
      enableReinitialize={true}
    >
      {/* 🎯 FIX: This is the correct single render function for the Formik context 🎯 */}
      {({ values, isSubmitting, isValid, dirty }) => (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: { xs: '100%', sm: '80%', md: '60%', lg: '1100px' },
              maxWidth: '100vw',
              backgroundColor: '#f5f5f5',
            }
          }}
        >
          <Box sx={{ p: 3, height: '100%', }}>
             {/* Header */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ color: theme.palette.primary.dark }}>
                    {item?.id ? 'Edit Facility' : 'Create New Facility'}
                </Typography>
                <IconButton onClick={() => setDrawerOpen(false)} size="large">
                    <CloseIcon />
                </IconButton>
            </Grid>

            {/* Form */}
            <Form 
              className="form-container" 
              style={{ display: 'grid', gap: '20px', margin: '0 auto' }}
            >

               <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
            <Typography variant="h5">Facility Details</Typography>

              
              {/* title */}
<Grid container spacing={3}>
    {/* title */}
    <Grid item xs={12}>
        <Field name="title">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>

    {/* category */}
<Grid item xs={12}>
    <Field name="category">
        {({ field, meta }) => (
            <TextField
                {...field}
                select // Tells TextField to render a Select component
                label="Category"
                fullWidth
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                // Optional: set inputProps/SelectProps if needed, but usually not required here
            >
                {/* FIX: Replace <option> with <MenuItem> */}
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
            </TextField>
        )}
    </Field>
</Grid>

    {/* isPaid Checkbox */}
    {/* <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Field name="isPaid" type="checkbox" />
            <Typography variant="body1" component="label" htmlFor="isPaid">Is Paid?</Typography>
        </Box>
    </Grid> */}

    {/* is24H Checkbox */}
    <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Field name="is24H" type="checkbox" />
            <Typography variant="body1" component="label" htmlFor="is24H">Open 24 Hours?</Typography>
        </Box>
    </Grid>

    {/* Conditional Time Inputs */}
    {!values.is24H && (
        <>
            <Grid item xs={12} sm={6}>
                <Field name="openingTime">
                    {({ field, meta }) => (
                        <TextField
                            {...field}
                            label="Opening Time"
                            type="time"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                        />
                    )}
                </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Field name="closingTime">
                    {({ field, meta }) => (
                        <TextField
                            {...field}
                            label="Closing Time"
                            type="time"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                        />
                    )}
                </Field>
            </Grid>
        </>
    )}

    {/* frequency */}
    <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>Frequency (Days Available)</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <label key={day}>
                    <Field type="checkbox" name="frequency" value={day} />
                    {day}
                </label>
            ))}
        </Box>
        <ErrorMessage name="frequency" component="div" style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }} />
    </Grid>

    {/* Contact Information Divider */}
    <Grid item xs={12}>
        <Box sx={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '10px' }}>
            <Typography variant="h5">Contact Information</Typography>
        </Box>
    </Grid>

    {/* contactInfo.name */}
    <Grid item xs={12} sm={6}>
        <Field name="contactInfo.name">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Contact Name"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>

    {/* contactInfo.email */}
    <Grid item xs={12} sm={6}>
        <Field name="contactInfo.email">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Contact Email"
                    type="email"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>
       <Grid item xs={12} sm={6}>
        <Field name="contactInfo.phone">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Phone"
                    type="number"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>
    
    {/* Location Divider */}
    <Grid item xs={12}>
        <Box sx={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '10px' }}>
            <Typography variant="h5">Location</Typography>
        </Box>
    </Grid>

    {/* geoLoc */}
    <Grid item xs={12} sm={6}>
        <Field name="geoLoc[0]">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Latitude"
                    placeholder="Latitude"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>
    <Grid item xs={12} sm={6}>
        <Field name="geoLoc[1]">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Longitude"
                    placeholder="Longitude"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>

    {/* city */}
    <Grid item xs={12}>
        <Field name="city">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="City"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>
</Grid>
</Box>  

{/* --- Submit Button (to be placed in the STICKY FOOTER BOX) --- */}

<Grid container spacing={1}>
    <Grid item xs={6}>
        {/* Placeholder for Cancel/Other Button */}
    </Grid>
    <Grid item xs={6}>
        <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            startIcon={<CheckCircleOutlineIcon />}
            // disabled={isSubmitting}
            fullWidth
            sx={{ py: 1.5, textTransform: 'none' }}
             disabled={isSubmitting || !isValid} 
        >
            {isSubmitting ? 'Submitting...' : (item?.id ? 'Update Facility' : 'Create Facility')}
        </Button>
    </Grid>
</Grid>
            </Form>

          </Box>
        </Drawer>
      )}
    </Formik>
  );
};

export default UpdateForm;