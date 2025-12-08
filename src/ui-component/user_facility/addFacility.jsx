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
  ListItemText,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
  TextField,
  Autocomplete
} from '@mui/material';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import * as Yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import FormikSwitch from '../common/toggleSwitch';
import MapPickerComponent from '../common/locationMapPicker';

import {
  Close as CloseIcon,
  Business as BusinessIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationOnIcon,
  AttachFile as AttachFileIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

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
  attachments: [],
  specialities: [] // ⭐ NEW FIELD ADDED HERE
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

  // ⭐ NEW FIELD ADDED HERE
  specialities: item?.specialities || baseInitialValues.specialities,

  id: item?.id || ''
});

const UpdateForm = ({ drawerOpen, setDrawerOpen, item, setPage, getReqestUrl }) => {
  const theme = useTheme();
  const primary = '#039123';
  const lightGreen = '#e8f5e9';

  const dispatch = useDispatch();
  const featureOptions = useSelector((state) => state.facility?.masterList || []);
  const masterFacilityTypeList = useSelector((state) => state.facility?.masterFacilityTypeList || []);
  const [shouldRender, setShouldRender] = useState(false);
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

  const handleNewFilesAdded = useCallback((fileList) => {
    const filesArray = Array.from(fileList).filter((file) => file.type.startsWith('image/'));
    setSelectedNewFiles((prevFiles) => [...prevFiles, ...filesArray]);
  }, []);

  const handleRemoveNewFile = useCallback((fileName) => {
    setSelectedNewFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  }, []);
  const [isDragging, setIsDragging] = useState(false);

  const submit = (values) => {
    if (values.is24H == true) {
      values.openingTime = '00:00';
      values.closingTime = '00:00';
    }

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
      if (selectedNewFiles.length > 0) {
        const isCreateOrUpdate = 'create';
        dispatch(uploadImagesStart({ values, getReqestUrl, selectedFiles: selectedNewFiles, isCreateOrUpdate }));
      } else {
        dispatch(createFacility(values));
      }
    }
    setDrawerOpen(false);
  };

  const DetailSection = ({ icon, title, children }) => (
    <Card
      variant="outlined"
      sx={{
        mb: 2.5,
        borderColor: `${primary}30`,
        '&:hover': { boxShadow: '0 2px 8px rgba(1,152,99,0.1)' }
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
          <Avatar sx={{ bgcolor: lightGreen, color: primary, width: 32, height: 32 }}>{icon}</Avatar>
          <Typography variant="h5" fontWeight={600} color={primary}>
            {title}
          </Typography>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );

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
              width: { xs: '100%', sm: '80%', md: '70%', lg: 800 },
              background: '#fff',
              boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
              borderLeft: '4px solid ${primary}'
            }
          }}
        >
          <Box sx={{ p: 3, height: '100%' }}>
            <Card sx={{ mb: 3, bgcolor: '#f0f9f6', borderRadius: 2, color: primary, boxShadow: 'none' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h3" fontWeight={700} color={primary}>
                    {item?.id ? 'Edit Facility' : 'Create New Facility'}
                  </Typography>
                  <IconButton
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      bgcolor: lightGreen,
                      color: primary,
                      '&:hover': { bgcolor: '#ffffff' }
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>

            <Form className="form-container" style={{ display: 'grid', gap: '20px', margin: '0 auto' }}>
              <Box flexGrow={1} overflow="auto" pr={1}>
                {/* Facility Information */}
                <DetailSection icon={<BusinessIcon />} title="Facility Information">
                  <Grid container spacing={2}>
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
                    {(values.facilityType === 'Restaurant' ||
                      values.facilityType === 'Cafe' ||
                      values.facilityType === 'Banquet Halls' ||
                      values.facilityType === 'Bar' ||
                      values.facilityType === 'Resort' ||
                      values.facilityType === 'Home Stay' ||
                      values.facilityType === 'Bakery' ||
                      values.facilityType === 'Residency') && (
                      <Grid item xs={12}>
                        <Field name="specialities">
                          {({ field, form, meta }) => (
                            <Autocomplete
                              multiple
                              freeSolo
                              options={[]}
                              value={field.value || []}
                              onChange={(event, newValue) => {
                                const uniqueValues = Array.from(new Set(newValue.map((v) => v.trim()))).filter(Boolean);
                                form.setFieldValue(field.name, uniqueValues);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Specialities *"
                                  placeholder="Type and press Enter"
                                  error={meta.touched && !!meta.error}
                                  helperText={meta.touched && meta.error}
                                  fullWidth
                                />
                              )}
                            />
                          )}
                        </Field>
                      </Grid>
                    )}

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

                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <FormikSwitch name="isPaid" />
                        <Typography variant="body1" component="label" htmlFor="isPaid" sx={{ color: values.isPaid ? 'green' : 'gray' }}>
                          Is Paid?
                        </Typography>
                      </Box>
                    </Grid>

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
                            inputProps={{ min: 1 }}
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
                            <InputLabel style={{ backgroundColor: 'white' }}>Features</InputLabel>
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

                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom color={primary}>
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
                  </Grid>
                </DetailSection>

                {/* Contact Information */}
                <DetailSection icon={<ContactPhoneIcon />} title="Contact Information">
                  <Grid container spacing={2}>
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
                  </Grid>
                </DetailSection>

                {/* Location Details */}
                <DetailSection icon={<LocationOnIcon />} title="Location Details">
                  <Grid container spacing={2}>
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
                  </Grid>
                </DetailSection>

                {/* Image Attachments */}
                <DetailSection icon={<AttachFileIcon />} title="Image Attachments">
                  <Grid container spacing={2}>
                    {/* Remarks Field */}
                    <Grid item xs={12}>
                      <Field name="remarks">
                        {({ field, meta }) => (
                          <TextField
                            {...field}
                            label="Remarks"
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Add any additional notes or instructions..."
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>

                    {/* Attachments */}
                    <Grid item xs={12}>
                      <ImageAttachmentManager
                        selectedNewFiles={selectedNewFiles}
                        onNewFilesAdded={handleNewFilesAdded}
                        onRemoveNewFile={handleRemoveNewFile}
                      />
                    </Grid>
                  </Grid>
                </DetailSection>
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
                      backgroundColor: '#039123',
                      borderRadius: 2,
                      border: '1px solid #039123',
                      boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#039123',
                        border: '1px solid #039123',
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
