import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';

// ✅ OLD ICONS (as you used before)
import {
  UserOutlined,
  HomeOutlined,
  WarningOutlined,
  MessageOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const AnalyticsCard = () => {
  const stats = [
    {
      title: 'Tokens issued today',
      value: '1,284',
      change: '+12% vs yesterday',
      icon: <UserOutlined />,
      color: '#4CAF50',
      bg: '#E8F5E9'
    },
    {
      title: 'Active bookings',
      value: '347',
      change: '+8 in last hour',
      icon: <HomeOutlined />,
      color: '#2196F3',
      bg: '#E3F2FD'
    },
    {
      title: 'Avg wait time',
      value: '22 min',
      change: '-4 min vs target',
      icon: <ClockCircleOutlined />,
      color: '#F44336',
      bg: '#FFEBEE'
    },
    {
      title: 'Tokens completed',
      value: '937',
      change: '73% completion rate',
      icon: <MessageOutlined />,
      color: '#009688',
      bg: '#E0F2F1'
    }
  ];

  const queue = [
    { id: 'T-0042', name: 'Arya Menon', dept: 'Cardiology', time: '8 min', status: 'In progress' },
    { id: 'T-0118', name: 'Rahul Krishnan', dept: 'Orthopaedics', time: '24 min', status: 'Waiting' },
    { id: 'T-0219', name: 'Deepa Suresh', dept: 'Neurology', time: '41 min', status: 'Waiting' },
    { id: 'T-0301', name: 'Sujith Nair', dept: 'General OPD', time: '57 min', status: 'Delayed' }
  ];

  const departments = [
    { name: 'General OPD', value: 412 },
    { name: 'Cardiology', value: 287 },
    { name: 'Orthopaedics', value: 198 },
    { name: 'Neurology', value: 163 },
    { name: 'Gynaecology', value: 144 },
    { name: 'Radiology', value: 80 }
  ];

  const getStatusColor = (status) => {
    if (status === 'In progress') return 'success';
    if (status === 'Waiting') return 'warning';
    return 'error';
  };

  return (
    <Grid container spacing={3}>
      {/* ===== TOP STATS ===== */}
      {stats.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {item.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: item.color }}>
                    {item.change}
                  </Typography>
                </Box>

                {/* ICON */}
                <Box
                  sx={{
                    backgroundColor: item.bg,
                    color: item.color,
                    p: 1.5,
                    borderRadius: '50%',
                    fontSize: 20
                  }}
                >
                  {item.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* ===== LEFT: TOKEN QUEUE ===== */}
      <Grid item xs={12} md={12}>
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <UserOutlined />
                <Typography variant="h6">Active token queue</Typography>
              </Box>

              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                See all →
              </Typography>
            </Box>

            {queue.map((row, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                p={1.5}
                sx={{
                  borderRadius: 2,
                  '&:hover': { backgroundColor: '#f9f9f9' }
                }}
              >
                <Box>
                  <Typography fontWeight="bold">{row.id}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {row.name}
                  </Typography>
                </Box>

                <Typography>{row.dept}</Typography>
                <Typography>{row.time}</Typography>

                <Chip
                  label={row.status}
                  color={getStatusColor(row.status)}
                  size="small"
                />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* ===== RIGHT: DEPARTMENT LOAD ===== */}
      {/* <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <HomeOutlined />
              <Typography variant="h6">
                Department load today
              </Typography>
            </Box>

            {departments.map((dept, index) => (
              <Box key={index} mb={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">{dept.name}</Typography>
                  <Typography variant="body2">{dept.value}</Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={(dept.value / 500) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    mt: 0.5
                  }}
                />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid> */}
    </Grid>
  );
};

export default AnalyticsCard;