

import { Box, Typography, IconButton, Grid, useTheme, Divider, Paper } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CommentIcon from '@mui/icons-material/Comment';

const ViewFacilityDetail = ({ drawerOpen, setDrawerOpen, item }) => {
  const theme = useTheme();


  const formatTime = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: '80%', md: '60%', lg: '900px' },
          maxWidth: '100vw',
          backgroundColor: '#fafafa',
        }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            User facility Details
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} size="large">
            <CloseIcon />
          </IconButton>
        </Grid>

        <Divider sx={{ mb: 3 }} />

<Grid container spacing={3}>
    
    {/* Facility Details */}
    <Grid item xs={12}>
        <Typography variant="h5" sx={{mb:2}}>Facility Details</Typography>
    </Grid>
    
    {/* Title (Full Width) */}
    <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">Title</Typography>
        <Typography variant="body1">{item.title || 'N/A'}</Typography>
    </Grid>

    {/* Facility Type */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">Facility Type</Typography>
        <Typography variant="body1">{item.facilityType || 'N/A'}</Typography>
    </Grid>

    {/* Category */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">Category</Typography>
        <Typography variant="body1">{item.category || 'N/A'}</Typography>
    </Grid>
    
    {/* Checkbox Statuses (Displayed as text) */}
    <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 4, mt: 1 }}>
            {/* Is Paid? */}
            <Typography variant="body1">
                <Typography component="span" variant="subtitle2" color="text.secondary">Is Paid: </Typography>
                <Typography component="span" sx={{ color: item.isPaid ? 'green' : 'gray', fontWeight: 'bold' }}>
                    {item.isPaid ? 'Yes' : 'No'}
                </Typography>
            </Typography>

            {/* Open 24 Hours? */}
            <Typography variant="body1">
                <Typography component="span" variant="subtitle2" color="text.secondary">Open 24 Hours: </Typography>
                <Typography component="span" sx={{ color: item.is24H ? 'green' : 'gray', fontWeight: 'bold' }}>
                    {item.is24H ? 'Yes' : 'No'}
                </Typography>
            </Typography>

            {/* Is Indian? */}
            <Typography variant="body1">
                <Typography component="span" variant="subtitle2" color="text.secondary">Indian Type: </Typography>
                <Typography component="span" sx={{ color: item.isIndianType ? 'green' : 'gray', fontWeight: 'bold' }}>
                    {item.isIndianType ? 'Yes' : 'No'}
                </Typography>
            </Typography>
        </Box>
    </Grid>
    
    {/* Conditional Time Display */}
    {!item.is24H && (
        <>
            <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Opening Time</Typography>
                <Typography variant="body1">{item.openingTime || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Closing Time</Typography>
                <Typography variant="body1">{item.closingTime || 'N/A'}</Typography>
            </Grid>
        </>
    )}

    {/* Seat Capacity */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">Seat Capacity</Typography>
        <Typography variant="body1">{item.seatCapacity || 'N/A'}</Typography>
    </Grid>

    {/* Frequency (Days Available) */}
    <Grid item xs={12}>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">Frequency (Days Available)</Typography>
        <Typography variant="body1">
            {item.frequency && item.frequency.length > 0
                ? item.frequency.join(', ') // Display selected days comma-separated
                : 'Not specified'}
        </Typography>
    </Grid>


    {/* --- Contact Information Divider --- */}
    <Grid item xs={12}>
        <Box sx={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '10px' }}>
            <Typography variant="h5">Contact Information</Typography>
        </Box>
    </Grid>

    {/* contactInfo.name */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">Contact Name</Typography>
        <Typography variant="body1">{item.contactInfo?.name || 'N/A'}</Typography>
    </Grid>

    {/* contactInfo.email */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">Contact Email</Typography>
        <Typography variant="body1">{item.contactInfo?.email || 'N/A'}</Typography>
    </Grid>
       
    {/* contactInfo.phone */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
        <Typography variant="body1">{item.contactInfo?.phone || 'N/A'}</Typography>
    </Grid>
    
    {/* --- Location Divider --- */}
    <Grid item xs={12}>
        <Box sx={{ borderBottom: '1px solid #d3bfbfff', paddingBottom: '10px', marginTop: '10px' }}>
            <Typography variant="h5">Location</Typography>
        </Box>
    </Grid>

    {/* geoLoc[0] - Latitude */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">Latitude</Typography>
        <Typography variant="body1">{item.geoLoc?.[0] || 'N/A'}</Typography>
    </Grid>
    
    {/* geoLoc[1] - Longitude */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">Longitude</Typography>
        <Typography variant="body1">{item.geoLoc?.[1] || 'N/A'}</Typography>
    </Grid>

    {/* state */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">State</Typography>
        <Typography variant="body1">{item.state || 'N/A'}</Typography>
    </Grid>
    
    {/* district */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">District</Typography>
        {/* Note: If item.district is a code (e.g., 'kkd'), you'll need logic here to look up the full label. */}
        <Typography variant="body1">{item.district || 'N/A'}</Typography>
    </Grid>

    {/* city */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">City</Typography>
        <Typography variant="body1">{item.city || 'N/A'}</Typography>
    </Grid>

      {/* pin */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">Pin Code</Typography>
        <Typography variant="body1">{item.pinCode || 'N/A'}</Typography>
    </Grid>

    {/* landmark */}
    <Grid item xs={6}>
        <Typography variant="subtitle2" color="text.secondary">Landmark</Typography>
        <Typography variant="body1">{item.landmark || 'N/A'}</Typography>
    </Grid>
    
</Grid>
      </Box>
    </Drawer>
  );
};

export default ViewFacilityDetail;