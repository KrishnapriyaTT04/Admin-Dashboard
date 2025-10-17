// import { useEffect, useState ,useCallback} from 'react';
import React, { useEffect, useState, useCallback, useRef } from 'react';

import {
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  useTheme,
  FormControl,
  Paper,
  InputLabel,
  Select,
  Checkbox,
  ListItemText
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
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

import {
  createFacility,
  updateFacility,
  getMasterFacilities,
  getMasterFacilityType,
  uploadImagesStart
} from 'container/FacilityContainer/slice';

import { districtsData } from '../common/district';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageAttachmentManager from 'ui-component/common/existingImageComponent';

// import ImageDropzone from '../common/multiImageSelection';

const dayMap = [
  { id: 'Monday', label: 'Mon' },
  { id: 'Tuesday', label: 'Tue' },
  { id: 'Wednesday', label: 'Wed' },
  { id: 'Thursday', label: 'Thu' },
  { id: 'Friday', label: 'Fri' },
  { id: 'Saturday', label: 'Sat' },
  { id: 'Sunday', label: 'Sun' }
];

const baseInitialValues = {
  title: '',
  category: '',
  isPaid: false,
  facilityType: '',
  openingTime: '',
  closingTime: '',
  is24H: false,
  seatCapacity: 1,
  ratingCount: 0,
  reviewCount: 0,
  remarks: '',
  status: 'active',
  frequency: [],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  city: '',
  state: 'kerala',
  stateId: 'kl',
  district: '',
  districtCode: '',
  pinCode: '',
  geoLoc: ['', ''],
  landmark: '',
  address1: '',
  address2: '',
  features: [],
  attachments: []
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  isPaid: Yup.boolean(),
  facilityType: Yup.string().required('Facility Type is required'),
  openingTime: Yup.string().when('is24H', {
    is: false,
    then: (schema) => schema.required('Opening time is required'),
    otherwise: (schema) => schema.nullable()
  }),
  closingTime: Yup.string().when('is24H', {
    is: false,
    then: (schema) => schema.required('Closing time is required'),
    otherwise: (schema) => schema.nullable()
  }),
  is24H: Yup.boolean(),
  seatCapacity: Yup.number().integer().min(0, 'Capacity cannot be negative'),
  remarks: Yup.string().max(500, 'Remarks must be under 500 characters'),
  status: Yup.string().required('Status is required'),
  frequency: Yup.array().of(Yup.string()).min(1, 'Please select at least one day or frequency.'),
  contactName: Yup.string(),
  contactEmail: Yup.string().email('Invalid email format'),
  contactPhone: Yup.string().matches(/^[0-9]+$/, 'Phone must be only digits'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  stateId: Yup.string().required('State Id is required'),
  district: Yup.string().required('District is required'),
  districtCode: Yup.string(),
  pinCode: Yup.string()
    .required('Pincode  is required')
    .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
  geoLoc: Yup.array().of(Yup.string().required('Lat/Long value is required')).min(2).max(2, 'Must provide both Latitude and Longitude'),
  landmark: Yup.string(),
  features: Yup.array(),
  address1: Yup.string().required('Address is required'),
  address2: Yup.string(),
  attachments: Yup.array()
});

const getInitialValues = (item) => ({
  ...baseInitialValues,
  title: item?.title || baseInitialValues.title,
  category: item?.category ? String(item.category).toLowerCase() : baseInitialValues.category,
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
  districtCode: item?.districtCode || baseInitialValues.districtCode,
  pinCode: item?.pinCode || baseInitialValues.pinCode,
  geoLoc: item?.geoLoc?.length === 2 ? item.geoLoc : baseInitialValues.geoLoc,
  landmark: item?.landmark || baseInitialValues.landmark,
  features: item?.features || baseInitialValues.features,
  ratingCount: item?.ratingCount ?? baseInitialValues.ratingCount,
  reviewCount: item?.reviewCount ?? baseInitialValues.reviewCount,
  address1: item?.address1 || baseInitialValues.address1,
  address2: item?.address2 || baseInitialValues.address2,
  attachments: item?.attachments || baseInitialValues.attachments,
  id: item?.id || ''
});

const UpdateForm = ({ drawerOpen, setDrawerOpen, item, setPage, getReqestUrl }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const featureOptions = useSelector((state) => state.facility?.masterList || []);
  const masterFacilityTypeList = useSelector((state) => state.facility?.masterFacilityTypeList || []);
  const [shouldRender, setShouldRender] = useState(false);
  //   const [selectedFiles, setSelectedFiles] = useState([]);
  //   const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedNewFiles, setSelectedNewFiles] = useState([]);

  useEffect(() => {
    let reqUrl = `/master-facility-features`;
    dispatch(getMasterFacilities(reqUrl));
    let reqUrlFaclityType = `/master-facility-types`;
    dispatch(getMasterFacilityType(reqUrlFaclityType));
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleFilesAdded = (fileList) => {
    const newFiles = Array.from(fileList).filter((file) => file.type.startsWith('image/'));

    setSelectedFiles((prevFiles) => {
      // Create a Set of existing file names for quick lookup
      const existingFileNames = new Set(prevFiles.map((file) => file.name));

      // Filter out duplicates from new files
      const uniqueNewFiles = newFiles.filter((file) => !existingFileNames.has(file.name));

      return [...prevFiles, ...uniqueNewFiles];
    });
  };

  // Handler to REMOVE a file
  const handleFileRemoved = (fileName) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  // Handler for file input change
  //   const handleFileChange = (event) => {
  //     if (event.target.files && event.target.files.length > 0) {
  //       handleFilesAdded(event.target.files);
  //     }
  //     // Reset the input to allow same file selection again
  //     event.target.value = '';
  //   };

  //   const handleUploadClick = () => {
  //     fileInputRef.current?.click();
  //   };

  const handleAddMoreClick = () => {
    fileInputRef.current?.click();
  };

  // Drag & Drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragging(false);
    }
  };

  //   const handleDrop = (event) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     setIsDragging(false);

  //     if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
  //       handleFilesAdded(event.dataTransfer.files);
  //     }
  //   };

  const handleUploadSubmit = () => {
    console.log('Final files for upload:', selectedFiles);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });
    // Your API call here
    // fetch('/api/upload-images', { method: 'POST', body: formData });

    // Optional: Clear files after upload
    // setSelectedFiles([]);
  };

  const handleClearAll = () => {
    setSelectedFiles([]);
  };

  const handleNewFilesAdded = useCallback((fileList) => {
    const filesArray = Array.from(fileList).filter((file) => file.type.startsWith('image/'));
    setSelectedNewFiles((prevFiles) => [...prevFiles, ...filesArray]);
  }, []);

  const handleRemoveNewFile = useCallback((fileName) => {
    // Remove based on file name (used as identifier)
    setSelectedNewFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  }, []);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleNewFilesAdded(event.dataTransfer.files); // 🎯 Use the new handler
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      handleNewFilesAdded(event.target.files); // 🎯 Use the new handler
    }
    event.target.value = '';
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const submit = (values) => {
    if (values.is24H == true) {
      values.openingTime = '00:00';
      values.closingTime = '00:00';
    }

    console.log('Updating Facility:', values);
    //   console.log("Final files for upload:", selectedFiles);

    //   return;
    values.geoLoc = values.geoLoc.map((str) => parseFloat(str));

    if (values.id) {
      delete values.ratingCount;
      delete values.reviewCount;

      if (selectedNewFiles.length > 0) {
        const isCreateOrUpdate = 'update';
        dispatch(uploadImagesStart({ values, getReqestUrl, selectedFiles: selectedNewFiles, isCreateOrUpdate }));
      } else {
        dispatch(updateFacility({ values, getReqestUrl }));
      }
    } else {
         delete values.id; 
          if(selectedNewFiles.length>0){
             const  isCreateOrUpdate ='create'
               dispatch(uploadImagesStart({values,getReqestUrl,selectedFiles:selectedNewFiles,isCreateOrUpdate})); 
          }else{
        dispatch(createFacility(values));
      }
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
      {({ values, isSubmitting, isValid, dirty, setFieldValue }) => (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: { xs: '100%', sm: '80%', md: '60%', lg: '1100px' },
              maxWidth: '100vw',
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          <Box sx={{ p: 3, height: '100%' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ color: theme.palette.primary.dark }}>
                {item?.id ? 'Edit Facility' : 'Create New Facility'}
              </Typography>
              <IconButton onClick={() => setDrawerOpen(false)} size="large">
                <CloseIcon />
              </IconButton>
            </Grid>

            <Form className="form-container" style={{ display: 'grid', gap: '20px', margin: '0 auto' }}>
              <Box
                sx={{
                  p: 3,
                  flexGrow: 1,
                  overflowY: 'auto',
                  maxHeight: '72vh',

                  '&::-webkit-scrollbar': {
                    width: '6px',
                    backgroundColor: 'transparent'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px'
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.4)'
                  }
                }}
              >
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Facility Details
                </Typography>

                {/* title */}
                <Grid container spacing={3}>
                  {/* title */}
                  <Grid item xs={12}>
                    <Field name="title">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label="Title *"
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
                          label="Facility Type *"
                          fullWidth
                          error={meta.touched && !!meta.error}
                          helperText={meta.touched && meta.error}
                          disabled={false}
                          sx={{
                            '& .MuiInputBase-root.Mui-disabled': {
                              backgroundColor: '#cececeff',
                              WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)'
                            }
                          }}
                        >
                          <MenuItem value="">Select Facility Type</MenuItem>

                          {masterFacilityTypeList &&
                            masterFacilityTypeList.map((ftype) => (
                              <MenuItem key={ftype.id} value={ftype.facilityType}>
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
                          label="Category *"
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
                      <Typography variant="body1" component="label" htmlFor="isPaid" sx={{ color: values.isPaid ? 'green' : 'gray' }}>
                        Is Paid?
                      </Typography>
                    </Box>
                  </Grid>

                  {/* is24H Checkbox */}

                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <FormikSwitch name="is24H" />
                      <Typography variant="body1" component="label" htmlFor="is24H" sx={{ color: values.is24H ? 'green' : 'gray' }}>
                        Open 24 Hours?
                      </Typography>
                    </Box>
                  </Grid>

                  {!values.is24H && (
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                      <Grid item xs={12} sm={6}>
                        <Field name="openingTime">
                          {({ field, form, meta }) => (
                            <MobileTimePicker
                              label="Opening Time (HH:mm) *"
                              value={field.value ? dayjs(field.value, 'HH:mm') : null}
                              onChange={(newValue) => {
                                const timeString = newValue ? newValue.format('HH:mm') : '';
                                form.setFieldValue('openingTime', timeString);
                              }}
                              ampm={false}
                              views={['hours', 'minutes']}
                              format="HH:mm"
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  error: meta.touched && !!meta.error,
                                  helperText: meta.touched && meta.error,
                                  placeholder: '00:00'
                                }
                              }}
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field name="closingTime">
                          {({ field, form, meta }) => (
                            <MobileTimePicker
                              label="Closing Time (HH:mm) *"
                              value={field.value ? dayjs(field.value, 'HH:mm') : null}
                              onChange={(newValue) => {
                                const timeString = newValue ? newValue.format('HH:mm') : '';
                                form.setFieldValue('closingTime', timeString);
                              }}
                              ampm={false}
                              views={['hours', 'minutes']}
                              format="HH:mm"
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  error: meta.touched && !!meta.error,
                                  helperText: meta.touched && meta.error,
                                  placeholder: '23:59'
                                }
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
                            value={(field.value || []).map((f) => f.featureId)}
                            onChange={(event) => {
                              const selectedFeatureIds = event.target.value;
                              const selectedFeatures = selectedFeatureIds.map((featureId) => {
                                const option = featureOptions.find((f) => f.featureId === featureId);
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
                                  const option = featureOptions.find((f) => f.featureId === featureId);
                                  return option ? option.featureName : featureId;
                                })
                                .join(', ')
                            }
                          >
                            {featureOptions.map((option) => (
                              <MenuItem key={option.featureId} value={option.featureId}>
                                <Checkbox checked={(field.value || []).some((f) => f.featureId === option.featureId)} />
                                <ListItemText
                                  primary={option.featureName}
                                  primaryTypographyProps={{
                                    sx: {
                                      color: `${theme.palette.primary.dark} !important`
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
                    <Typography variant="subtitle1" gutterBottom>
                      Frequency (Days Available)*
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {dayMap.map((day) => (
                        <label key={day.id} style={{ display: 'flex', alignItems: 'center', color: 'gray' }}>
                          <Field type="checkbox" name="frequency" value={day.id} style={{ marginRight: '4px' }} />
                          {day.label}
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
                          label="Address 1 *"
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

                      <Typography variant="h6" sx={{ mt: 2 }}>
                        Location
                      </Typography>
                    </Box>
                  </Grid>

                  {/* geoLoc */}
                  <Grid item xs={12} sm={6}>
                    <Field name="geoLoc[0]">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label="Latitude *"
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
                          label="Longitude *"
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
                          select
                          label="State *"
                          fullWidth
                          error={meta.touched && !!meta.error}
                          helperText={meta.touched && meta.error}
                          disabled={true}
                          sx={{
                            '& .MuiInputBase-root.Mui-disabled': {
                              backgroundColor: '#cececeff'
                            }
                          }}
                        >
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
                          label="District *"
                          fullWidth
                          error={meta.touched && !!meta.error}
                          helperText={meta.touched && meta.error}
                          disabled={false}
                          sx={{
                            '& .MuiInputBase-root.Mui-disabled': {
                              backgroundColor: '#cececeff',
                              WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)'
                            }
                          }}
                        >
                          <MenuItem value="">Select District</MenuItem>

                          {districtsData &&
                            districtsData.map((district) => (
                              <MenuItem key={district.districtCode} value={district.label}>
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
                          label="City *"
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
                          label="Pincode *"
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
                          label="Landmark "
                          fullWidth
                          error={meta.touched && !!meta.error}
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </Grid>

                  {/* <Box sx={{ p: 3 }}>
      <h2>Facility Details and Image Upload</h2>

      <ImageDropzone
        selectedFiles={selectedFiles}
        onFilesAdded={handleFilesAdded}
        onFileRemoved={handleFileRemoved}
      />

      {selectedFiles.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearAll}
          >
            Clear All ({selectedFiles.length})
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadSubmit}
          >
            Upload {selectedFiles.length} Images to Server
          </Button>
        </Box>
      )}
    </Box> */}

                  <Grid item xs={12}>
                    <Box sx={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '10px' }}>
                      <Typography variant="h5">Image Upload</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <ImageAttachmentManager
                      selectedNewFiles={selectedNewFiles}
                      onNewFilesAdded={handleNewFilesAdded}
                      onRemoveNewFile={handleRemoveNewFile}
                    />
                  </Grid>

                  {/* <Box sx={{ p: 3,  margin: 'auto' }}>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        sx={{
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          border: `10px dashed ${isDragging ? 'primary.main' : 'grey.400'}`,
          backgroundColor: isDragging ? 'primary.light' : 'background.paper',
          transition: 'all 0.3s',
          mb: 3,
          '&:hover': {
            backgroundColor: 'grey.50',
          }
        }}
      >
        <CloudUploadIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6">
          Drag & drop images here or click to browse
        </Typography>
        <Typography variant="body2" color="textSecondary">
          (Supports multiple files)
        </Typography>
      </Paper>

      {selectedFiles.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Selected Images ({selectedFiles.length})
            </Typography>
            <Button
              variant="outlined"
              onClick={handleAddMoreClick}
              startIcon={<CloudUploadIcon />}
            >
              Add More Images
            </Button>
          </Box>

          <Grid container spacing={2}>
            {selectedFiles.map((file, index) => (
              <Grid item key={`${file.name}-${index}-${file.lastModified}`}>
                <Paper
                  elevation={3}
                  sx={{
                    position: 'relative',
                    width: 120,
                    height: 120,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${file.name}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  <IconButton
                    size="small"
                    onClick={() => handleFileRemoved(file.name)}
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 1)',
                      }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {selectedFiles.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearAll}
          >
            Clear All ({selectedFiles.length})
          </Button>

        </Box>
      )}
    </Box> */}
                </Grid>
              </Box>

              <Grid container spacing={1} pb={5}>
                <Grid item xs={6}></Grid>
                <Grid item xs={12} marginInline={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<CheckCircleOutlineIcon />}
                    fullWidth
                    sx={{
                      mt: 1,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: 16,
                      color: '#fff',
                      backgroundColor: '#019863',
                      borderRadius: 2,
                      border: '1px solid #019863',
                      boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#019863',
                        border: '1px solid #019863',
                        backgroundImage: 'none'
                      }
                    }}
                    disabled={isSubmitting || !isValid}
                  >
                    {isSubmitting ? 'Submitting...' : item?.id ? 'Update Facility' : 'Create Facility'}
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










