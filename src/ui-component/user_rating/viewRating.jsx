import { Box, Typography, IconButton, Grid, useTheme, Divider, Paper, Chip } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ViewRatingDetail = ({ drawerOpen, setDrawerOpen, item }) => {
  const theme = useTheme();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };
  console.log('starRating:', item?.starRating, typeof item?.starRating);
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: '80%', md: '60%', lg: '900px' },
          backgroundColor: '#fafafa'
        }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            User Rating Details
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} size="large">
            <CloseIcon />
          </IconButton>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {/* Rating & Comment Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FeedbackOutlinedIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                Feedback
              </Typography>
            </Box>

            {/* Star Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <StarIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="body1" fontWeight={500}>
                {item?.starRating ? `${Number(item.starRating)} / 5` : 'No rating provided'}
              </Typography>
            </Box>

            {/* Comment */}
            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
              {item?.comments || 'No comment provided.'}
            </Typography>

            {/* Attachments */}
            {item?.attachments?.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Attachments:
                </Typography>
                {item.attachments.map((file, index) => (
                  <Chip key={index} icon={<AttachFileIcon />} label={file} sx={{ mr: 1, mb: 1 }} color="primary" variant="outlined" />
                ))}
              </Box>
            )}
          </Paper>

          {/* User Info Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                User Information
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Created By
                </Typography>
                <Typography variant="body1">{item?.createdUser || item?.createdBy || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Modified By
                </Typography>
                <Typography variant="body1">{item?.modifiedUser || item?.modifiedBy || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Created On
                </Typography>
                <Typography variant="body1">
                  {item?.createdOn ? `${formatDate(item.createdOn)} ${formatTime(item.createdOn)}` : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Modified On
                </Typography>
                <Typography variant="body1">
                  {item?.modifiedOn ? `${formatDate(item.modifiedOn)} ${formatTime(item.modifiedOn)}` : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Facility Info Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BusinessIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                Facility Information
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Facility ID
                </Typography>
                <Typography variant="body1">{item?.facilityId || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Facility Internal ID
                </Typography>
                <Typography variant="body1">{item?.facilityInternalId || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ViewRatingDetail;
