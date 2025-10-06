import React from 'react';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from './card'
// import { UserOutlined, HomeOutlined, WarningOutlined, MessageOutlined } from "@ant-design/icons";
import { DetailCard } from './DetailCard';
import { useSelector } from 'react-redux';

const Service = () => {
  const requesters = useSelector((state) => state.requester?.data?.data || []);
  const vendors = useSelector((state) => state.vendors?.data?.data || []);
  const vndrSurveyors = useSelector((state) => state.vndrSurveyor?.data?.data || []);
  const indSurveyors = useSelector((state) => state.indSurveyor?.data?.data || []);

  const isLoading = !requesters.length && !vendors.length && !vndrSurveyors.length && !indSurveyors.length;


  return (
    <Grid container>
      <Grid rowSpacing={2.5} columnSpacing={1.75} container xs={12} md={9}>

        <Grid item xs={12} sm={3}>
          <Link to="/consumers" style={{ textDecoration: 'none' }}>
            <Card title="Consumers" count={requesters?.length} color="#2055a8" bgTheme="#e3f2fd" icon={<UserOutlined />} />
          </Link>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Link to="/facilities" style={{ textDecoration: 'none' }}>
            <Card title="Facilities" count={vendors?.length} color="#006064" bgTheme="#e0f7fa" icon={<HomeOutlined />} />
          </Link>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Link to="/issues" style={{ textDecoration: 'none' }}>
            <Card
              title="Issues"
              count={vndrSurveyors.length}
              color="#f2b13b"
              bgTheme="#f2b13b17"
              icon={<WarningOutlined />}
            />
          </Link>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Link to="/feedback" style={{ textDecoration: 'none' }}>
            <Card
              title="Feedback"
              count={indSurveyors.length}
              color="#e83766"
              bgTheme="#e837661c"
              icon={<MessageOutlined />}
            />
          </Link>
        </Grid>

        <Grid item xs={12} sm={4}>
          <DetailCard title="Requesters" data={requesters} loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DetailCard title="Vendors" data={vendors} loading={isLoading}/>
        </Grid>
        <Grid item xs={12} sm={4}>
          <DetailCard title="Vendor Surveyors" data={vndrSurveyors} loading={isLoading} />
        </Grid>
      </Grid>

      <Grid sx={{ pl: 2 }} container xs={12} md={3}>
        <Grid item xs={12}>
          <DetailCard title="Ind Surveyors" data={indSurveyors} loading={isLoading} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Service;
