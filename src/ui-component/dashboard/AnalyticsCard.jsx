
import React from 'react';
import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { blueGrey } from '@mui/material/colors';
import { UserOutlined, HomeOutlined, WarningOutlined, MessageOutlined } from '@ant-design/icons';
import Card from './card';
import { DetailCard } from './DetailCard';

const AnalyticsCard = () => {
  const facilityList = useSelector((state) => state.facility?.list || []);
  const issueList = useSelector((state) => state.reportIssue?.list || []);
  const feedbackList = useSelector((state) => state.rating?.list || []);
  const usersList = useSelector((state) => state.user?.list || []);
  const dashCount = useSelector((state) =>state?.dashboard?.dashCount);


  const counts = {
    facilities: useSelector((state) => state.facility?.listCount || 0),
    issues: useSelector((state) => state.reportIssue?.listCount || 0),
    feedback: useSelector((state) => state?.rating?.listCount || 0),
    users: useSelector((state) => state.user?.listCount || 0)
  };

  return (

    <Grid container item xs={12} spacing={2.5} alignItems="stretch" >
      <Grid item xs={12} md={9}>
        <Grid container spacing={2.5} alignItems="stretch">
          <Grid item xs={12} sm={3}>
            <Link to="/userManagment" style={{ textDecoration: 'none' }}>
              <Card title="Users" count={dashCount.userCount} color="#2055a8" bgTheme="#e3f2fd" icon={<UserOutlined />} />
            </Link>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Link to="/facility" style={{ textDecoration: 'none' }}>
              <Card title="Facilities" count={dashCount.facilityCount} color="#006064" bgTheme="#e0f7fa" icon={<HomeOutlined />} />
            </Link>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Link to="/reportedIssues" style={{ textDecoration: 'none' }}>
              <Card title="Issues" count={dashCount.issueCount} color="#f2b13b" bgTheme="#f2b13b17" icon={<WarningOutlined />} />
            </Link>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Link to="/rating" style={{ textDecoration: 'none' }}>
              <Card title="Feedback" count={dashCount.feedbackCount} color="#e83766" bgTheme="#e837661c" icon={<MessageOutlined />} />
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <DetailCard
              title="Facilities"
              path="/facility"
              count={counts.facilities}
              data={facilityList}
              fields={[{ name: 'title', bold: true }, { name: 'facilityType' }, { name: 'city' }]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <DetailCard
              title="Issues"
              path="/reportedIssues"
              count={counts.issues}
              data={issueList}
              fields={[{ name: 'reportedByName', bold: true }, { name: 'topic' }]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <DetailCard
              title="Feedback"
              path="/rating"
              count={counts.feedback}
              data={feedbackList}
              fields={[{ name: 'createdUser', bold: true },{ name: 'starRating' }, { name: 'comments' }]}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={3}>
        <DetailCard
          title="Users"
          path="/userManagment"
          count={counts.users}
          data={usersList}
          fields={[{ name: 'firstName', bold: true }, { name: 'phone' }, { name: 'userType' }]}
        />
      </Grid>
    </Grid>
  );
};

export default AnalyticsCard;
