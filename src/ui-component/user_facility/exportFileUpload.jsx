import { Box, Typography, IconButton, Grid, useTheme, Divider, Paper } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { uploadBulkFacilities} from 'container/FacilityContainer/slice'; 
import DownloadIcon from '@mui/icons-material/Download';





const UploadBulkFile = ({ drawerOpen, setDrawerOpen }) => { 

  const theme = useTheme();
  const dispatch = useDispatch(); 
  
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [fileName, setFileName] = useState(''); 
      const publicCsvPath = "/files/facility_example.csv"; 


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
            
            {fileName && (
                <Typography variant="subtitle1" sx={{mb: 2, color: theme.palette.text.primary, fontWeight: 'bold'}}>
                    Selected: {fileName}
                </Typography>
            )}

            <Grid container spacing={3} alignItems="center" justifyContent="flex-start">
                
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelection} 
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    style={{ display: 'none' }}
                />
                
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={handleSelectFileClick} 
                        startIcon={<CloudUploadIcon />}
                        sx={{ width: '180px', py: 1, borderRadius: '30px' }}
                    >
                        Select File
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        variant="contained"
                        onClick={handleFileUpload} 
                        disabled={!selectedFile} 
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


  <Button
    component="a"
     href={publicCsvPath}       
    download="facility_example.csv" 
    variant="contained"
    color="success" 
    size="large"
    startIcon={<DownloadIcon />} 
>
    Download  Example
</Button>
      </Box>
    </Drawer>
  );
};

export default UploadBulkFile;