


// import React, { useRef } from 'react';
// import { Button, Box, Typography, Grid, Paper, IconButton } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import CloseIcon from '@mui/icons-material/Close';

// function ImageDropzone({ selectedFiles, onFilesAdded, onFileRemoved }) {
//   const fileInputRef = useRef(null);
//   const [isDragging, setIsDragging] = React.useState(false);

//   // --- Handlers for Click Selection ---
//   const handleFileChange = (event) => {
//     if (event.target.files && event.target.files.length > 0) {
//       onFilesAdded(event.target.files);
//     }
//     event.target.value = null; // Reset input
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   // --- Improved Drag & Drop Handlers ---
//   const handleDragOver = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragEnter = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
    
//     // Only set dragging to false if leaving the drop zone
//     if (!event.currentTarget.contains(event.relatedTarget)) {
//       setIsDragging(false);
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     setIsDragging(false);
    
//     if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
//       onFilesAdded(event.dataTransfer.files);
//     }
//   };

//   // Separate click handler for the "Add More" button
//   const handleAddMoreClick = () => {
//     fileInputRef.current.click();
//   };
    
//   return (
//     <Box sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      
//       {/* Hidden File Input */}
//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: 'none' }} 
//       />

//       {/* Drag & Drop Area - Only for drag operations */}
//       <Paper
//         variant="outlined"
//         onDragOver={handleDragOver}
//         onDragEnter={handleDragEnter}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={handleUploadClick}
//         sx={{
//           p: 4,
//           textAlign: 'center',
//           cursor: 'pointer',
//           border: `2px dashed ${isDragging ? 'primary.main' : 'grey.400'}`,
//           backgroundColor: isDragging ? 'primary.light' : 'background.paper',
//           transition: 'all 0.3s',
//           mb: 3,
//           '&:hover': {
//             backgroundColor: 'grey.50',
//           }
//         }}
//       >
//         <CloudUploadIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
//         <Typography variant="h6">
//           Drag & drop images here or click to browse
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           (Supports multiple files)
//         </Typography>
//       </Paper>
      
//       {/* Image Previews */}
//       {selectedFiles.length > 0 && (
//         <Box sx={{ mb: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h6">
//               Selected Images ({selectedFiles.length})
//             </Typography>
//             <Button 
//               variant="outlined" 
//               onClick={handleAddMoreClick}
//               startIcon={<CloudUploadIcon />}
//             >
//               Add More Images
//             </Button>
//           </Box>
          
//           <Grid container spacing={2}>
//             {selectedFiles.map((file, index) => (
//               <Grid item key={`${file.name}-${index}`}>
//                 <Paper 
//                   elevation={3} 
//                   sx={{ 
//                     position: 'relative', 
//                     width: 120, 
//                     height: 120,
//                     overflow: 'hidden',
//                   }}
//                 >
//                   <img 
//                     src={URL.createObjectURL(file)} 
//                     alt={`Preview ${index}`} 
//                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                   />
                  
//                   <IconButton 
//                     size="small"
//                     onClick={() => onFileRemoved(file.name)} 
//                     sx={{ 
//                       position: 'absolute', 
//                       top: 2, 
//                       right: 2, 
//                       bgcolor: 'rgba(255, 255, 255, 0.9)',
//                       '&:hover': {
//                         bgcolor: 'rgba(255, 255, 255, 1)',
//                       }
//                     }}
//                   >
//                     <CloseIcon fontSize="small" />
//                   </IconButton>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default ImageDropzone;


import React, { useRef } from 'react';
import { Button, Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

function ImageDropzone({ selectedFiles, onFilesAdded, onFileRemoved }) {
  const initialFileInputRef = useRef(null);
  const addMoreFileInputRef = useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);

  // --- Handlers for Click Selection ---
  const handleFileChange = (event, inputType) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFilesAdded(files);
      
      // Reset the specific input
      if (inputType === 'initial' && initialFileInputRef.current) {
        initialFileInputRef.current.value = '';
      } else if (inputType === 'addMore' && addMoreFileInputRef.current) {
        addMoreFileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = () => {
    initialFileInputRef.current?.click();
  };

  const handleAddMoreClick = () => {
    addMoreFileInputRef.current?.click();
  };

  // --- Drag & Drop Handlers ---
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      onFilesAdded(files);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      
      {/* Hidden File Input for Initial Selection */}
      <input
        type="file"
        multiple
        accept="image/*"
        ref={initialFileInputRef}
        onChange={(e) => handleFileChange(e, 'initial')}
        style={{ display: 'none' }} 
      />

      {/* Hidden File Input for Add More */}
      <input
        type="file"
        multiple
        accept="image/*"
        ref={addMoreFileInputRef}
        onChange={(e) => handleFileChange(e, 'addMore')}
        style={{ display: 'none' }} 
      />

      {/* Drag & Drop Area */}
      <Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        sx={{
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          border: `2px dashed ${isDragging ? 'primary.main' : 'grey.400'}`,
          backgroundColor: isDragging ? 'primary.light' : 'background.paper',
          transition: 'all 0.3s',
          mb: 3,
          '&:hover': {
            backgroundColor: 'grey.50',
          }
        }}
      >
        <CloudUploadIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6">
          Drag & drop images here or click to browse
        </Typography>
        <Typography variant="body2" color="textSecondary">
          (Supports multiple files)
        </Typography>
      </Paper>
      
      {/* Image Previews */}
      {selectedFiles.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Selected Images ({selectedFiles.length})
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleAddMoreClick}
              startIcon={<CloudUploadIcon />}
            >
              Add More Images
            </Button>
          </Box>
          
          <Grid container spacing={2}>
            {selectedFiles.map((file, index) => (
              <Grid item key={`${file.name}-${index}-${file.lastModified}`}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    position: 'relative', 
                    width: 120, 
                    height: 120,
                    overflow: 'hidden',
                  }}
                >
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={`Preview ${file.name}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  
                  <IconButton 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFileRemoved(file.name);
                    }} 
                    sx={{ 
                      position: 'absolute', 
                      top: 2, 
                      right: 2, 
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 1)',
                      }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default ImageDropzone;