import React, { useState } from 'react';

import {
  Box,
  Typography,
  IconButton,
  Grid,
  useTheme,
  Chip,
  Card,
  CardContent,
  Stack,
  Avatar,
  Drawer,
  CardMedia,
  Modal,
  Button
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useDispatch, useSelector } from 'react-redux';
import {
  Close as CloseIcon,
  AttachFile as AttachFileIcon,
  Public as PublicIcon,
  Paid as PaidIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  ContactMail as ContactMailIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import LocationMapViewer from 'ui-component/common/locationMapView';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { getFacilities, updateFacility, getFacilitiesCount } from 'container/FacilityContainer/slice';

const ViewFacilityDetail = ({ drawerOpen, setDrawerOpen, item,currentFilter }) => {
  const theme = useTheme();
  const primary = '#039123';
  const lightGreen = '#e8f5e9';
  const lightYellow = '#f39c1236';
  const dispatch = useDispatch();
  const getReqUrl = `facilities/${item.id}`;



  const handleUpdateStatus = (newStatus) => {
    const values = {
      status: newStatus,
      id: item.id
    };
    const getReqestUrl = `facilities?filter=${encodeURIComponent(JSON.stringify(currentFilter))}`;

    const updateUrl = `facilities/${item.id}`;

    dispatch(updateFacility({ values, getReqestUrl }));

    setDrawerOpen(false);
  };

  const attachments = item?.attachments || [];
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  console.log('==item', item);

  const formatFrequency = (frequency) => {
    if (!frequency?.length) return 'Not specified';
    const arr = Array.isArray(frequency[0]) ? frequency[0] : frequency;
    return arr?.length ? arr.join(', ') : 'Not specified';
  };

  function capitalizeWords(str) {
    if (!str) return '';
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  const handleImageClick = (attachment) => {
    setSelectedImage(attachment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
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

  const DetailItem = ({ label, value, icon, isSubtitle }) => (
    <Box mb={1.5}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        {icon && (
          <Box component="span" sx={{ mr: 1, color: primary }}>
            {icon}
          </Box>
        )}
        {label}
      </Typography>
      <Typography
        variant={isSubtitle ? 'h6' : 'body1'}
        sx={{ fontWeight: isSubtitle ? 600 : 500, color: theme.palette.text.primary, ml: icon ? 2.5 : 0 }}
      >
        {value !== undefined && value !== null && value !== '' ? value : 'N/A'}
        {/* {value !== undefined && value !== null && value !== '' ? value : 'N/A'} */}
      </Typography>
    </Box>
  );

  const InfoChip = ({ icon, label, active }) => (
    <Chip
      icon={icon}
      label={label}
      sx={{
        bgcolor: active ? lightGreen : '#f5f5f5',
        color: active ? primary : '#757575',
        border: 'none',
        fontWeight: 400,
        '& .MuiChip-icon': { color: active ? primary : '#757575' }
      }}
      variant="outlined"
    />
  );

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: '80%', md: '70%', lg: 800 },
          background: '#fff',
          boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
          borderLeft: `4px solid ${primary}`
        }
      }}
    >
      <Box p={3} height="100%" display="flex" flexDirection="column">
        {/* Header */}
        <Box flexGrow={1} overflow="auto" pr={1}>
          <Card sx={{ mb: 3, bgcolor: '#f0f9f6', borderRadius: 2, color: primary, boxShadow: 'none' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h2" fontWeight={700} color={primary} mr={2}>
                    {capitalizeWords(item.title)}
                  </Typography>
                  <Chip label={capitalizeWords(item.status)} variant="filled" sx={{ color: 'white', background: primary }} />
                </Box>
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
              <Stack direction="row" flexWrap="wrap">
                <Typography sx={{ fontWeight: 400 }}>
                  {item.facilityId || 'N/A'} | {capitalizeWords(item.facilityType)} | {capitalizeWords(item.category)}
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <DetailSection icon={<BusinessIcon />} title="Basic Information">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <DetailItem label="Contact Name" value={item.contactName} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <DetailItem label="Contact Phone" value={item.contactPhone} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <DetailItem label="Contact Email" value={item.contactEmail} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <DetailItem label="Seat Capacity" value={item.seatCapacity} />
              </Grid>

              <Grid item xs={12} sm={8}>
                <DetailItem label="Operating Days" value={formatFrequency(item.frequency)} />
              </Grid>

              {!item.is24H ? (
                <>
                  <Grid item xs={12} sm={3}>
                    <DetailItem label="Opening Time" value={item.openingTime} />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <DetailItem label="Closing Time" value={item.closingTime} />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} sm={3}>
                  <InfoChip icon={<AccessTimeIcon />} label="Open 24 Hours" active={item.is24H} />
                </Grid>
              )}

              {/* Show this ONLY when not 24H */}
              {!item.is24H && (
                <Grid item xs={12} sm={3}>
                  <InfoChip icon={<AccessTimeIcon />} label={`24 Hours: No`} active={false} />
                </Grid>
              )}

              <Grid item xs={12} sm={3}>
                <InfoChip icon={<AttachMoneyIcon />} label={`Paid Service: ${item.isPaid ? 'Yes' : 'No'}`} active={item.isPaid} />
              </Grid>
            </Grid>

            {/* Facility Features */}
            <Box mt={3}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                Facility Features
              </Typography>

              <Stack
                direction="row"
                flexWrap="wrap"
                useFlexGap
                sx={{
                  gap: 1,
                  bgcolor: '#fafafa',
                  borderRadius: 2,
                  p: 2,
                  border: `1px solid ${primary}20`
                }}
              >
                {item.features?.length ? (
                  item.features.map((f, i) => (
                    <Chip
                      key={i}
                      icon={<CheckCircleIcon sx={{ color: primary }} />}
                      label={f.featureName}
                      sx={{
                        bgcolor: lightGreen,
                        color: primary,
                        border: `1px solid ${primary}60`,
                        fontWeight: 500,
                        borderRadius: '8px'
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No additional features
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Hide completely when 0 */}
            {item.specialities && item.specialities.length > 0 && (
              <Box mt={3}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Specialities
                </Typography>

                <Stack
                  direction="row"
                  flexWrap="wrap"
                  useFlexGap
                  sx={{
                    gap: 1,
                    bgcolor: '#fafafa',
                    borderRadius: 2,
                    p: 2,
                    border: `1px solid ${primary}20`
                  }}
                >
                  {item.specialities.map((f, i) => (
                    <Chip
                      key={i}
                      label={f}
                      sx={{
                        bgcolor: lightYellow,
                        color: '#f39c0a',
                        border: `1px solid #f39c0a60`,
                        fontWeight: 500,
                        borderRadius: '8px'
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </DetailSection>

          {/* Location Details */}
          <DetailSection icon={<LocationOnIcon />} title="Location Details">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DetailItem label="Address Line 1" value={item.address1} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem label="Address Line 2" value={item.address2} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem label="City" value={item.city} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem label="State" value={item.state} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem label="District" value={`${item.district || 'N/A'}`} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem label="Pincode" value={item.pinCode} />
              </Grid>
              <Grid item xs={12}>
                <DetailItem label="Landmark" value={item.landmark} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem label="Latitude" value={item.geoLoc?.[0]} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem label="Longitude" value={item.geoLoc?.[1]} />
              </Grid>
              <Grid item xs={12}>
                <LocationMapViewer location={[item.geoLoc?.[0], item.geoLoc?.[1]]} zoom={16} />
              </Grid>
            </Grid>
          </DetailSection>

          {/* Additional Information */}
          <DetailSection icon={<AttachFileIcon />} title="Additional Information">
            <Grid container spacing={2}>
              {/* Remarks */}
              <Grid item xs={12} sm={6}>
                <DetailItem label="Remarks" value={item.remarks} />
              </Grid>

              {/* Attachments */}
              <Grid item xs={12} sm={6}>
                <DetailItem label="Attachments" value={attachments && attachments.length > 0 ? 'Available' : 'N/A'} />

                {/* Image Grid */}
                <Grid container spacing={1} mt={1}>
                  {attachments.map((attachment, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          '&:hover': { transform: 'scale(1.05)', boxShadow: 3 }
                        }}
                        onClick={() => handleImageClick(attachment)}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="120"
                            image={attachment.attachmentUrl}
                            alt={attachment.attachmentName}
                            sx={{ objectFit: 'cover', width: '100%', borderRadius: 1 }}
                          />

                          {/* Overlay Title */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                              bgcolor: 'rgba(0,0,0,0.6)',
                              color: '#fff',
                              px: 1,
                              py: 0.5,
                              fontSize: '0.75rem',
                              textAlign: 'center',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              borderBottomLeftRadius: 4,
                              borderBottomRightRadius: 4
                            }}
                          >
                            {attachment.attachmentName || 'Untitled'}
                          </Box>

                          {/* Zoom Icon */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              borderRadius: '50%',
                              padding: '4px'
                            }}
                          >
                            <ZoomInIcon sx={{ color: 'white', fontSize: 16 }} />
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>

            {/* Approve / Reject Buttons (below both Remarks and Attachments) */}
            {item.status === 'draft' && (
              <Stack direction="row" spacing={2} mt={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleUpdateStatus('active')}
                  sx={{
                    backgroundColor: '#4caf50',
                    '&:hover': { backgroundColor: '#43a047' },
                    py: 1.5,
                    fontWeight: 600
                  }}
                >
                  Approve
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleUpdateStatus('rejected')}
                  sx={{
                    backgroundColor: '#f44336',
                    '&:hover': { backgroundColor: '#d32f2f' },
                    py: 1.5,
                    fontWeight: 600
                  }}
                >
                  Reject
                </Button>
              </Stack>
            )}

            {/* Image Modal */}
            <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <Box
                sx={{
                  position: 'relative',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 1
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    zIndex: 1,
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {selectedImage && (
                  <Box>
                    <img
                      src={selectedImage.attachmentUrl}
                      alt={selectedImage.attachmentName}
                      style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', display: 'block' }}
                    />
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6">{selectedImage.attachmentName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Uploaded: {new Date(selectedImage.attachedOn).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Type: {selectedImage.attachmentType}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Modal>
          </DetailSection>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ViewFacilityDetail;
