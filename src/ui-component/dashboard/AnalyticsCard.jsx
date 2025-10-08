import React from 'react';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from './card';
import { UserOutlined, HomeOutlined, WarningOutlined, MessageOutlined } from '@ant-design/icons';
import { DetailCard } from './DetailCard';
import { useSelector } from 'react-redux';

const AnalyticsCard = () => {
  
    const facilityList = useSelector((state) => state.facility?.list || []);
    const facilityLoading = useSelector((state) => state.facility?.facilityLoading || false);
  const issueList = useSelector((state) => state?.reportIssue?.list || []);
  const feedbackList = useSelector((state) => state.rating?.list || []);
  const usersList = useSelector((state) => state.user?.list || []);

  const facilitycount = useSelector((state) => state.facility?.listCount || 0);
  const issuecount = useSelector((state) => state.reportIssue?.listCount || 0);
  const feedbackcount = useSelector((state) => state?.rating?.listCount || 0);
  const usercount = useSelector((state) => state?.user?.listCount || 0);

  // const isLoading = !facilityList.length && !issueList.length && !feedbackList.length && !usersList.length;
  const isLoading = facilityLoading;
  console.log('==feedbackList', isLoading);
    console.log('==feedbackList1', facilityList);



  return (
    <Grid container>
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
          <Link to="/userfeedback" style={{ textDecoration: 'none' }}>
            <Card title="Feedback" count={feedbackcount} color="#e83766" bgTheme="#e837661c" icon={<MessageOutlined />} />
          </Link>
        </Grid>

        <Grid item xs={12} sm={4}>
          <DetailCard
          path="/facility"
            title="Facilities"
            data={facilityList}
            loading={isLoading}
            fields={[{ name: 'title', bold: true }, { name: 'status' }]}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* <DetailCard title="Issues" data={issueList} loading={isLoading} /> */}
          <DetailCard
            title="Issues"
            path = "/reportedIssues"
            data={issueList}
            loading={isLoading}
            fields={[{ name: 'title', bold: true }, { name: 'contactPhone' }]}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <DetailCard title="Feedback" data={feedbackList} loading={isLoading} /> */}
           <DetailCard
              title="Feedback"
              path = "/userfeedback"
              data={feedbackList}
              loading={isLoading}
              fields={[{ name: 'createdUser', bold: true }, { name: 'comments' }]}
            />
        </Grid>
      </Grid>

      <Grid sx={{ pl: 2 }} container xs={12} md={3}>
        <Grid item xs={12}>
          {/* <DetailCard title="Users" data={usersList} feilds={[{val1 : usersList?.firstName, val2 : usersList?.phone}]} loading={isLoading} /> */}
          <Grid item xs={12}>
            <DetailCard
              title="Users"
              path = "/userManagment"
              data={usersList}
              loading={isLoading}
              fields={[{ name: 'firstName', bold: true }, { name: 'phone' }]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AnalyticsCard;
