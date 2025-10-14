import { Box, Typography, IconButton, Grid, useTheme, Divider, Chip, Card, CardContent, Stack, Avatar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PublicIcon from '@mui/icons-material/Public';
import PaidIcon from '@mui/icons-material/Paid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import ScheduleIcon from '@mui/icons-material/Schedule';
import StarIcon from '@mui/icons-material/Star';
import WcIcon from '@mui/icons-material/Wc';

const ViewFacilityDetail = ({ drawerOpen, setDrawerOpen, item }) => {
  console.log('==item', item);

  const theme = useTheme();

  const formatFrequency = (frequency) => {
    if (!frequency || frequency.length === 0) {
      return 'Not specified';
    }
    let arrayToJoin = frequency;
    if (Array.isArray(frequency[0])) {
      arrayToJoin = frequency[0];
    }
    if (Array.isArray(arrayToJoin) && arrayToJoin.length > 0) {
      return arrayToJoin.join(', ');
    }
    return 'Not specified';
  };

  const facilityFeatures = [
  { value: item.isPaid, label: 'Paid Service' },
  { value: item.is24H, label: '24 Hours' },
  { value: item.indianType, label: 'Indian Type' },
  { value: item.europeanType, label: 'European Type' },
  { value: item.isFavourite, label: 'Favourite' }
];
const activeFeatures = facilityFeatures.filter((feature) => feature.value);

  const StatusChip = ({ value, label }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip label={value ? 'Yes' : 'No'} color={value ? 'success' : 'default'} variant="outlined" size="small" />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );

  const DetailSection = ({ icon, title, children }) => (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.light, width: 32, height: 32, mr: 2 }}>{icon}</Avatar>
          <Typography variant="h6" fontWeight={600} color="primary">
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  const DetailItem = ({ label, value, icon, isSubtitle = false }) => (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 0.5,
          fontWeight: 500
        }}
      >
        {icon && (
          <Box component="span" sx={{ mr: 1 }}>
            {icon}
          </Box>
        )}
        {label}
      </Typography>
      <Typography
        variant={isSubtitle ? 'h6' : 'body1'}
        sx={{
          fontWeight: isSubtitle ? 600 : 500,
          color: theme.palette.text.primary,
          ml: icon ? 2.5 : 0
        }}
      >
        {value || 'N/A'}
      </Typography>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: '80%', md: '70%', lg: '800px' },
          maxWidth: '100vw',
          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
        }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
              Facility Details
            </Typography>
          </Box>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="large"
            sx={{
              bgcolor: theme.palette.action.hover,
              '&:hover': { bgcolor: theme.palette.action.selected }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
          {/* Main Facility Info */}
          <Card sx={{ mb: 3, bgcolor: '#019863', color: 'white' }}>
            <CardContent>
              <Typography sx={{ color: 'white' }} variant="h5" fontWeight={700} gutterBottom>
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                {/* <Chip 
                  label={item.status || 'Unknown'} 
                  color={item.status === 'active' ? 'success' : 'default'} 
                  sx={{ 
                    color: 'white',
                    bgcolor: item.status === 'active' ? theme.palette.success.main : theme.palette.grey[600] 
                  }} 
                /> */}
                <Chip
                  // icon={<StatusIco />}
                  label={item.status}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                />
                <Chip
                  // icon={<BusinessIcon />}
                  label={item.facilityType}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                />
                <Chip
                  // icon={<PublicIcon />}
                  label={item.category}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Basic Information */}
       <DetailSection icon={<BusinessIcon />} title="Basic Information">
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <DetailItem label="Facility ID" value={item.facilityId} isSubtitle />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DetailItem
          label="Seat Capacity"
          value={item.seatCapacity}
          icon={<PeopleIcon />}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Chip
          icon={<PaidIcon />}
          label={`Paid Service: ${item.isPaid ? 'Yes' : 'No'}`}
          sx={{
            bgcolor: item.isPaid ? '#e3f2fd' : '#fff3e0',
            color: item.isPaid ? '#1565c0' : '#ef6c00',
            border: '1px solid',
            borderColor: item.isPaid ? '#1565c0' : '#ef6c00',
            fontWeight: 600,
          }}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Chip
          icon={<AccessTimeIcon />}
          label={`24 Hours: ${item.is24H ? 'Yes' : 'No'}`}
          sx={{
            bgcolor: item.is24H ? '#e3f2fd' : '#fff3e0',
            color: item.is24H ? '#1565c0' : '#ef6c00',
            border: '1px solid',
            borderColor: item.is24H ? '#1565c0' : '#ef6c00',
            fontWeight: 600,
          }}
          variant="outlined"
        />
      </Grid>
    </Grid>

    {/* Facility Features */}
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mb: 1.5, fontWeight: 600,letterSpacing: 0.5 }}
      >
        Facility Features
      </Typography>

      <Stack
        direction="row"
        spacing={1.2}
        flexWrap="wrap"
        useFlexGap
        sx={{
          bgcolor: '#f9fafb',
          borderRadius: 2,
          p: 2,
          border: '1px solid #e0e0e0',
        }}
      >
        {item.features?.length > 0 ? (
          item.features.map((feature, index) => (
            <Chip
              key={index}
              icon={<CheckCircleIcon sx={{ color: '#4caf50 !important' }} />}
              label={feature.featureName}
              sx={{
                bgcolor: '#e8f5e9',
                color: '#2e7d32',
                borderRadius: '8px',
                border: '1px solid #a5d6a7',
                fontWeight: 500,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No additional features listed
          </Typography>
        )}
      </Stack>
    </Box>
  </DetailSection>
          {/* Operating Hours */}
          <DetailSection icon={<ScheduleIcon />} title="Operating Hours">
            <Grid container spacing={3}>
              {!item.is24H ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <DetailItem label="Opening Time" value={item.openingTime} icon={<AccessTimeIcon />} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem label="Closing Time" value={item.closingTime} icon={<AccessTimeIcon />} />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Chip icon={<AccessTimeIcon />} label="Open 24 Hours" color="success" variant="filled" />
                </Grid>
              )}
              <Grid item xs={12}>
                <DetailItem label="Operating Days" value={formatFrequency(item.frequency)} />
              </Grid>
            </Grid>
          </DetailSection>

          {/* Contact Information */}
          <DetailSection icon={<ContactMailIcon />} title="Contact Information">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DetailItem label="Contact Name" value={item.contactName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem label="Phone" value={item.contactPhone} />
              </Grid>
              <Grid item xs={12}>
                <DetailItem label="Email" value={item.contactEmail} />
              </Grid>
            </Grid>
          </DetailSection>

          {/* Location Details */}
          <DetailSection icon={<LocationOnIcon />} title="Location Details">
            <Grid container spacing={3}>
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
                <DetailItem label="District" value={`${item.district || 'N/A'} (${item.districtCode || 'N/A'})`} />
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
            </Grid>
          </DetailSection>

          {/* Additional Information */}
          <DetailSection icon={<AttachFileIcon />} title="Additional Information">
            <DetailItem label="Remarks" value={item.remarks} />

            {/* <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 500 }}>
                Attachments ({item.attachments?.length || 0})
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {item.attachments && item.attachments.length > 0 ? (
                  item.attachments.map((file, index) => (
                    <Chip
                      key={index}
                      icon={<AttachFileIcon />}
                      label={file.attachmentName || `Attachment ${index + 1}`}
                      color="primary"
                      variant="outlined"
                      component="a"
                      href={file.attachmentUrl || '#'}
                      clickable
                      target="_blank"
                      sx={{ mb: 1 }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No attachments available
                  </Typography>
                )}
              </Stack>
            </Box> */}
          </DetailSection>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ViewFacilityDetail;
