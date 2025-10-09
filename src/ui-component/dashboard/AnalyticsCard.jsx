import React from 'react';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from './card';
import { UserOutlined, HomeOutlined, WarningOutlined, MessageOutlined } from '@ant-design/icons';
import { DetailCard } from './DetailCard';
import { useSelector } from 'react-redux';

const AnalyticsCard = () => {
  const facilityList = useSelector((state) => state.facility?.list || []);
  const issueList = useSelector((state) => state?.reportIssue?.list || []);
  const feedbackList = useSelector((state) => state.feedback?.list || []);
  const usersList = useSelector((state) => state.user?.list || []);

  const facilitycount = useSelector((state) => state.facility?.listCount || 0);
  const issuecount = useSelector((state) => state.reportIssue?.listCount || 0);
  const feedbackcount = useSelector((state) => state.feedback?.listCount || 0);
  const usercount = useSelector((state) => state?.user?.listCount || 0);


  return (
    <Grid container alignItems="stretch">
      <Grid rowSpacing={2.5} columnSpacing={1.75} container xs={12} md={9}>
        <Grid item xs={12} sm={3}>
          <Link to="/userManagment" style={{ textDecoration: 'none' }}>
            <Card title="Users" count={usercount} color="#2055a8" bgTheme="#e3f2fd" icon={<UserOutlined />} />
          </Link>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Link to="/facility" style={{ textDecoration: 'none' }}>
            <Card title="Facilities" count={facilitycount} color="#006064" bgTheme="#e0f7fa" icon={<HomeOutlined />} />
          </Link>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Link to="/reportedIssues" style={{ textDecoration: 'none' }}>
            <Card title="Issues" count={issuecount} color="#f2b13b" bgTheme="#f2b13b17" icon={<WarningOutlined />} />
          </Link>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Link to="/rating" style={{ textDecoration: 'none' }}>
            <Card title="Feedback" count={feedbackcount} color="#e83766" bgTheme="#e837661c" icon={<MessageOutlined />} />
          </Link>
        </Grid>

        <Grid item xs={12} sm={4}>
          <DetailCard
            title="Facilities"
            path="/facility"
            count={facilitycount}
            data={facilityList}
            fields={[
              { name: 'title', bold: true },
              { name: 'facilityType' },
              { name: 'city' },
              { name: 'status', color: '#008000', size: '12px' }
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <DetailCard
            title="Issues"
            path="/reportedIssues"
            data={issueList}
            count={issuecount}
            fields={[{ name: 'assignedName', bold: true }, { name: 'topic' }]}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <DetailCard
            title="Feedback"
            path="/rating"
            data={feedbackList}
            count={feedbackcount}
            fields={[
              { name: 'createdUser', bold: true },
              { name: 'comments', color: '#444', size: '12px' },
              // { name: 'starRating', color: '#f4b400', size: '12px' },
            ]}
          />
        </Grid>
      </Grid>

      <Grid sx={{ pl: 2 }} container xs={12} md={3}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <DetailCard
              title="Users"
              path="/userManagment" 
              count={usercount}
              data={usersList}
              fields={[{ name: 'firstName', bold: true }, { name: 'phone' }, { name: 'userType' }]}
              sx={{ minHeight: '75vh' }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AnalyticsCard;
