import { Box, Typography, IconButton, Grid, useTheme, Divider, Paper } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge'; 

// Component for viewing individual user details in a side drawer
const ViewUserDetail = ({ drawerOpen, setDrawerOpen, item }) => {
  const theme = useTheme(); 

  // Helper function to safely format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      // Use a consistent, readable format
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };
  
  // Helper function to display the full name
  const getFullName = () => {
    return item?.fullName || (item?.firstName && item?.lastName ? `${item.firstName} ${item.lastName}` : 'N/A');
  };

  const DetailItem = ({ icon: Icon, title, value }) => (
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        {Icon && <Icon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />}
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ wordBreak: 'break-word', textTransform: title === 'Role' || title === 'User Type' || title === 'Status' ? 'capitalize' : 'none' }}>
        {value || 'N/A'}
      </Typography>
    </Grid>
  );

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          // Responsive width adjusted
          width: { xs: '100%', sm: '80%', md: '450px' },
          maxWidth: '100vw',
          backgroundColor: theme.palette.background.default,
        }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            User Details
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} size="large">
            <CloseIcon />
          </IconButton>
        </Grid>
        
        <Divider sx={{ mb: 3 }} />

        {/* Content */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>

          {/* User Name Header */}
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            {getFullName()}
          </Typography>

          {/* Primary User Info Section */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                Contact & Account
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <DetailItem title="Full Name" value={getFullName()} />
              <DetailItem title="Username" value={item?.username} />
              <DetailItem icon={EmailIcon} title="Email" value={item?.email} />
              <DetailItem icon={PhoneIcon} title="Phone" value={item?.phone} />
            </Grid>
          </Paper>

          {/* Status and Role Section */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BadgeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                Role & Status
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <DetailItem title="User Type" value={item?.userType} />
              <DetailItem title="Role" value={item?.role} />
              <DetailItem title="Status" value={item?.status} />
              {/* Add more relevant fields if necessary */}
            </Grid>
          </Paper>

          {/* Audit Trail Section */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                Audit Trail
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <DetailItem title="Created On" value={formatDate(item?.createdOn)} />
              <DetailItem title="Last Modified On" value={formatDate(item?.modifiedOn)} />
            </Grid>
          </Paper>
          
        </Box>
        
      </Box>
    </Drawer>
  );
};

export default ViewUserDetail;