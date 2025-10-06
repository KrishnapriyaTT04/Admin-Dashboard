import { Grid, Typography, Box } from '@mui/material';
import { UserOutlined } from '@ant-design/icons';

import Service from './Service';

const DashboardDefault = () => {
  return (
    <>
      <Grid container>
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
              <Typography sx={{ fontSize: '13px', fontWeight: 100 }}>Hello, KLOO Admin 👋</Typography>
            </Box>
          </Box>
        </Grid>
        <Service/>
      </Grid>
    </>
  );
};

export default DashboardDefault;
