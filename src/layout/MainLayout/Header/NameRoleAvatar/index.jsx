import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Stack, Typography, Box, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ProfileSection from 'layout/MainLayout/Header/ProfileSection';

const stringAvatar = (name) => ({
  sx: {
    bgcolor: '#376f8b',
    width: 40,
    height: 40,
    fontSize: '17px',
    fontWeight: 500,
    color: '#FFFFFF'
  },
  children: name
    .split(' ')
    .map((n) => n[0])
    .join('')
});

export default function BackgroundLetterAvatars() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const userData = useSelector((state) => state.login.data);
  const slctSideMenu = useSelector((state) => state.customization.slctSideMenu);
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{
          borderRadius: 2,
          width: '100%'
        }}
      >
        {/* Left side: Name */}

        <Typography sx={{ color: '#fff', fontWeight: 300 }}>{`${slctSideMenu}`}</Typography>

        {/* Right side: Avatar, role, ProfileSection */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar {...stringAvatar(userData.full_name || userData?.message?.respondent?.first_name || '')} />
          <Box sx={{ ml: 1 }}>
            <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
              {userData?.message?.name || userData?.message?.respondent?.first_name || ''}
            </Typography>
            <Typography variant="body2" sx={{ color: '#D1D5DB', fontWeight: 400 }}>
              {userData.message?.roles || ''}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: '#D1D5DB', mx: 1, flexShrink: 0 }} />

          <Box sx={{ ml: 1 }}>
            <ProfileSection />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
