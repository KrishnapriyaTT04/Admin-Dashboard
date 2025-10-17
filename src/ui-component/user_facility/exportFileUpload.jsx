import React from 'react';
import { Box, Typography, IconButton, Grid, useTheme, Divider, Paper, Accordion, 
    AccordionSummary, 
    AccordionDetails, 
   List,
    ListItem, 
    ListItemIcon,
    ListItemText,
     Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
  } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { uploadBulkFacilities} from 'container/FacilityContainer/slice'; 
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';



const UploadBulkFile = ({ drawerOpen, setDrawerOpen }) => { 

  const theme = useTheme();
  const dispatch = useDispatch(); 
  
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [fileName, setFileName] = useState(''); 
      // const publicCsvPath = "assets/files/facility_example.csv"; 
        const publicCsvPath = '/facility_example.csv';



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



  const columnData = [
  { 
    name: 'Title', 
    description: 'Name or title of the facility.', 
    format: 'Central Bus Station', 
    required: true 
  },
  { 
    name: 'Category', 
    description: 'Enter Public or Private depending on ownership.', 
    format: 'Public', 
    required: true 
  },
  { 
    name: 'Facility Type', 
    description: 'Select one from the allowed types (e.g., Bus Stand, Library, Public Toilet, etc.).', 
    format: 'Public Toilet', 
    required: true 
  },
  { 
    name: 'Is Paid', 
    description: 'Enter True if usage is paid, otherwise False.', 
    format: 'False', 
    required: false 
  },
  { 
    name: 'Opening Time', 
    description: 'Time in 24-hour format.', 
    format: '06:30', 
    required: false 
  },
  { 
    name: 'Closing Time', 
    description: 'Time in 24-hour format.', 
    format: '22:00', 
    required: false 
  },
  { 
    name: 'Is 24 Hr.', 
    description: 'Enter True if the facility is open 24 hours, otherwise False.', 
    format: 'True', 
    required: false 
  },
  { 
    name: 'Seat Capacity', 
    description: 'Enter an integer value (minimum 1).', 
    format: '4', 
    required: false 
  },
  { 
    name: 'Frequency', 
    description: 'Enter one or more days of operation. Use full day name or first 3 letters, separated by commas.', 
    format: 'Mon,Tue,Wed', 
    required: false 
  },
  { 
    name: 'Contact Name', 
    description: 'Name of the contact person (optional).', 
    format: 'Rahul Kumar', 
    required: false 
  },
  { 
    name: 'Contact Email', 
    description: 'Valid email address of contact (optional).', 
    format: 'rahul@example.com', 
    required: false 
  },
  { 
    name: 'Contact Phone', 
    description: '10-digit phone number (optional).', 
    format: '9876543210', 
    required: false 
  },
  { 
    name: 'Address 1', 
    description: 'Primary address line.', 
    format: 'Main Road', 
    required: true 
  },
  { 
    name: 'Address 2', 
    description: 'Additional address details (optional).', 
    format: 'Near Bus Stand', 
    required: false 
  },
  { 
    name: 'City', 
    description: 'City name.', 
    format: 'Ernakulam', 
    required: true 
  },
  { 
    name: 'State', 
    description: 'Full state name.', 
    format: 'Kerala', 
    required: true 
  },
  { 
    name: 'State ID', 
    description: 'State identification code (optional).', 
    format: 'KL', 
    required: false 
  },
  { 
    name: 'District', 
    description: 'District name.', 
    format: 'Ernakulam', 
    required: true 
  },
  { 
    name: 'District Code', 
    description: 'Code or abbreviation for the district (optional).', 
    format: 'EKM', 
    required: false 
  },
  { 
    name: 'Pin Code', 
    description: '6-digit postal code.', 
    format: '682001', 
    required: true 
  },
  { 
    name: 'Geo Location', 
    description: 'Latitude and Longitude separated by a comma (Latitude first).', 
    format: '9.9816,76.2999', 
    required: true 
  },
  { 
    name: 'Landmark', 
    description: 'Notable nearby location (optional).', 
    format: 'Opposite Lulu Mall', 
    required: false 
  },
  { 
    name: 'Remark', 
    description: 'Any additional note about the facility (optional).', 
    format: 'Clean and well maintained', 
    required: false 
  },
  { 
    name: 'Features', 
    description: 'List available features (e.g., Parking, Wheel Chair, etc.) and separate multiple features with **commas**.', 
    format: 'Parking,Wheel Chair,Indian Type', 
    required: false 
  },
];


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






    <Box sx={{ mt: 4, mb: 4, maxWidth: '100%', margin: 'start' }}>
      <Accordion elevation={3} >
        
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="excel-help-content"
          id="excel-help-header"
          sx={{ 
            backgroundColor: '#f0f4f8', 
            borderBottom: '1px solid #ddd' 
          }}
        >
          <HelpOutlineIcon color="primary" sx={{ mr: 1.5 }} />
          <Typography variant="h6" color="primary">
           Bulk Upload Help & Format Details  *
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box sx={{ p: 2 }}>

            
            <Box 
              sx={{ 
                maxHeight: '250px', 
                overflowY: 'auto',
                pr: 1, 
                border: '1px solid #ddd',
                borderRadius: '4px',
                p: 1
              }}
            >
              <List disablePadding dense> 
                
 <Box sx={{  m: 2 }}>
            

            <TableContainer component={Paper} elevation={3}>
                <Table size="small" aria-label="Facility data column guide">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
                            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Column Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '55%' }}>Description / Rules</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Format Example</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {columnData.map((row) => (
                            <TableRow 
                                key={row.name} 
                                sx={{ 
                                    '&:nth-of-type(odd)': { 
                                        backgroundColor: theme.palette.action.hover 
                                    } 
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                        {row.name}
                                        {row.required && <Box component="span" sx={{ color: 'error.main' }}> *</Box>}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {row.description}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box 
                                        sx={{ 
                                            p: 0.5, 
                                            backgroundColor: theme.palette.grey[100], 
                                            borderRadius: 1, 
                                            fontFamily: 'monospace',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        {row.format}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
                
              </List>
            </Box>

          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>










  
      </Box>
    </Drawer>
  );
};

export default UploadBulkFile;