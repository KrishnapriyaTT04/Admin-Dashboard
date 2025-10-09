import { Box, Typography, IconButton, Grid, useTheme, Divider, Paper, Chip } from '@mui/material';
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

const ViewFacilityDetail = ({ drawerOpen, setDrawerOpen, item }) => {
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


  const TrueFalseText = ({ label, value }) => (
    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography component="span" variant="subtitle2" color="text.secondary">{label}:</Typography>
      <Typography 
        component="span" 
        sx={{ 
          color: theme.palette.text.primary,
          fontWeight: 'bold' 
        }}
      >
        {value ? 'Yes' : 'No'}
      </Typography>
    </Typography>
  );
  const DetailText = ({ label, value, isSubtitle = false }) => (
    <>
      <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
      <Typography 
        variant={isSubtitle ? "subtitle1" : "body1"} 
        sx={{ 
          fontWeight: isSubtitle ? 600 : 500, 
          color: theme.palette.text.primary
        }}
      >
        {value || 'N/A'}
      </Typography>
    </>
  );


  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: '80%', md: '60%', lg: '900px' },
          maxWidth: '100vw',
          backgroundColor: theme.palette.common.white,
        }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            User Facility Details
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} size="large">
            <CloseIcon />
          </IconButton>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Grid container spacing={3}>

            {/* --- Facility Details --- */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <BusinessIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600} color="text.primary">Facility Details</Typography>
              </Box>
            </Grid>

            {/* Title (Full Width) */}
            <Grid item xs={12}>
                <DetailText label="Title" value={item.title} isSubtitle={true} />
            </Grid>
            <Grid item xs={12}>
                <DetailText label="Facility Id" value={item.id} isSubtitle={true} />
            </Grid>

            {/* Facility Type & Category */}
            <Grid item xs={12} sm={6}>
              <DetailText label="Facility Type" value={item.facilityType} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailText label="Category" value={item.category} />
            </Grid>

            {/* Statuses (Is Paid, Is 24H, etc.) */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
                <TrueFalseText label="Is Paid" value={item.isPaid} />
                <TrueFalseText label="Open 24 Hours" value={item.is24H} />
                <TrueFalseText label="Indian Type" value={item.indianType} /> 
                <TrueFalseText label="European Type" value={item.europeanType} />
                <TrueFalseText label="Is Favourite" value={item.isFavourite} />
              </Box>
            </Grid>

            {/* Conditional Time Display */}
            {!item.is24H && (
              <>
                <Grid item xs={6} sm={6}>
                  <DetailText label="Opening Time" value={item.openingTime} />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <DetailText label="Closing Time" value={item.closingTime} />
                </Grid>
              </>
            )}

            {/* Seat Capacity */}
            <Grid item xs={12} sm={6}>
              <DetailText label="Seat Capacity" value={item.seatCapacity} />
            </Grid>
            
            {/* Facility Status */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Status</Typography>
              <Chip 
                label={item.status || 'N/A'} 
                color={item.status === 'active' ? 'success' : 'default'} 
                size="small" 
                sx={{ color: item.status === 'active' ? 'white' : 'black' }} 
              />
            </Grid>


            {/* Frequency (Days Available) */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">Frequency (Days Available)</Typography>
              <Typography variant="body1" sx={{ wordBreak: 'break-word', color: theme.palette.text.primary }}>
                {formatFrequency(item.frequency)}
              </Typography>
            </Grid>

            {/* --- Contact Information Divider --- */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ContactMailIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600} color="text.primary">Contact Information</Typography>
              </Box>
            </Grid>

            {/* Contact Name */}
            <Grid item xs={12} sm={4}>
              <DetailText label="Contact Name" value={item.contactName} />
            </Grid>

            {/* Contact Email */}
            <Grid item xs={12} sm={4}>
              <DetailText label="Contact Email" value={item.contactEmail} />
            </Grid>

            {/* Contact Phone */}
            <Grid item xs={12} sm={4}>
              <DetailText label="Phone" value={item.contactPhone} />
            </Grid>

            {/* --- Location Divider --- */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600} color="text.primary">Location</Typography>
              </Box>
            </Grid>

            {/* Address 1 & Address 2 */}
            <Grid item xs={12} sm={6}>
              <DetailText label="Address Line 1" value={item.address1} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailText label="Address Line 2" value={item.address2} />
            </Grid>

            {/* City & State */}
            <Grid item xs={12} sm={6}>
              <DetailText label="City" value={item.city} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailText label="State" value={item.state} />
            </Grid>

            {/* District & Pin Code */}
            <Grid item xs={12} sm={6}>
              <DetailText label="District" value={`${item.district || 'N/A'} (${item.districtCode || 'N/A'})`} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailText label="Pin Code" value={item.pinCode} />
            </Grid>

            {/* Landmark */}
            <Grid item xs={12} sm={12}>
              <DetailText label="Landmark" value={item.landmark} />
            </Grid>

            {/* Latitude & Longitude */}
            <Grid item xs={12} sm={6}>
              <DetailText label="Latitude" value={item.geoLoc?.[0]} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailText label="Longitude" value={item.geoLoc?.[1]} />
            </Grid>
            
            {/* --- Attachments & Remarks --- */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachFileIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600} color="text.primary">Other Information</Typography>
              </Box>
            </Grid>

            {/* Remarks */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Remarks</Typography>
              <Typography variant="body1" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', color: theme.palette.text.primary }}>{item.remarks || 'N/A'}</Typography>
            </Grid>

            {/* Attachments */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Attachments ({item.attachments?.length || 0})</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {item.attachments && item.attachments.length > 0 ? (
                  item.attachments.map((file, index) => (
                    <Chip
                      key={index}
                      icon={<AttachFileIcon />}
                      label={file.attachmentName || `Attachment ${index + 1}`}
                      sx={{ mr: 1, mb: 1 }}
                      color="primary"
                      variant="outlined"
                      component="a"
                      href={file.attachmentUrl || '#'}
                      clickable
                      target="_blank" 
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">No attachments found.</Typography>
                )}
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ViewFacilityDetail;