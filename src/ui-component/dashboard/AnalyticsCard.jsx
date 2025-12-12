import React from 'react';
import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { blueGrey } from '@mui/material/colors';
import { UserOutlined, HomeOutlined, WarningOutlined, MessageOutlined } from '@ant-design/icons';
import Card from './card';
import { DetailCard } from './DetailCard';
import { ClockCircleOutlined } from '@ant-design/icons';

const AnalyticsCard = () => {
  const facilityList = useSelector((state) => state.facility?.list || []);
  const issueList = useSelector((state) => state.reportIssue?.list || []);
  const feedbackList = useSelector((state) => state.rating?.list || []);
  const usersList = useSelector((state) => state.user?.list || []);
  const dashCount = useSelector((state) => state?.dashboard?.dashCount);
  const draftFacilities = useSelector((state) => state.facility?.draftList || []);

  const draftCount = draftFacilities.length;

  console.log('FacilityList in Dashboar = ', facilityList);

  const counts = {
    facilities: useSelector((state) => state.facility?.listCount || 0),
    issues: useSelector((state) => state.reportIssue?.listCount || 0),
    feedback: useSelector((state) => state?.rating?.listCount || 0),
    users: useSelector((state) => state.user?.listCount || 0)
  };

  return (
    <Grid container item xs={12} spacing={2.5}>
      {/* ================== ROW 1 : 5 SMALL CARDS ================== */}
      <Grid item xs={12}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Link to="/userManagment" style={{ textDecoration: 'none' }}>
              <Card title="Active Users" count={dashCount.userCount} color="#2055a8" bgTheme="#e3f2fd" icon={<UserOutlined />} />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Link to="/facility" style={{ textDecoration: 'none' }}>
              <Card title="Active Facilities" count={dashCount.facilityCount} color="#006064" bgTheme="#e0f7fa" icon={<HomeOutlined />} />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Link to="/facility" style={{ textDecoration: 'none' }}>
              <Card
                title="Draft Facilities"
                count={draftCount}
                color="#546E7A" // Blue-grey text/icon
               bgTheme="#ECEFF1"// Soft blue-grey background
                icon={<ClockCircleOutlined />}
              />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Link to="/reportedIssues" style={{ textDecoration: 'none' }}>
              <Card title="Open Issues" count={dashCount.issueCount} color="#e83766" bgTheme="#e837661c" icon={<WarningOutlined />} />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Link to="/rating" style={{ textDecoration: 'none' }}>
              <Card title="Feedback" count={dashCount.feedbackCount} color="#5E35B1" bgTheme="#EDE7F6" icon={<MessageOutlined />} />
            </Link>
          </Grid>
        </Grid>
      </Grid>

      {/* ================== ROW 2 : 4 DETAIL CARDS ================== */}
      <Grid item xs={12}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={3}>
            <DetailCard
              title="Facilities"
              path="/facility"
              count={counts.facilities}
              data={facilityList}
              fields={[{ name: 'title', bold: true }, { name: 'facilityType' }, { name: 'city' }]}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <DetailCard
              title="Issues"
              path="/reportedIssues"
              count={counts.issues}
              data={issueList}
              fields={[{ name: 'reportedByName', bold: true }, { name: 'topic' }]}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <DetailCard
              title="Feedback"
              path="/rating"
              count={counts.feedback}
              data={feedbackList}
              fields={[{ name: 'createdUser', bold: true }, { name: 'starRating' }, { name: 'comments' }]}
            />
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
      </Grid>
    </Grid>
  );
};

export default AnalyticsCard;
