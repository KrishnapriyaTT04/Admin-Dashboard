import React from 'react';
import { Card, CardContent, Typography, Divider, Box, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

export const DetailCard = ({ title, data, loading = false }) => {
  const capitalizeWords = (str) => str?.toLowerCase()?.replace(/\b\w/g, (char) => char.toUpperCase()) || '';

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          {loading ? (
            <Skeleton variant="text" width="50%" height={24} />
          ) : (
            <Typography variant="subtitle1" fontWeight={900}>
              {title}
              {'  '}
              <span
                style={{
                  fontWeight: 900,
                  fontSize: '10px',
                  border: '1px solid #50a2d6',
                  color: '#50a2d6',
                  borderRadius: '10px',
                  background: '#88b9d854',
                  padding: '3px 7px'
                }}
              >
                {String(data.length).padStart(2, '0')}
              </span>
            </Typography>
          )}

          {loading ? (
            <Skeleton variant="text" width={60} height={20} />
          ) : (
            <Box
              component={Link}
              to={`/${title.toLowerCase().replace(/\s+/g, '-')}`}
              sx={{
                fontSize: '13px',
                textDecoration: 'none',
                color: '#264a5f',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              View All
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: 1 }} />

        {loading
          ? Array.from(new Array(5)).map((_, idx) => (
              <Box key={idx}>
                <Skeleton variant="text" width="70%" height={18} />
                <Skeleton variant="text" width="50%" height={14} />
                <Skeleton variant="text" width="60%" height={14} />
                <Divider sx={{ mb: 1 }} />
              </Box>
            ))
          : Array.isArray(data)
            ? [...data]
                .sort((a, b) => new Date(b.creation) - new Date(a.creation))
                .slice(0, title === 'Ind Surveyors' ? 7 : 5)
                .map((item, idx) => (
                  <Box key={idx}>
                    <Box mb={1}>
                      <Typography fontWeight={600} fontSize="13px">
                        {capitalizeWords(`${item.first_name} ${item.middle_name || ''} ${item.last_name || ''}`.trim())}
                      </Typography>
                      <Typography fontSize="10px" fontWeight="600" color="#686464ff">
                        {(() => {
                          const datePart = item?.creation?.split(' ')[0];
                          if (!datePart) return '';
                          const [yyyy, mm, dd] = datePart.split('-');
                          return `${dd}-${mm}-${yyyy}`;
                        })()}{' '}
                        | {item.ownership}
                      </Typography>
                      <Typography fontSize="10px" fontWeight="600" color="#686464ff">
                        {item.mobile_number} {item?.mobile_no} | {item.email}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 1 }} />
                  </Box>
                ))
            : null}
      </CardContent>
    </Card>
  );
};
