// import { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Typography,
//   Switch,
//   Box,
//   Fade,
//   Divider,
//   Button
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';
// import PropTypes from 'prop-types';

// const StyledDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialog-paper': {
//     borderRadius: '1rem',
//     backdropFilter: 'blur(10px)',
//     background: 'rgba(255, 255, 255, 0.9)',
//     border: `1px solid ${theme.palette.grey[300]}`,
//     boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
//   }
// }));

// const Header = styled(DialogTitle)(({ theme }) => ({
//   fontWeight: 600,
//   color: theme.palette.text.primary,
//   padding: '12px 16px',
//   borderBottom: `2px solid ${theme.palette.primary.main}`,
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// }));

// const StatusSwitch = styled(Switch)(({ theme }) => ({
//   width: 70,
//   height: 38,
//   padding: 0,
//   '& .MuiSwitch-switchBase': {
//     top: 4,
//     left: 4,
//     '&.Mui-checked': {
//       transform: 'translateX(30px)',
//       color: '#fff',
//       '& + .MuiSwitch-track': {
//         backgroundColor: '#3dcd58',
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     width: 30,
//     height: 30,
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: 30,
//     backgroundColor: '#bbb',
//   },
// }));

// function ChangeStatusModal({ showStatusModel, closeStatusModel, changeStatus, ItemList }) {
//   const data = ItemList || null;

//   const isInitiallyActive = data?.status === 'active';
//   const [tgle, setTogle] = useState(isInitiallyActive);

//   useEffect(() => {
//     if (showStatusModel) setTogle(isInitiallyActive);
//   }, [isInitiallyActive, showStatusModel]);

//   const handleToggleChange = () => {
//     setTogle(!tgle);
//     changeStatus(ItemList);
//     setTimeout(closeStatusModel, 1000);
//   };

//   return (
//     <StyledDialog open={showStatusModel} onClose={closeStatusModel} fullWidth maxWidth="xs">
//       <Header>
//         Change Status
//         <IconButton onClick={closeStatusModel}>
//           <CloseIcon />
//         </IconButton>
//       </Header>

//       <DialogContent sx={{ textAlign: 'center', py: 4 }}>
//         <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
//           {tgle ? 'Do you want to suspend this item?' : 'Do you want to activate this item?'}
//         </Typography>

//         <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
//           <Typography variant="body1" color="error">Suspend</Typography>
//           <StatusSwitch checked={tgle} onChange={handleToggleChange} />
//           <Typography variant="body1" color="success.main">Active</Typography>
//         </Box>

//         <Fade in>
//           <Typography
//             variant="body2"
//             sx={{
//               mt: 3,
//               color: tgle ? 'success.main' : 'error.main',
//               fontWeight: 600,
//             }}
//           >
//             Current Status: {tgle ? 'Active' : 'Suspended'}
//           </Typography>
//         </Fade>

//         <Divider sx={{ my: 3 }} />

//         <Box display="flex" justifyContent="center" gap={2}>
//           <Button variant="outlined" color="inherit" onClick={closeStatusModel}>
//             Cancel
//           </Button>
//           <Button variant="contained" color={tgle ? 'success' : 'error'} onClick={handleToggleChange}>
//             {tgle ? 'Deactivate' : 'Activate'}
//           </Button>
//         </Box>
//       </DialogContent>
//     </StyledDialog>
//   );
// }

// ChangeStatusModal.propTypes = {
//   showStatusModel: PropTypes.bool.isRequired,
//   closeStatusModel: PropTypes.func.isRequired,
//   changeStatus: PropTypes.func.isRequired,
//   ItemList: PropTypes.object,
// };

// export default ChangeStatusModal;










import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

// Define available status options
const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const StatusChangeModal = ({ open, facility, onClose, onConfirm }) => {
  const theme = useTheme();
  // State to hold the new status selected by the user
  const [newStatus, setNewStatus] = useState('');

  // Update the internal state when the facility prop changes (when the modal opens)
  useEffect(() => {
    if (facility) {
      // Set the default selection to the facility's current status
      setNewStatus(facility.status || '');
    }
  }, [facility]);

  // Handler for the Confirm button
  const handleConfirm = () => {
    if (newStatus && newStatus !== facility.status) {
      // Call the parent's onConfirm function with the new status
      onConfirm(newStatus);
    }
    // Note: onClose is usually handled by onConfirm in the parent component
    // but we can ensure it closes if the status is the same or no change is made.
    if (newStatus === facility.status) {
        onClose();
    }
  };

  if (!facility) return null; // Don't render if no facility data is passed

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="status-change-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="status-change-dialog-title" sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <WarningIcon color="warning" />
          <Typography variant="h6">Change Facility Status</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You are changing the status for **{facility.title}** (ID: {facility.id}).
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Current Status: 
            <Box component="span" sx={{ 
                ml: 1, 
                fontWeight: 600, 
                color: theme.palette.primary.main 
            }}>
                {facility.status || 'N/A'}
            </Box>
        </Typography>

        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
          <InputLabel id="new-status-label">New Status</InputLabel>
          <Select
            labelId="new-status-label"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            label="New Status"
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem 
                key={option.value} 
                value={option.value}
                // Optionally disable the current status option
                disabled={option.value === facility.status}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          // Disable button if no new status is selected or it's the same as the current one
          disabled={!newStatus || newStatus === facility.status}
        >
          Confirm Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusChangeModal;