import { Box, Typography, IconButton, Grid, useTheme, Chip, Card, CardContent, Stack, Avatar, Drawer } from '@mui/material';
import { Close as CloseIcon, Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';

const ViewUserDetail = ({ drawerOpen, setDrawerOpen, item }) => {
  const theme = useTheme();
  const primary = '#039123';
  const lightGreen = '#e8f5e9';

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };
  const capitalizeWords = (text) => {
    if (!text) return '';
    return text
      .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter of the first word
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const getFullName = () => {
    return item?.fullName || (item?.firstName && item?.lastName ? `${item.firstName} ${item.lastName}` : 'N/A');
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
          width: { xs: '100%', sm: '80%', md: '50%', lg: 500 },
          background: '#fff',
          boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
          borderLeft: `4px solid ${primary}`
        }
      }}
    >
      <Box p={3} height="100%" display="flex" flexDirection="column">
        {/* Header */}
        <Box flexGrow={1} overflow="auto" pr={1}>
          <Card sx={{ mb: 3, bgcolor: '#f0f9f6', borderRadius: 2, boxShadow: 'none' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h2" fontWeight={700} color={primary} mr={2}>
                    {getFullName()}
                  </Typography>
                  <Chip label={capitalizeWords(item.status)} variant="filled" sx={{ color: 'white', bgcolor: primary }} />
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

              <Stack direction="row" spacing={3} mt={1} alignItems="center" flexWrap="wrap">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon sx={{ fontSize: 20, color: primary, mr: 1 }} />
                  <Typography sx={{ color: primary, fontWeight: 400 }}>{item.phone || 'N/A'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailIcon sx={{ fontSize: 20, color: primary, mr: 1 }} />
                  <Typography sx={{ color: primary, fontWeight: 400 }}>{item.email || 'N/A'}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <DetailSection icon={<PersonIcon />} title="Basic Information">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DetailItem
                  label="User Type"
                  value={item.userType ? item.userType.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()) : 'N/A'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem label="Role" value={capitalizeWords(item.role)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DetailItem label="Created On" value={formatDate(item.createdOn)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem label="Last Modified On" value={formatDate(item.modifiedOn)} />
              </Grid>
            </Grid>
          </DetailSection>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ViewUserDetail;
