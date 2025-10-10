// import { Box, Typography, IconButton, Grid, useTheme, Divider, Paper, Chip } from '@mui/material';
// import Drawer from '@mui/material/Drawer';
// import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import PublicIcon from '@mui/icons-material/Public';
// import PaidIcon from '@mui/icons-material/Paid';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import PeopleIcon from '@mui/icons-material/People';
// import BusinessIcon from '@mui/icons-material/Business'; 

// const ViewFacilityDetail = ({ drawerOpen, setDrawerOpen, item }) => {
//   const theme = useTheme();

//   const formatFrequency = (frequency) => {
  
//     if (!frequency || frequency.length === 0) {
//       return 'Not specified';
//     }

//     let arrayToJoin = frequency; 

   
//     if (Array.isArray(frequency[0])) {
//       arrayToJoin = frequency[0]; 
//     } 

//     if (Array.isArray(arrayToJoin) && arrayToJoin.length > 0) {
//       return arrayToJoin.join(', ');
//     }
    

//     return 'Not specified';
//   };


//   const TrueFalseText = ({ label, value }) => (
//     <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//       <Typography component="span" variant="subtitle2" color="text.secondary">{label}:</Typography>
//       <Typography 
//         component="span" 
//         sx={{ 
//           color: theme.palette.text.primary,
//           fontWeight: 'bold' 
//         }}
//       >
//         {value ? 'Yes' : 'No'}
//       </Typography>
//     </Typography>
//   );
//   const DetailText = ({ label, value, isSubtitle = false }) => (
//     <>
//       <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
//       <Typography 
//         variant={isSubtitle ? "subtitle1" : "body1"} 
//         sx={{ 
//           fontWeight: isSubtitle ? 600 : 500, 
//           color: theme.palette.text.primary
//         }}
//       >
//         {value || 'N/A'}
//       </Typography>
//     </>
//   );


//   return (
//     <Drawer
//       anchor="right"
//       open={drawerOpen}
//       onClose={() => setDrawerOpen(false)}
//       PaperProps={{
//         sx: {
//           width: { xs: '100%', sm: '80%', md: '60%', lg: '900px' },
//           maxWidth: '100vw',
//           backgroundColor: theme.palette.common.white,
//         }
//       }}
//     >
//       <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
//         {/* Header */}
//         <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
//           <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
//             User Facility Details
//           </Typography>
//           <IconButton onClick={() => setDrawerOpen(false)} size="large">
//             <CloseIcon />
//           </IconButton>
//         </Grid>

//         <Divider sx={{ mb: 3 }} />

//         <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//           <Grid container spacing={3}>

//             {/* --- Facility Details --- */}
//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <BusinessIcon color="primary" sx={{ mr: 1 }} />
//                 <Typography variant="h6" fontWeight={600} color="text.primary">Facility Details</Typography>
//               </Box>
//             </Grid>

//             {/* Title (Full Width) */}
//             <Grid item xs={12}>
//                 <DetailText label="Title" value={item.title} isSubtitle={true} />
//             </Grid>
//             <Grid item xs={12}>
//                 <DetailText label="Facility Id" value={item.id} isSubtitle={true} />
//             </Grid>

//             {/* Facility Type & Category */}
//             <Grid item xs={12} sm={6}>
//               <DetailText label="Facility Type" value={item.facilityType} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <DetailText label="Category" value={item.category} />
//             </Grid>

//             {/* Statuses (Is Paid, Is 24H, etc.) */}
//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
//                 <TrueFalseText label="Is Paid" value={item.isPaid} />
//                 <TrueFalseText label="Open 24 Hours" value={item.is24H} />
//                 <TrueFalseText label="Indian Type" value={item.indianType} /> 
//                 <TrueFalseText label="European Type" value={item.europeanType} />
//                 <TrueFalseText label="Is Favourite" value={item.isFavourite} />
//               </Box>
//             </Grid>

//             {/* Conditional Time Display */}
//             {!item.is24H && (
//               <>
//                 <Grid item xs={6} sm={6}>
//                   <DetailText label="Opening Time" value={item.openingTime} />
//                 </Grid>
//                 <Grid item xs={6} sm={6}>
//                   <DetailText label="Closing Time" value={item.closingTime} />
//                 </Grid>
//               </>
//             )}

//             {/* Seat Capacity */}
//             <Grid item xs={12} sm={6}>
//               <DetailText label="Seat Capacity" value={item.seatCapacity} />
//             </Grid>
            
//             {/* Facility Status */}
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2" color="text.secondary">Status</Typography>
//               <Chip 
//                 label={item.status || 'N/A'} 
//                 color={item.status === 'active' ? 'success' : 'default'} 
//                 size="small" 
//                 sx={{ color: item.status === 'active' ? 'white' : 'black' }} 
//               />
//             </Grid>


//             {/* Frequency (Days Available) */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle2" gutterBottom color="text.secondary">Frequency (Days Available)</Typography>
//               <Typography variant="body1" sx={{ wordBreak: 'break-word', color: theme.palette.text.primary }}>
//                 {formatFrequency(item.frequency)}
//               </Typography>
//             </Grid>

//             {/* --- Contact Information Divider --- */}
//             <Grid item xs={12}>
//               <Divider sx={{ my: 2 }} />
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <ContactMailIcon color="primary" sx={{ mr: 1 }} />
//                 <Typography variant="h6" fontWeight={600} color="text.primary">Contact Information</Typography>
//               </Box>
//             </Grid>

//             {/* Contact Name */}
//             <Grid item xs={12} sm={4}>
//               <DetailText label="Contact Name" value={item.contactName} />
//             </Grid>

//             {/* Contact Email */}
//             <Grid item xs={12} sm={4}>
//               <DetailText label="Contact Email" value={item.contactEmail} />
//             </Grid>

//             {/* Contact Phone */}
//             <Grid item xs={12} sm={4}>
//               <DetailText label="Phone" value={item.contactPhone} />
//             </Grid>

//             {/* --- Location Divider --- */}
//             <Grid item xs={12}>
//               <Divider sx={{ my: 2 }} />
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <LocationOnIcon color="primary" sx={{ mr: 1 }} />
//                 <Typography variant="h6" fontWeight={600} color="text.primary">Location</Typography>
//               </Box>
//             </Grid>

//             {/* Address 1 & Address 2 */}
//             <Grid item xs={12} sm={6}>
//               <DetailText label="Address Line 1" value={item.address1} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <DetailText label="Address Line 2" value={item.address2} />
//             </Grid>

//             {/* City & State */}
//             <Grid item xs={12} sm={6}>
//               <DetailText label="City" value={item.city} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <DetailText label="State" value={item.state} />
//             </Grid>

//             {/* District & Pin Code */}
//             <Grid item xs={12} sm={6}>
//               <DetailText label="District" value={`${item.district || 'N/A'} (${item.districtCode || 'N/A'})`} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <DetailText label="Pin Code" value={item.pinCode} />
//             </Grid>

//             {/* Landmark */}
//             <Grid item xs={12} sm={12}>
//               <DetailText label="Landmark" value={item.landmark} />
//             </Grid>

//             {/* Latitude & Longitude */}
//             <Grid item xs={12} sm={6}>
//               <DetailText label="Latitude" value={item.geoLoc?.[0]} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <DetailText label="Longitude" value={item.geoLoc?.[1]} />
//             </Grid>
            
//             {/* --- Attachments & Remarks --- */}
//             <Grid item xs={12}>
//               <Divider sx={{ my: 2 }} />
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <AttachFileIcon color="primary" sx={{ mr: 1 }} />
//                 <Typography variant="h6" fontWeight={600} color="text.primary">Other Information</Typography>
//               </Box>
//             </Grid>

//             {/* Remarks */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle2" color="text.secondary">Remarks</Typography>
//               <Typography variant="body1" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', color: theme.palette.text.primary }}>{item.remarks || 'N/A'}</Typography>
//             </Grid>

//             {/* Attachments */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Attachments ({item.attachments?.length || 0})</Typography>
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                 {item.attachments && item.attachments.length > 0 ? (
//                   item.attachments.map((file, index) => (
//                     <Chip
//                       key={index}
//                       icon={<AttachFileIcon />}
//                       label={file.attachmentName || `Attachment ${index + 1}`}
//                       sx={{ mr: 1, mb: 1 }}
//                       color="primary"
//                       variant="outlined"
//                       component="a"
//                       href={file.attachmentUrl || '#'}
//                       clickable
//                       target="_blank" 
//                     />
//                   ))
//                 ) : (
//                   <Typography variant="body2" color="text.secondary">No attachments found.</Typography>
//                 )}
//               </Box>
//             </Grid>

//           </Grid>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default ViewFacilityDetail;




import { 
  Box, 
  Typography, 
  IconButton, 
  Grid, 
  useTheme, 
  Divider, 
  Chip,
  Card,
  CardContent,
  Stack,
  Avatar
} from '@mui/material';
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
import ScheduleIcon from '@mui/icons-material/Schedule';
import StarIcon from '@mui/icons-material/Star';
import WcIcon from '@mui/icons-material/Wc';

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

  const StatusChip = ({ value, label }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip 
        label={value ? 'Yes' : 'No'} 
        color={value ? 'success' : 'default'}
        variant="outlined"
        size="small"
      />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );

  const DetailSection = ({ icon, title, children }) => (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.light, width: 32, height: 32, mr: 2 }}>
            {icon}
          </Avatar>
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
        {icon && <Box component="span" sx={{ mr: 1 }}>{icon}</Box>}
        {label}
      </Typography>
      <Typography 
        variant={isSubtitle ? "h6" : "body1"} 
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
          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
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
            <Typography variant="body2" color="text.secondary">
              Complete information about the facility
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
          <Card sx={{ mb: 3, bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                <Chip 
                  label={item.status || 'Unknown'} 
                  color={item.status === 'active' ? 'success' : 'default'} 
                  sx={{ 
                    color: 'white',
                    bgcolor: item.status === 'active' ? theme.palette.success.main : theme.palette.grey[600] 
                  }} 
                />
                <Chip 
                  icon={<BusinessIcon />}
                  label={item.facilityType} 
                  variant="outlined" 
                  sx={{ color: 'white', borderColor: 'white' }} 
                />
                <Chip 
                  icon={<PublicIcon />}
                  label={item.category} 
                  variant="outlined" 
                  sx={{ color: 'white', borderColor: 'white' }} 
                />
              </Box>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <DetailSection icon={<BusinessIcon />} title="Basic Information">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DetailItem 
                  label="Facility ID" 
                  value={item.id}
                  isSubtitle={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem 
                  label="Seat Capacity" 
                  value={item.seatCapacity}
                  icon={<PeopleIcon />}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 500 }}>
                Facility Features
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <StatusChip value={item.isPaid} label="Paid Service" />
                <StatusChip value={item.is24H} label="24 Hours" />
                <StatusChip value={item.indianType} label="Indian Type" />
                <StatusChip value={item.europeanType} label="European Type" />
                <StatusChip value={item.isFavourite} label="Favourite" />
              </Stack>
            </Box>
          </DetailSection>

          {/* Operating Hours */}
          <DetailSection icon={<ScheduleIcon />} title="Operating Hours">
            <Grid container spacing={3}>
              {!item.is24H ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <DetailItem 
                      label="Opening Time" 
                      value={item.openingTime}
                      icon={<AccessTimeIcon />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem 
                      label="Closing Time" 
                      value={item.closingTime}
                      icon={<AccessTimeIcon />}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Chip 
                    icon={<AccessTimeIcon />}
                    label="Open 24 Hours" 
                    color="success"
                    variant="filled"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <DetailItem 
                  label="Operating Days" 
                  value={formatFrequency(item.frequency)}
                />
              </Grid>
            </Grid>
          </DetailSection>

          {/* Contact Information */}
          <DetailSection icon={<ContactMailIcon />} title="Contact Information">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DetailItem 
                  label="Contact Name" 
                  value={item.contactName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem 
                  label="Phone" 
                  value={item.contactPhone}
                />
              </Grid>
              <Grid item xs={12}>
                <DetailItem 
                  label="Email" 
                  value={item.contactEmail}
                />
              </Grid>
            </Grid>
          </DetailSection>

          {/* Location Details */}
          <DetailSection icon={<LocationOnIcon />} title="Location Details">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DetailItem 
                  label="Address Line 1" 
                  value={item.address1}
                />
              </Grid>
              <Grid item xs={12}>
                <DetailItem 
                  label="Address Line 2" 
                  value={item.address2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem 
                  label="City" 
                  value={item.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem 
                  label="State" 
                  value={item.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem 
                  label="District" 
                  value={`${item.district || 'N/A'} (${item.districtCode || 'N/A'})`}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem 
                  label="Pincode" 
                  value={item.pinCode}
                />
              </Grid>
              <Grid item xs={12}>
                <DetailItem 
                  label="Landmark" 
                  value={item.landmark}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem 
                  label="Latitude" 
                  value={item.geoLoc?.[0]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem 
                  label="Longitude" 
                  value={item.geoLoc?.[1]}
                />
              </Grid>
            </Grid>
          </DetailSection>

          {/* Additional Information */}
          <DetailSection icon={<AttachFileIcon />} title="Additional Information">
            <DetailItem 
              label="Remarks" 
              value={item.remarks}
            />
            
            <Box sx={{ mt: 2 }}>
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
            </Box>
          </DetailSection>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ViewFacilityDetail;
























// ----------------------------------------------------------
// import { Box, Typography, IconButton, Grid, useTheme, Divider, Paper, Chip } from '@mui/material';
// import Drawer from '@mui/material/Drawer';
// import CloseIcon from '@mui/icons-material/Close';

// // Thematic Icons
// import BusinessIcon from '@mui/icons-material/Business';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import PaidIcon from '@mui/icons-material/Paid';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import PublicIcon from '@mui/icons-material/Public';
// import PeopleIcon from '@mui/icons-material/People';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import CategoryIcon from '@mui/icons-material/Category';

// // Helper Component for consistent detail display
// const DetailItem = ({ icon: Icon, label, value, largeValue = false }) => {
//   const theme = useTheme();
//   const displayValue = value || 'N/A';

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: largeValue ? 0 : 1.5 }}>
//       {Icon && <Icon sx={{ fontSize: 20, mr: 1, color: theme.palette.primary.main, mt: 0.2 }} />}
//       <Box>
//         <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', lineHeight: 1 }}>
//           {label}
//         </Typography>
//         <Typography
//           variant={largeValue ? 'h6' : 'body1'}
//           sx={{
//             fontWeight: largeValue ? 600 : 500,
//             color: largeValue ? theme.palette.text.primary : theme.palette.text.secondary
//           }}
//         >
//           {displayValue}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// // Helper Component for Yes/No Chips
// const BooleanChip = ({ label, value, icon: Icon }) => {
//   const isTrue = !!value;
//   return (
//     <Chip
//       icon={Icon ? <Icon /> : undefined}
//       label={label}
//       color={isTrue ? 'success' : 'default'}
//       variant={isTrue ? 'filled' : 'outlined'}
//       size="small"
//       sx={{ 
//         fontWeight: 600, 
//         backgroundColor: isTrue ? 'rgba(76, 175, 80, 0.15)' : undefined, 
//         color: isTrue ? 'green' : 'text.secondary',
//         borderColor: isTrue ? 'green' : undefined,
//         mr: 1 
//       }}
//     />
//   );
// };

// const ViewFacilityDetail = ({ drawerOpen, setDrawerOpen, item }) => {
//   const theme = useTheme();

//   const formatFrequency = (frequency) => {
//     if (!frequency || frequency.length === 0) {
//       return 'Not specified';
//     }
//     let arrayToJoin = frequency;
//     if (Array.isArray(frequency[0])) {
//       arrayToJoin = frequency[0];
//     }
//     if (Array.isArray(arrayToJoin) && arrayToJoin.length > 0) {
//       return arrayToJoin.join(', ');
//     }
//     return 'Not specified';
//   };

//   const SectionHeader = ({ title, icon: Icon }) => (
//     <>
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 3 }}>
//         <Icon color="primary" sx={{ mr: 1, fontSize: 24 }} />
//         <Typography variant="h6" fontWeight={700} color="text.primary">
//           {title}
//         </Typography>
//       </Box>
//       <Divider sx={{ mb: 2 }} />
//     </>
//   );

//   return (
//     <Drawer
//       anchor="right"
//       open={drawerOpen}
//       onClose={() => setDrawerOpen(false)}
//       PaperProps={{
//         sx: {
//           width: { xs: '100%', sm: '80%', md: '60%', lg: '900px' },
//           maxWidth: '100vw',
//           backgroundColor: theme.palette.grey[50], // Light background for contrast
//         }
//       }}
//     >
//       <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        
//         {/* Header */}
//         <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2, pb: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
//           <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.dark }}>
//             {item.title || 'Facility Details'}
//           </Typography>
//           <IconButton onClick={() => setDrawerOpen(false)} size="large">
//             <CloseIcon />
//           </IconButton>
//         </Grid>

//         <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//           <Grid container spacing={4}>

//             {/* --- PRIMARY DETAILS (Title & ID) --- */}
//             <Grid item xs={12}>
//               <DetailItem 
//                 icon={BusinessIcon} 
//                 label="FACILITY ID" 
//                 value={item.id} 
//                 largeValue={true} 
//               />
//             </Grid>
            
//             {/* --- 1. CORE FACILITY INFORMATION --- */}
//             <Grid item xs={12}>
//               <Paper elevation={2} sx={{ p: 3 }}>
//                 <SectionHeader title="Core Facility Information" icon={BusinessIcon} />
//                 <Grid container spacing={3}>
                  
//                   {/* Type & Category */}
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem icon={CategoryIcon} label="Facility Type" value={item.facilityType} />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem icon={CategoryIcon} label="Category" value={item.category} />
//                   </Grid>

//                   {/* Seat Capacity */}
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem icon={PeopleIcon} label="Seat Capacity" value={item.seatCapacity} />
//                   </Grid>
                  
//                   {/* Status */}
//                   <Grid item xs={12} sm={6}>
//                     <Box>
//                         <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', lineHeight: 1, mb: 0.5 }}>
//                             Status
//                         </Typography>
//                         <Chip
//                             label={item.status || 'N/A'}
//                             color={item.status === 'active' ? 'success' : 'default'}
//                             variant="outlined"
//                             size="small"
//                             sx={{ color: item.status === 'active' ? theme.palette.success.dark : theme.palette.text.secondary, fontWeight: 600 }}
//                         />
//                     </Box>
//                   </Grid>

//                   {/* Frequency */}
//                   <Grid item xs={12}>
//                     <DetailItem 
//                       icon={AccessTimeIcon} 
//                       label="Available Days (Frequency)" 
//                       value={formatFrequency(item.frequency)} 
//                     />
//                   </Grid>
                  
//                   {/* Paid & Open 24H */}
//                   <Grid item xs={12} sx={{ mt: 1 }}>
//                     <Typography variant="subtitle2" color="text.secondary" gutterBottom>Facility Features</Typography>
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
//                       <BooleanChip label="Paid Access" value={item.isPaid} icon={PaidIcon} />
//                       <BooleanChip label="Open 24 Hours" value={item.is24H} icon={AccessTimeIcon} />
//                       <BooleanChip label="Indian Type" value={item.indianType} />
//                       <BooleanChip label="European Type" value={item.europeanType} />
//                       <BooleanChip label="Favourite" value={item.isFavourite} icon={FavoriteIcon} />
//                     </Box>
//                   </Grid>

//                   {/* Conditional Time Display */}
//                   {!item.is24H && (
//                     <Grid container item spacing={3} sx={{ mt: 0 }}>
//                       <Grid item xs={12} sm={6}>
//                         <DetailItem icon={AccessTimeIcon} label="Opening Time" value={item.openingTime} />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <DetailItem icon={AccessTimeIcon} label="Closing Time" value={item.closingTime} />
//                       </Grid>
//                     </Grid>
//                   )}
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* --- 2. LOCATION & ADDRESS --- */}
//             <Grid item xs={12}>
//               <Paper elevation={2} sx={{ p: 3 }}>
//                 <SectionHeader title="Location & Geodata" icon={LocationOnIcon} />
//                 <Grid container spacing={3}>
//                   {/* Address 1 & 2 */}
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem label="Address Line 1" value={item.address1} />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem label="Address Line 2" value={item.address2} />
//                   </Grid>
                  
//                   {/* City & State */}
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem label="City" value={item.city} />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem label="State" value={item.state} />
//                   </Grid>

//                   {/* District & Pin Code */}
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem label="District" value={`${item.district || 'N/A'} (${item.districtCode || 'N/A'})`} />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem label="Pin Code" value={item.pinCode} />
//                   </Grid>

//                   {/* Landmark */}
//                   <Grid item xs={12}>
//                     <DetailItem label="Landmark" value={item.landmark} />
//                   </Grid>

//                   {/* Latitude & Longitude */}
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem label="Latitude" value={item.geoLoc?.[0]} />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <DetailItem label="Longitude" value={item.geoLoc?.[1]} />
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>
            
//             {/* --- 3. CONTACT INFORMATION --- */}
//             <Grid item xs={12}>
//               <Paper elevation={2} sx={{ p: 3 }}>
//                 <SectionHeader title="Contact Information" icon={ContactMailIcon} />
//                 <Grid container spacing={3}>
//                   {/* Contact Name */}
//                   <Grid item xs={12} sm={4}>
//                     <DetailItem label="Contact Name" value={item.contactName} />
//                   </Grid>
//                   {/* Contact Email */}
//                   <Grid item xs={12} sm={4}>
//                     <DetailItem label="Contact Email" value={item.contactEmail} />
//                   </Grid>
//                   {/* Contact Phone */}
//                   <Grid item xs={12} sm={4}>
//                     <DetailItem label="Phone" value={item.contactPhone} />
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* --- 4. REMARKS AND ATTACHMENTS --- */}
//             <Grid item xs={12}>
//               <Paper elevation={2} sx={{ p: 3 }}>
//                 <SectionHeader title="Remarks & Attachments" icon={AttachFileIcon} />
                
//                 {/* Remarks */}
//                 <Box sx={{ mb: 3 }}>
//                     <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 0.5 }}>Remarks</Typography>
//                     <Typography 
//                         variant="body1" 
//                         sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', color: theme.palette.text.secondary }}
//                     >
//                         {item.remarks || 'No additional remarks.'}
//                     </Typography>
//                 </Box>

//                 {/* Attachments */}
//                 <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 1 }}>
//                     Attachments ({item.attachments?.length || 0})
//                 </Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                   {item.attachments && item.attachments.length > 0 ? (
//                     item.attachments.map((file, index) => (
//                       <Chip
//                         key={index}
//                         icon={<AttachFileIcon />}
//                         label={file.attachmentName || `Attachment ${index + 1}`}
//                         sx={{ mr: 1, mb: 1, cursor: 'pointer' }}
//                         color="info"
//                         variant="filled"
//                         component="a"
//                         href={file.attachmentUrl || '#'}
//                         clickable
//                         target="_blank"
//                       />
//                     ))
//                   ) : (
//                     <Typography variant="body2" color="text.secondary">No attachments found.</Typography>
//                   )}
//                 </Box>
//               </Paper>
//             </Grid>

//           </Grid>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default ViewFacilityDetail;
























// import {
//   Box,
//   Typography,
//   IconButton,
//   Grid,
//   useTheme,
//   Divider,
//   Paper,
//   Chip,
// } from "@mui/material";
// import Drawer from "@mui/material/Drawer";
// import CloseIcon from "@mui/icons-material/Close";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import BusinessIcon from "@mui/icons-material/Business";

// const ViewFacilityDetail = ({ drawerOpen, setDrawerOpen, item }) => {
//   const theme = useTheme();

//   const formatFrequency = (frequency) => {
//     if (!frequency || frequency.length === 0) return "Not specified";
//     let arrayToJoin = Array.isArray(frequency[0]) ? frequency[0] : frequency;
//     return arrayToJoin.length > 0 ? arrayToJoin.join(", ") : "Not specified";
//   };

//   const SectionHeader = ({ icon: Icon, title }) => (
//     <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//       <Icon color="primary" sx={{ mr: 1 }} />
//       <Typography variant="h6" fontWeight={600} color="text.primary">
//         {title}
//       </Typography>
//     </Box>
//   );

//   const DetailText = ({ label, value, isSubtitle = false }) => (
//     <Box>
//       <Typography variant="subtitle2" color="text.secondary">
//         {label}
//       </Typography>
//       <Typography
//         variant={isSubtitle ? "subtitle1" : "body1"}
//         sx={{
//           fontWeight: isSubtitle ? 600 : 400,
//           color: theme.palette.text.primary,
//         }}
//       >
//         {value || "N/A"}
//       </Typography>
//     </Box>
//   );

//   const TrueFalseText = ({ label, value }) => (
//     <Typography
//       variant="body2"
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 0.5,
//         color: theme.palette.text.primary,
//       }}
//     >
//       <Typography
//         component="span"
//         variant="subtitle2"
//         color="text.secondary"
//         sx={{ minWidth: 120 }}
//       >
//         {label}:
//       </Typography>
//       <Chip
//         label={value ? "Yes" : "No"}
//         color={value ? "success" : "default"}
//         size="small"
//         variant={value ? "filled" : "outlined"}
//       />
//     </Typography>
//   );

//   return (
//     <Drawer
//       anchor="right"
//       open={drawerOpen}
//       onClose={() => setDrawerOpen(false)}
//       PaperProps={{
//         sx: {
//           width: { xs: "100%", sm: "85%", md: "65%", lg: "900px" },
//           backgroundColor: theme.palette.background.default,
//           boxShadow: "-3px 0px 15px rgba(0,0,0,0.1)",
//           borderTopLeftRadius: "16px",
//           borderBottomLeftRadius: "16px",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           p: 3,
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Header */}
//         <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
//           <Typography
//             variant="h5"
//             sx={{ fontWeight: 700, color: theme.palette.primary.main }}
//           >
//             Facility Details
//           </Typography>
//           <IconButton onClick={() => setDrawerOpen(false)} size="large">
//             <CloseIcon />
//           </IconButton>
//         </Grid>

//         <Divider sx={{ mb: 3 }} />

//         <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
//           <Grid container spacing={3}>
//             {/* --- Facility Details Section --- */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 1 }}>
//                 <SectionHeader icon={BusinessIcon} title="Facility Information" />

//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <DetailText label="Title" value={item.title} isSubtitle />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <DetailText label="Facility ID" value={item.id} />
//                   </Grid>

//                   <Grid item xs={6}>
//                     <DetailText label="Type" value={item.facilityType} />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <DetailText label="Category" value={item.category} />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexWrap: "wrap",
//                         gap: 2,
//                         mt: 1,
//                       }}
//                     >
//                       <TrueFalseText label="Is Paid" value={item.isPaid} />
//                       <TrueFalseText label="Open 24 Hours" value={item.is24H} />
//                       <TrueFalseText label="Indian Type" value={item.indianType} />
//                       <TrueFalseText
//                         label="European Type"
//                         value={item.europeanType}
//                       />
//                       <TrueFalseText
//                         label="Is Favourite"
//                         value={item.isFavourite}
//                       />
//                     </Box>
//                   </Grid>

//                   {!item.is24H && (
//                     <>
//                       <Grid item xs={6}>
//                         <DetailText
//                           label="Opening Time"
//                           value={item.openingTime}
//                         />
//                       </Grid>
//                       <Grid item xs={6}>
//                         <DetailText
//                           label="Closing Time"
//                           value={item.closingTime}
//                         />
//                       </Grid>
//                     </>
//                   )}

//                   <Grid item xs={6}>
//                     <DetailText
//                       label="Seat Capacity"
//                       value={item.seatCapacity}
//                     />
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Typography
//                       variant="subtitle2"
//                       color="text.secondary"
//                       gutterBottom
//                     >
//                       Status
//                     </Typography>
//                     <Chip
//                       label={item.status || "N/A"}
//                       color={
//                         item.status === "active"
//                           ? "success"
//                           : item.status === "inactive"
//                           ? "error"
//                           : "default"
//                       }
//                       size="small"
//                       sx={{
//                         fontWeight: 600,
//                         color:
//                           item.status === "active" ? "#fff" : "text.primary",
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <DetailText
//                       label="Frequency (Days Available)"
//                       value={formatFrequency(item.frequency)}
//                     />
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* --- Contact Section --- */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 1 }}>
//                 <SectionHeader icon={ContactMailIcon} title="Contact Information" />
//                 <Grid container spacing={2}>
//                   <Grid item xs={4}>
//                     <DetailText label="Name" value={item.contactName} />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <DetailText label="Email" value={item.contactEmail} />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <DetailText label="Phone" value={item.contactPhone} />
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* --- Location Section --- */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 1 }}>
//                 <SectionHeader icon={LocationOnIcon} title="Location Details" />
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <DetailText label="Address Line 1" value={item.address1} />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <DetailText label="Address Line 2" value={item.address2} />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <DetailText label="City" value={item.city} />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <DetailText label="State" value={item.state} />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <DetailText
//                       label="District"
//                       value={`${item.district || "N/A"} (${item.districtCode || "N/A"})`}
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <DetailText label="Pin Code" value={item.pinCode} />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <DetailText label="Landmark" value={item.landmark} />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <DetailText label="Latitude" value={item.geoLoc?.[0]} />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <DetailText label="Longitude" value={item.geoLoc?.[1]} />
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* --- Other Section --- */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 1 }}>
//                 <SectionHeader icon={AttachFileIcon} title="Additional Information" />
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <DetailText label="Remarks" value={item.remarks} />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
//                       Attachments ({item.attachments?.length || 0})
//                     </Typography>
//                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                       {item.attachments?.length > 0 ? (
//                         item.attachments.map((file, index) => (
//                           <Chip
//                             key={index}
//                             icon={<AttachFileIcon />}
//                             label={file.attachmentName || `Attachment ${index + 1}`}
//                             component="a"
//                             href={file.attachmentUrl || "#"}
//                             clickable
//                             target="_blank"
//                             color="primary"
//                             variant="outlined"
//                           />
//                         ))
//                       ) : (
//                         <Typography variant="body2" color="text.secondary">
//                           No attachments found.
//                         </Typography>
//                       )}
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default ViewFacilityDetail;
