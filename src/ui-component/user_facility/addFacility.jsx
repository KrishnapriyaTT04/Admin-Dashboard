import { useEffect, useState } from 'react';
import { Button, Box, Typography, IconButton, Grid, useTheme ,  FormControl,  InputLabel,Select,Checkbox,ListItemText} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import { useDispatch,useSelector } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormikSwitch from '../common/toggleSwitch';
import MapPickerComponent from '../common/locationMapPicker';

import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

 import { createFacility ,updateFacility, getMasterFacilities,getMasterFacilityType} from 'container/FacilityContainer/slice'; 
 


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



const baseInitialValues = {
  title: '', category: '', isPaid: false, facilityType: '', openingTime: '', closingTime: '', is24H: false,
  seatCapacity: 1,ratingCount:0,reviewCount:0, remarks: '', status: 'active', frequency: [],
  contactName:'',contactEmail:'',contactPhone:'',
  city: '', state: 'kerala',stateId: 'kl', district: '',districtCode: '', pinCode: '', geoLoc: ['', ''], landmark: ''
  ,address1:'',address2:'',features: []
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  isPaid: Yup.boolean(),
  facilityType: Yup.string().required('Facility Type is required'),
  openingTime: Yup.string().when('is24H', { is: false, then: (schema) => schema.required('Opening time is required'), otherwise: (schema) => schema.nullable(), }),
  closingTime: Yup.string().when('is24H', { is: false, then: (schema) => schema.required('Closing time is required'), otherwise: (schema) => schema.nullable(), }),
  is24H: Yup.boolean(),
  seatCapacity: Yup.number().integer().min(0, 'Capacity cannot be negative'),
  remarks: Yup.string().max(500, 'Remarks must be under 500 characters'),
  status: Yup.string().required('Status is required'),
  frequency: Yup.array().of(Yup.string()).min(1, 'Please select at least one day or frequency.'), 
   contactName: Yup.string().required('Contact name is required'),
    contactEmail: Yup.string().email('Invalid email format'),
    contactPhone: Yup.string().matches(/^[0-9]+$/, 'Phone must be only digits'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  stateId: Yup.string().required('State Id is required'),
  district: Yup.string(),
  districtCode:Yup.string(),
  pinCode: Yup.string().required('Pincode  is required').matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
  geoLoc: Yup.array().of(Yup.string().required('Lat/Long value is required')).min(2).max(2, 'Must provide both Latitude and Longitude'),
  landmark: Yup.string().required('Landmark is required'),
  features:Yup.array(),
  address1:Yup.string().required('Address is required'),
  address2:Yup.string(),
});

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
    features:item?.features || baseInitialValues.features,
    ratingCount: item?.ratingCount ?? baseInitialValues.ratingCount,
    reviewCount:item?.reviewCount ?? baseInitialValues.reviewCount,
    address1:item?.address1 || baseInitialValues.address1,
     address2:item?.address2 || baseInitialValues.address2,
    id: item?.id || '', 
});



const UpdateForm = ({ drawerOpen, setDrawerOpen, item, setPage,getReqestUrl }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const featureOptions = useSelector((state) => state.facility?.masterList || []);
  const masterFacilityTypeList = useSelector((state) => state.facility?.masterFacilityTypeList || []);

    const [shouldRender, setShouldRender] = useState(false);
    
       console.log("---------------------2-----facilityList--",getReqestUrl);


    useEffect(() => {
   let reqUrl =`/master-facility-features`
       dispatch(getMasterFacilities(reqUrl));
          let reqUrlFaclityType =`/master-facility-types`
       dispatch(getMasterFacilityType(reqUrlFaclityType));

       console.log("--------------------------facilityList--",masterFacilityTypeList);
         const timer = setTimeout(() => {
      setShouldRender(true);
    }, 3000);
    
    return () => clearTimeout(timer);
}, [dispatch]); 

  const submit = (values) => {
      if(values.is24H==true){
       values.openingTime="00:00";
       values.closingTime="00:00";
      }

      console.log('Updating Facility:', values);
                    
   values.geoLoc = values.geoLoc.map(str => parseFloat(str)); 


    if (values.id) { 
         delete values.ratingCount
         delete values.reviewCount
      dispatch(updateFacility({values,getReqestUrl})); 
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
      setFieldValuegetFacilitiesSuccess
    >
      {({ values, isSubmitting, isValid, dirty,setFieldValue }) => (
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
              style={{ display: 'grid', gap: '20px', 
                margin: '0 auto' 
            }}
            >

               <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto', maxHeight: '72vh',

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
                select 
                label="Facility Type"
                fullWidth
                
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                
                // Static Props
                disabled={false} 
                sx={{
                    '& .MuiInputBase-root.Mui-disabled': {
                        backgroundColor: '#cececeff',
                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                    },
                }}
            >
                <MenuItem value="">Select Facility Type</MenuItem>
                
                {masterFacilityTypeList && masterFacilityTypeList.map((ftype) => (
                    <MenuItem 
                     key={ftype.id} 
                     value={ftype.facilityType} 
                    >
                        {ftype.facilityType} 
                    </MenuItem>
                ))}
            </TextField>
        )}
    </Field>
</Grid>

    {/* category */}
<Grid item xs={6}>
    <Field name="category">
        {({ field, meta }) => (
            <TextField
                {...field}
                select 
                label="Category"
                fullWidth
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
            >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
            </TextField>
        )}
    </Field>
</Grid>



    {/* isPaid Checkbox */}
 <Grid item xs={6}>
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

     <Grid item xs={6}>
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


{!values.is24H && (
  <LocalizationProvider 
    dateAdapter={AdapterDayjs} 
    adapterLocale="en" 
  >
    <Grid item xs={12} sm={6}>
      <Field name="openingTime">
        {({ field, form, meta }) => (
          <MobileTimePicker
            label="Opening Time (HH:mm)"
            value={field.value ? dayjs(field.value, 'HH:mm') : null}
            onChange={(newValue) => {
              const timeString = newValue ? newValue.format('HH:mm') : '';
              form.setFieldValue('openingTime', timeString);
              console.log("-----------timeString------------",timeString)
              
            }}
            ampm={false}
            views={['hours', 'minutes']}
            format="HH:mm"
            slotProps={{
              textField: {
                fullWidth: true,
                error: meta.touched && !!meta.error,
                helperText: meta.touched && meta.error,
                placeholder: "00:00", 
              },
            }}
          />
        )}
      </Field>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Field name="closingTime">
        {({ field, form, meta }) => (
          <MobileTimePicker
            label="Closing Time (HH:mm)"
            value={field.value ? dayjs(field.value, 'HH:mm') : null}
            onChange={(newValue) => {
              const timeString = newValue ? newValue.format('HH:mm') : '';
              form.setFieldValue('closingTime', timeString);
            }}
            // 🔥 Force 24-hour format with multiple props
            ampm={false}
            views={['hours', 'minutes']}
            format="HH:mm"
            slotProps={{
              textField: {
                fullWidth: true,
                error: meta.touched && !!meta.error,
                helperText: meta.touched && meta.error,
                placeholder: "23:59", // 24-hour format placeholder
              },
            }}
          />
        )}
      </Field>
    </Grid>
  </LocalizationProvider>
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

<Grid item xs={6}>
  <Field name="features">
    {({ field, form, meta }) => (
      <FormControl fullWidth error={meta.touched && !!meta.error}>
        <InputLabel>Features</InputLabel>
        <Select
          {...field}
          multiple
          value={(field.value || []).map(f => f.featureId)} // Extract featureIds for Select value
          onChange={(event) => {
            const selectedFeatureIds = event.target.value;
            // Map selected featureIds to full feature objects
            const selectedFeatures = selectedFeatureIds.map(featureId => {
              const option = featureOptions.find(f => f.featureId === featureId);
              return {
                featureName: option.featureName,
                featureId: option.featureId
              };
            });
            form.setFieldValue(field.name, selectedFeatures);
          }}
          renderValue={(selected) => 
            selected
              .map((featureId) => {
                const option = featureOptions.find(f => f.featureId === featureId);
                return option ? option.featureName : featureId;
              })
              .join(', ')
          }
        >
          {featureOptions.map((option) => (
            <MenuItem   key={option.featureId} value={option.featureId}>
              <Checkbox checked={(field.value || []).some(f => f.featureId === option.featureId)}
              
              />
              <ListItemText  
              
              primary={option.featureName}
                 primaryTypographyProps={{ 
                sx: {
                    // Force the color override
                    color: `${theme.palette.primary.dark} !important`, 
                }
            }}
              />
            </MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error && (
          <Typography variant="caption" color="error">
            {meta.error}
          </Typography>
        )}
      </FormControl>
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
                    label="Name"
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
                    label="Email"
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


    <Grid item xs={12}>
    <Box sx={{ borderBottom: '1px solid #d3bfbfff', paddingBottom: '10px', marginTop: '10px' }}>
       
       {/* 🔑 FIX: Only render the MapPickerComponent when the drawer is open */}
       {shouldRender && (
           <MapPickerComponent
                key={values.geoLoc.join(',')} 
                initialLocation={values.geoLoc} 
                onLocationSelect={(newCoords) => {                
                    if (newCoords && newCoords.length === 2) {
                        setFieldValue('geoLoc[0]', String(newCoords[0]));
                        setFieldValue('geoLoc[1]', String(newCoords[1]));
                    }
                }} 
            />
       )}
        
        <Typography variant="h6" sx={{ mt: 2 }}>Location</Typography>
    </Box>
</Grid>

       {/* <Grid item xs={12}>
    <Box sx={{ borderBottom: '1px solid #d3bfbfff', paddingBottom: '10px', marginTop: '10px' }}>
       
       <MapPickerComponent
            key={values.geoLoc.join(',')} 
            initialLocation={values.geoLoc} 
            onLocationSelect={(newCoords) => {                
                if (newCoords && newCoords.length === 2) {
                    setFieldValue('geoLoc[0]', String(newCoords[0]));
                    setFieldValue('geoLoc[1]', String(newCoords[1]));
                }
            }} 
        />
        
        <Typography variant="h6" sx={{ mt: 2 }}>Location</Typography>
    </Box>
</Grid> */}
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
                select 
                label="District"
                fullWidth
                
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                
                // Static Props
                disabled={false} 
                sx={{
                    '& .MuiInputBase-root.Mui-disabled': {
                        backgroundColor: '#cececeff',
                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                    },
                }}
            >
                <MenuItem value="">Select District</MenuItem>
                
                {districtsData && districtsData.map((district) => (
                    <MenuItem 
                     key={district.districtCode} 
                     value={district.label} 
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
                    label="Pincode"
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