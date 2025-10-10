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





function ChangeStatusModal({ showStatusModel, closeStatusModel, changeStatus, ItemList }) {
  const data = ItemList || null;
  const isInitiallyActive = data?.status === 'active';
  const [tgle, setTogle] = useState(isInitiallyActive);

  useEffect(() => {
    if (showStatusModel) {
      setTogle(isInitiallyActive);
    }
  }, [isInitiallyActive, showStatusModel]);

  const handleConfirm = () => {
    // Call the changeStatus function with the item
    changeStatus(ItemList);
    // Close modal immediately instead of waiting 1 second
    closeStatusModel();
  };

  const handleToggleChange = () => {
    setTogle(!tgle);
  };

  return (
    <StyledDialog open={showStatusModel} onClose={closeStatusModel} fullWidth maxWidth="xs">
      <Header>
        Change Status
        <IconButton onClick={closeStatusModel}>
          <CloseIcon />
        </IconButton>
      </Header>

      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
          {tgle ? 'Do you want to suspend this item?' : 'Do you want to activate this item?'}
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
          <Typography variant="body1" color="error">Suspend</Typography>
          <StatusSwitch checked={tgle} onChange={handleToggleChange} />
          <Typography variant="body1" color="success.main">Active</Typography>
        </Box>

        <Fade in>
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              color: tgle ? 'success.main' : 'error.main',
              fontWeight: 600,
            }}
          >
            Current Status: {tgle ? 'Active' : 'Suspended'}
          </Typography>
        </Fade>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="outlined" color="inherit" onClick={closeStatusModel}>
            Cancel
          </Button>
          <Button variant="contained" color={tgle ? 'error' : 'success'} onClick={handleConfirm}>
            {tgle ? 'Deactivate' : 'Activate'}
          </Button>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}