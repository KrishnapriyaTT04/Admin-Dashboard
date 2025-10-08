import { Button, Box, Typography, IconButton, Grid, useTheme } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // ✅ Ensure all are imported
import { useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormikSwitch from '../common/toggleSwitch';

 import { createFacility ,updateFacility} from 'container/FacilityContainer/slice'; 


  import { districtsData } from '../common/district' 


const dayMap = [
    { id: 'Monday', label: 'Mon' },
    { id: 'Tuesday', label: 'Tue' },
    { id: 'Wednesday', label: 'Wed' },
    { id: 'Thursday', label: 'Thu' },
    { id: 'Friday', label: 'Fri' },
    { id: 'Saturday', label: 'Sat' },
    { id: 'Sunday', label: 'Sun' },
];

// --- Base Initial Values (Full Structure) ---
const baseInitialValues = {
  title: '', category: '', isPaid: false, facilityType: '', openingTime: '', closingTime: '', is24H: false,
  seatCapacity: 0,ratingCount:0,reviewCount:0, remarks: '', status: 'active', frequency: [],
//   contactInfo: { name: '', email: '', phone: '' },
  contactName:'',contactEmail:'',contactPhone:'',
  city: '', state: 'kerala',stateId: 'kl', district: '',districtCode: '', pinCode: '', geoLoc: ['', ''], landmark: '',
  indianType:false, europeanType:false,address1:'',address2:''
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
  frequency: Yup.array().of(Yup.string()),
//   .min(1, 'Select at least one day'),
//   ,contactInfo: Yup.object({
//     name: Yup.string().required('Contact name is required'),
//     email: Yup.string().email('Invalid email format'),
//     phone: Yup.string().matches(/^[0-9]+$/, 'Phone must be only digits'),
//   }),
   contactName: Yup.string().required('Contact name is required'),
    contactEmail: Yup.string().email('Invalid email format'),
    contactPhone: Yup.string().matches(/^[0-9]+$/, 'Phone must be only digits'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  stateId: Yup.string().required('State Id is required'),
  district: Yup.string(),
  districtCode:Yup.string(),
  pinCode: Yup.string().required('Pin code  is required').matches(/^[0-9]{6}$/, 'Pin Code must be 6 digits'),
  geoLoc: Yup.array().of(Yup.string().required('Lat/Long value is required')).min(2).max(2, 'Must provide both Latitude and Longitude'),
  landmark: Yup.string(),
  indianType:Yup.boolean(),
  europeanType:Yup.boolean(),
  address1:Yup.string().required('address is required'),
  address2:Yup.string(),
});

// --- Function to Map Item Data to Formik Values (Correct as is) ---
const getInitialValues = (item) => (

    {
    
    ...baseInitialValues, 
    title: item?.title || baseInitialValues.title,
    category: (item?.category ? String(item.category).toLowerCase() : baseInitialValues.category),
    isPaid: item?.isPaid ?? baseInitialValues.isPaid,
    facilityType: item?.facilityType || baseInitialValues.facilityType,
    openingTime: item?.openingTime || baseInitialValues.openingTime,
    closingTime: item?.closingTime || baseInitialValues.closingTime,
    is24H: item?.is24H ?? baseInitialValues.is24H,
    seatCapacity: item?.seatCapacity ?? baseInitialValues.seatCapacity,
    remarks: item?.remarks || baseInitialValues.remarks,
    status: item?.status || baseInitialValues.status,
    frequency: item?.frequency || baseInitialValues.frequency,
    // contactInfo: {
    //   name: item?.contactInfo?.name || baseInitialValues.contactInfo.name,
    //   email: item?.contactInfo?.email || baseInitialValues.contactInfo.email,
    //   phone: item?.contactInfo?.phone || baseInitialValues.contactInfo.phone,
    // },
     contactName: item?.contactName || baseInitialValues.contactName,
      contactEmail: item?.contactEmail || baseInitialValues.contactEmail,
      contactPhone: item?.contactPhone || baseInitialValues.contactPhone,
    city: item?.city || baseInitialValues.city,
    state: item?.state || baseInitialValues.state,
    stateId: item?.stateId || baseInitialValues.stateId,
    district: item?.district || baseInitialValues.district,
    districtCode:item?.districtCode || baseInitialValues.districtCode,
    pinCode: item?.pinCode || baseInitialValues.pinCode,
    geoLoc: item?.geoLoc?.length === 2 ? item.geoLoc : baseInitialValues.geoLoc,
    landmark: item?.landmark || baseInitialValues.landmark,
    indianType:item?.indianType ?? baseInitialValues.indianType,
    europeanType:item?.europeanType ?? baseInitialValues.europeanType,
    ratingCount: item?.ratingCount ?? baseInitialValues.ratingCount,
    reviewCount:item?.reviewCount ?? baseInitialValues.reviewCount,
    address1:item?.address1 || baseInitialValues.address1,
     address2:item?.address2 || baseInitialValues.address2,
    id: item?.id || '', 
});



const UpdateForm = ({ drawerOpen, setDrawerOpen, item, setPage }) => {
  const theme = useTheme();
  // const cmnstyle = cmnstyles(theme); // Keep commented if not used
  const dispatch = useDispatch();

  const submit = (values) => {
      if(values.is24H==true){
       values.openingTime="00:00";
       values.closingTime="00:00";
      }

      console.log('Updating Facility:', values);
                    


//    values.contactInfo.phone=  values.contactInfo.phone.toString()
   values.geoLoc = values.geoLoc.map(str => parseFloat(str)); 


    if (values.id) { 
         delete values.ratingCount
         delete values.reviewCount
      dispatch(updateFacility(values,values.id)); 
      console.log('Updating Facility:', values);
    } else {
         delete values.id; 

        dispatch(createFacility(values));
    }
    setDrawerOpen(false);
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
          onClose={() => setDrawerOpen(false)}            // state.listError = {
            //     message: action.payload.message || 'Failed to fetch facilities',
            //     status: action.payload.status || 500
            // };
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

               <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto', maxHeight: '78vh',

                '&::-webkit-scrollbar': {
                width: '6px', // Make the scrollbar thin
                backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
                // Style the part the user drags (the "thumb")
                backgroundColor: 'rgba(0, 0, 0, 0.2)', // Subtle gray
                borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darken on hover
            },
                }}>
            <Typography variant="h5" sx={{mb:2}}>Facility Details</Typography>

              
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

        <Grid item xs={6}>
        <Field name="facilityType">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Facility Type"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>

    {/* category */}
<Grid item xs={6}>
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
 <Grid item xs={3}>
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormikSwitch name="isPaid" /> 
        <Typography 
            variant="body1" 
            component="label" 
            htmlFor="isPaid"
            sx={{color:values.isPaid?'green':'gray'}}
        >Is Paid?
        </Typography>
    </Box>
</Grid>

    {/* is24H Checkbox */}

     <Grid item xs={3}>
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormikSwitch name="is24H" /> 
        <Typography 
            variant="body1" 
            component="label" 
            htmlFor="is24H"
            sx={{color:values.is24H?'green':'gray'}}
        >Open 24 Hours?
        </Typography>
    </Box>
</Grid>


       {/* isIndian */}

     <Grid item xs={3}>
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormikSwitch name="indianType" /> 
        <Typography 
            variant="body1" 
            component="label" 
            htmlFor="indianType"
            sx={{color:values.indianType?'green':'gray'}}
        >Indian?
        </Typography>
    </Box>
</Grid>

       {/* european */}

     <Grid item xs={3}>
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormikSwitch name="europeanType" /> 
        <Typography 
            variant="body1" 
            component="label" 
            htmlFor="europeanType"
            sx={{color:values.europeanType?'green':'gray'}}
        >European?
        </Typography>
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

               <Grid item xs={6} sm={6}>
        <Field name="seatCapacity">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Seat Capacity"
                    type="number"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>

    {/* frequency */}
 <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>Frequency (Days Available)</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {dayMap.map(day => (
                <label key={day.id} style={{ display: 'flex', alignItems: 'center' , color:'gray' }}>
                    <Field 
                        type="checkbox" 
                        name="frequency" 
                        value={day.id} // <-- This passes the full name (e.g., "Monday")
                        style={{ marginRight: '4px'  }}
                    />
                    {day.label} {/* <-- This displays the short name (e.g., "Mon") */}
                </label>
            ))}
        </Box>
        <ErrorMessage 
            name="frequency" 
            component="div" 
            style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }} 
        />
    </Grid>



    {/* Contact Information Divider */}
    <Grid item xs={12}>
        <Box sx={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '10px' }}>
            <Typography variant="h5">Contact Information</Typography>
        </Box>
    </Grid>

    {/* contactInfo.name */}
    <Grid item xs={12} sm={6}>
        <Field name="contactName">
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
        <Field name="contactEmail">
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
        <Field name="contactPhone">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Phone"
                    // type="number"
                    type="tel" 
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>

    {/* Address Information  */}
    <Grid item xs={12}>
        <Box sx={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '10px' }}>
            <Typography variant="h5">Address</Typography>
        </Box>
    </Grid>

    {/* contactInfo.name */}
    <Grid item xs={12} sm={6}>
        <Field name="address1">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Address 1"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>
        <Grid item xs={12} sm={6}>
        <Field name="address2">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Address 2"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>
    
    {/* Location Divider */}
    <Grid item xs={12}>
        <Box sx={{ borderBottom: '1px solid #d3bfbfff', paddingBottom: '10px', marginTop: '10px' }}>
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

  {/* state */}
<Grid item xs={6}>
    <Field name="state">
        {({ field, meta }) => (
            <TextField
                {...field}
                select // Tells TextField to render a Select component
                label="State"
                fullWidth
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                disabled={true}
                 sx={{
                    '& .MuiInputBase-root.Mui-disabled': {
                        backgroundColor: '#cececeff',
                    }
                 }}
            >
                {/* FIX: Replace <option> with <MenuItem> */}
                <MenuItem value="">Select State</MenuItem>
                <MenuItem value="kerala">Kerala</MenuItem>
            </TextField>
        )}
    </Field>
</Grid>
{/* district */}

<Grid item xs={6}>
    <Field name="district"> 
        {({ field, meta }) => (
            <TextField
                {...field}
                select // Renders as a Select component
                label="District" // Updated label
                fullWidth
                
                // Formik Error/HelperText Logic
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                
                // Static Props
                disabled={false} // Typically, a district field is NOT disabled

                // Custom Styling for Disabled State (You might remove this if not disabled)
                sx={{
                    '& .MuiInputBase-root.Mui-disabled': {
                        backgroundColor: '#cececeff',
                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                    },
                }}
            >
                {/* 1. Default/Placeholder Option */}
                <MenuItem value="">Select District</MenuItem>
                
                {/* 2. Map over the districtsData to create dynamic options */}
                {districtsData && districtsData.map((district) => (
                    <MenuItem 
                     key={district.districtCode} value={Number(district.districtCode)}
                        // key={district.districtId} 
                        // value={district.districtId} 
                    >
                        {district.label} 
                    </MenuItem>
                ))}
            </TextField>
        )}
    </Field>
</Grid>

    {/* city */}
    <Grid item xs={6}>
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

      {/* pin */}
    <Grid item xs={6}>
        <Field name="pinCode">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Pin Code"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>
    </Grid>

          {/* landmark */}
    <Grid item xs={6}>
        <Field name="landmark">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    label="Landmark"
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

<Grid container spacing={1} pb={5}>
    <Grid item xs={6}>
        {/* Placeholder for Cancel/Other Button */}
    </Grid>
    <Grid item xs={12} marginInline={3}>
        <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            startIcon={<CheckCircleOutlineIcon />}
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