import { Box, Typography, IconButton, Grid, useTheme, Divider, Paper, Chip } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewRatingDetail = ({ drawerOpen, setDrawerOpen, item }) => {
  const theme = useTheme();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    return new Date(dateString).toLocaleDateString('en-US');
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const renderDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CalendarTodayIcon fontSize="small" color="action" />
        <Typography variant="body2" sx={{ mr: 1 }}>
          {formatDate(dateString)}
        </Typography>
        <AccessTimeIcon fontSize="small" color="action" />
        <Typography variant="body2">{formatTime(dateString)}</Typography>
      </Box>
    );
  };

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
          {/* 1. Rating & Comment Section */}
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

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Star Rating
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <StarIcon color="warning" sx={{ mr: 0.5 }} />
                  <Typography variant="body1" fontWeight={500}>
                    {item?.starRating ? `${Number(item.starRating)} / 5` : 'No rating provided'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle2" color="text.secondary">
                  Comment / Feedback
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {item?.comments || 'No comment provided.'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          
          {/* 2. Facility Information Section */}
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
              <BusinessIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                Facility Information
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Facility Title
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {item?.facilityTitle || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Facility ID
                </Typography>
                <Typography variant="body1">{item?.facilityId || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* 3. Audit Trail Section (Admin Only) */}
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
                Audit Trail (Admin)
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Created */}
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 0.5 }}>
                  <CalendarTodayIcon fontSize="small" />
                  Created
                </Typography>
                <Typography variant="body1">{item?.createdUser || item?.createdBy || 'N/A'}</Typography>
                {renderDateTime(item?.createdOn)}
              </Grid>

              {/* Modified */}
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 0.5 }}>
                  <EditIcon fontSize="small" />
                  Last Modified
                </Typography>
                <Typography variant="body1">{item?.modifiedUser || item?.modifiedBy || 'N/A'}</Typography>
                {renderDateTime(item?.modifiedOn)}
              </Grid>

              {/* Deleted */}
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 0.5 }}>
                  <DeleteIcon fontSize="small" color={item?.deleted ? 'error' : 'action'} />
                  Deletion Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={item?.deleted ? 'DELETED' : 'ACTIVE'}
                    color={item?.deleted ? 'error' : 'success'}
                    size="small"
                    variant="outlined"
                  />
                  {item?.deleted && (
                    <>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        By: {item?.deletedBy || 'N/A'}
                      </Typography>
                      {renderDateTime(item?.deletedOn)}
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ViewRatingDetail;