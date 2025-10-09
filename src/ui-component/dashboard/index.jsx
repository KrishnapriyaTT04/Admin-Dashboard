import { Grid, Typography, Box } from '@mui/material';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getFacilitiesCount, getFacilities } from 'container/FacilityContainer/slice';
import { getIssuesCount, getIssueReports } from 'container/ReportIssuesContainer/slice';
import { getUserFeedback, getUserFeedbackCount } from 'container/UserFeedbackContainer/slice';
import { getUserCount, getUsers } from 'container/UsersContainer/slice';

import AnalyticsCard from './AnalyticsCard';

const DashboardDefault = () => {
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let countUrl = `facilities/count`;
    let reqUrl = `facilities?filter={"limit":${limit},"skip":${page},"order":["createdOn DESC"]}`;
    let userUrl = `users?filter={"limit":${limit},"skip":${page},"order":["createdOn DESC"]}`;
    let repUrl = `issues?filter={"limit":${limit},"skip":${page},"order":["createdOn DESC"]}`;
    dispatch(getFacilitiesCount(countUrl));
    dispatch(getFacilities(reqUrl));
    dispatch(getIssuesCount());
    dispatch(getUserFeedback());
    dispatch(getUserFeedbackCount());
    dispatch(getUserCount());
    dispatch(getUserCount());
    dispatch(getIssueReports(repUrl));
    dispatch(getUsers(userUrl));
  }, [dispatch]);

  return (
    <>
      <Grid>
        <Grid
          container
          xs={12}
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
                background: '#019863',
                color: '#ffffff',
                borderRadius: '50%',
                height: '40px',
                width: '40px',
                mr: 1,
                p: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}
            >
              <UserOutlined />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Platform Admin Dashboard</Typography>
              <Typography sx={{ fontSize: '13px', fontWeight: 400 }}>Hello, KLOO Admin 👋</Typography>
            </Box>
          </Box>
        </Grid>
        <AnalyticsCard />
      </Grid>
    </>
  );
};

export default DashboardDefault;
