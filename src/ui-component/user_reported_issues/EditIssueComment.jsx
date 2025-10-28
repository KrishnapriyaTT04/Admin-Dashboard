import React, { useState } from 'react';
import { Drawer, Box, Typography, IconButton, Button, TextField, CardContent, Card, Grid, Stack, Avatar, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Chat as ChatIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updIssue } from 'container/ReportIssuesContainer/slice';

const EditIssueComment = ({ drawerOpen, setDrawerOpen, item, getReqUrl }) => {
  const theme = useTheme();
  const primary = '#039123';
  const lightGreen = '#e8f5e9';

  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const values = {
      id: item?.id,
      comments: comment.trim()
    };

    dispatch(updIssue({ values, getReqestUrl: getReqUrl }));
    setDrawerOpen(false);
  };

  const DetailSection = ({ icon, title, children }) => (
    <Card
      variant="outlined"
      sx={{
        mb: 2.5,
        borderColor: `${primary}30`,
        '&:hover': { boxShadow: '0 2px 8px rgba(1,152,99,0.1)' }
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
          <Avatar sx={{ bgcolor: lightGreen, color: primary, width: 32, height: 32 }}>{icon}</Avatar>
          <Typography variant="h5" fontWeight={600} color={primary}>
            {title}
          </Typography>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );

  return (
<Drawer
  anchor="right"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  PaperProps={{
    sx: {
      width: { xs: '100%', sm: '80%', md: '70%', lg: 800 },
      background: '#fff',
      boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
      borderLeft: `4px solid ${primary}`,
    },
  }}
>
  <Box sx={{ p: 3 }}>
    {/* Header */}
    <Card sx={{ mb: 3, bgcolor: '#f0f9f6', borderRadius: 2, color: primary, boxShadow: 'none' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" fontWeight={700} color={primary}>
            Issue Comment
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ bgcolor: lightGreen, color: primary, '&:hover': { bgcolor: '#ffffff' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>

    <DetailSection icon={<ChatIcon />} title="Comment">
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Topic
        </Typography>
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
    </DetailSection>

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
          backgroundColor: '#039123',
          borderRadius: 2,
          border: '1px solid #039123',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
          '&:hover': {
            backgroundColor: 'white',
            color: '#039123',
            border: '1px solid #039123',
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
