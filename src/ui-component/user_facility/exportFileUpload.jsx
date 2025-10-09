import { Box, Typography, IconButton, Grid, useTheme, Divider, Paper } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { uploadBulkFacilities} from 'container/FacilityContainer/slice'; 

const UploadBulkFile = ({ drawerOpen, setDrawerOpen }) => { 
  const theme = useTheme();
  const dispatch = useDispatch(); 
  
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [fileName, setFileName] = useState(''); 

  const handleFileSelection = (event) => {
      const file = event.target.files[0];
      if (file) {
          setSelectedFile(file);
          setFileName(file.name);
      } else {
          setSelectedFile(null);
          setFileName('');
      }
  };
  
  const handleSelectFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = () => {
    if (selectedFile) {
        dispatch(uploadBulkFacilities(selectedFile));
        
        setSelectedFile(null);
        setFileName('');
        fileInputRef.current.value = null; 
        
        setDrawerOpen(false); 
    }
  };


  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
    //   onClose={() => setOpen(false)} 
            onClose={() => setDrawerOpen(false)}

      PaperProps={{
            sx: {
              width: { xs: '100%', sm: '80%', md: '60%', lg: '1100px' },
              maxWidth: '70vw',
              backgroundColor: '#f5f5f5',
              color:'gray'
            }
          }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
            Import Facilities
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}  size="large">
            <CloseIcon />
          </IconButton>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        <Paper elevation={1} sx={{ p: 4 }}>
            <Typography variant="body1" sx={{mb: 2, color: theme.palette.text.secondary}}>
                1. Select your file, then 2. Click Upload.
            </Typography>
            
            {/* 💡 Display Selected File Name */}
            {fileName && (
                <Typography variant="subtitle1" sx={{mb: 2, color: theme.palette.text.primary, fontWeight: 'bold'}}>
                    Selected: {fileName}
                </Typography>
            )}

            <Grid container spacing={3} alignItems="center" justifyContent="flex-start">
                
                {/* Hidden File Input (Receives file selection) */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelection} // 💡 Calls new selection handler
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    style={{ display: 'none' }}
                />
                
                {/* Button 1: Triggers file dialog */}
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={handleSelectFileClick} // 💡 Triggers hidden input click
                        startIcon={<CloudUploadIcon />}
                        sx={{ width: '180px', py: 1, borderRadius: '30px' }}
                    >
                        Select File
                    </Button>
                </Grid>

                {/* Button 2: Upload Action Button */}
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={handleFileUpload} // 💡 Triggers Redux dispatch
                        disabled={!selectedFile} // 💡 Disabled until a file is selected
                        sx={{ 
                            width: '180px', 
                            py: 1, 
                            borderRadius: '30px', 
                            backgroundColor: theme.palette.success.main,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.success.dark,
                            }
                        }}
                    >
                       Upload File
                    </Button>
                </Grid>
                
                {/* Optional: Template Download button (Removed for brevity) */}

            </Grid>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default UploadBulkFile;