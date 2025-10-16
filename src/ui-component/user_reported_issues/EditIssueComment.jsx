import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Grid,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch } from 'react-redux';
import { updIssue } from 'container/ReportIssuesContainer/slice';

const EditIssueComment = ({ drawerOpen, setDrawerOpen, item, getReqUrl }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const values = {
      id: item?.id,
      comments: comment.trim(),
    };


    dispatch(updIssue({values, getReqestUrl: getReqUrl}));
    setDrawerOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: '80%', md: '40%', lg: '600px' },
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ color: theme.palette.primary.dark }}>
            Issue Comment
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} size="large">
            <CloseIcon />
          </IconButton>
        </Grid>


        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Topic</Typography>
          <Typography
            variant="h6"
            sx={{
              p: 1,
              border: '1px solid #ccc',
              borderRadius: 1,
              backgroundColor: '#fff',
            }}
          >
            {item?.topic || 'No topic found'}
          </Typography>
        </Box>

        {/* Comment Box */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Add Comment"
            multiline
            minRows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type your comment here..."
            sx={{ backgroundColor: '#fff', mb: 3 }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<CheckCircleOutlineIcon />}
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 600,
              fontSize: 16,
              color: '#fff',
              backgroundColor: '#019863',
              borderRadius: 2,
              border: '1px solid #019863',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
              '&:hover': {
                backgroundColor: 'white',
                color: '#019863',
                border: '1px solid #019863',
              },
            }}
          >
            Submit Comment
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default EditIssueComment;
