import React, { useRef, useState } from 'react';
import { Button, Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useFormikContext } from 'formik';

function ImageAttachmentManager({ selectedNewFiles, onNewFilesAdded, onRemoveNewFile }) {
    const { values, setFieldValue } = useFormikContext(); 
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault(); 
        setIsDragging(true);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        onNewFilesAdded(event.dataTransfer.files);
    };

    const handleFileChange = (event) => {
        onNewFilesAdded(event.target.files);
        event.target.value = null; 
    };

    const handleRemoveExistingAttachment = (urlToRemove) => {
        const updatedAttachments = values.attachments.filter(att => att.attachmentUrl !== urlToRemove);
        
        setFieldValue('attachments', updatedAttachments);
    };

    return (
        <Grid container spacing={2}>
            {/* Hidden File Input */}
            <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} 
            />
            
            <Grid item xs={12}>
                <Box sx={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <Typography variant="h5">Image Attachments</Typography>
                </Box>
            </Grid>

            <Grid item xs={12}>
                {/* Drag & Drop Area */}
                <Paper
                    variant="outlined"
                    onDragOver={handleDragOver}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: `2px dashed ${isDragging ? 'primary.main' : 'grey.400'}`,
                        backgroundColor: isDragging ? 'primary.light' : 'background.paper',
                        transition: 'all 0.3s',
                        mb: 3,
                    }}
                >
                    <CloudUploadIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">
                        Drag & drop images here or click to browse
                    </Typography>
                </Paper>
            </Grid>

            {(values.attachments.length > 0 || selectedNewFiles.length > 0) && (
                <Grid container item xs={12} spacing={2} sx={{ mb: 3 }}>
                    
                    {/* 1. Existing Attachments (URLs from Formik) */}
                    {values.attachments.map((att) => (
                        <Grid item key={`existing-${att.attachmentUrl}`}>
                            <Paper elevation={3} sx={{ position: 'relative', width: 120, height: 120, overflow: 'hidden' }}>
                                <img 
                                    src={att.attachmentUrl} 
                                    alt={att.name || 'Existing Attachment'}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <IconButton 
                                    size="small"
                                    onClick={() => handleRemoveExistingAttachment(att.attachmentUrl)} 
                                    sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(255, 255, 255, 0.7)' }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Paper>
                        </Grid>
                    ))}

                    {/* 2. Newly Selected Files (File Objects from Parent State) */}
                    {selectedNewFiles.map((file) => (
                        <Grid item key={`new-${file.name}-${file.lastModified}`}>
                            <Paper elevation={3} sx={{ position: 'relative', width: 120, height: 120, overflow: 'hidden', border: '2px dashed green' }}>
                                <img 
                                    src={URL.createObjectURL(file)} 
                                    alt={`New File ${file.name}`} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <IconButton 
                                    size="small"
                                    // Calls parent handler to remove from 'selectedNewFiles' array
                                    onClick={() => onRemoveNewFile(file.name)} 
                                    sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(255, 255, 255, 0.7)' }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
}

export default ImageAttachmentManager;