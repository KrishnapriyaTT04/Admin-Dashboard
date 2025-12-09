import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import AnalyticsCard from './AnalyticsCard';

import {
  getFacilitiesCount,
  getFacilities
} from 'container/FacilityContainer/slice';
import {
  getIssuesCount,
  getIssueReports
} from 'container/ReportIssuesContainer/slice';
import {
  getRatings,
  getRatingCount
} from 'container/RatingContainer/slice';
import {
  getUserCount,
  getUsers
} from 'container/UsersContainer/slice';
import {dashCount} from 'container/DashboardContainer/slice';
import MainCard from 'ui-component/cards/MainCard';

const DashboardDefault = () => {
  const dispatch = useDispatch();
  const [limit] = useState(5);
  const [page] = useState(0);

  useEffect(() => {
    const urls = {
      facilities: `facilities?filter={"limit":${limit},"skip":${page},"order":["createdOn DESC"]}`,
      users: `users?filter={"limit":8,"skip":${page},"order":["createdOn DESC"]}`,
      issues: `issues?filter={"limit":${limit},"skip":${page},"order":["createdOn DESC"]}`, 
      feedback:`feedbacks?filter={"limit": 5,"skip": 0}`
    };

    dispatch(getFacilitiesCount('facilities/count'));
    dispatch(getFacilities(urls.facilities));
    dispatch(getIssuesCount());
    dispatch(getRatings(urls.feedback));
    dispatch(getRatingCount(`feedbacks/count`));
    dispatch(getUserCount(`users/count`));
    dispatch(getIssueReports(urls.issues));
    dispatch(getUsers(urls.users));
    dispatch(dashCount());
  }, [dispatch, limit, page]);

  return (
     <MainCard sx={{boxShadow:'none'}}>
    <Box>
      <Box
        sx={{
          p: 1.5,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#f2f5f8',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              background: '#039123',
              color: '#fff',
              borderRadius: '50%',
              height: 40,
              width: 40,
              mr: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem'
            }}
          >
            <UserOutlined />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              Platform Admin Dashboard
            </Typography>
            <Typography sx={{ fontSize: 13 }}>Hello, KLOO Admin 👋</Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Analytics Section */}
      <AnalyticsCard />
    </Box>
    </MainCard>
  );
};

export default DashboardDefault;

