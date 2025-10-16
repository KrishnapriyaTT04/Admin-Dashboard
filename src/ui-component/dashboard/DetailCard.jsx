import React from 'react';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

export const DetailCard = ({ title, data = [], count, fields = [], path, sx = {} }) => {
  const capitalize = (str) => str?.toString()?.replace(/\b\w/g, (char) => char.toUpperCase()) || '';

  const safeData = Array.isArray(data) ? data : [];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        ...sx
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '10px'
          },
          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#888' },
          scrollbarWidth: 'thin',
          scrollbarColor: '#ccc #f1f1f1'
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={900}>
            {title}{' '}
            <span
              style={{
                fontSize: '10px',
                border: '1px solid #019863',
                color: '#019863',
                borderRadius: '10px',
                background: '#f2f5f8',
                padding: '3px 7px'
              }}
            >
              {String(count).padStart(2, '0')}
            </span>
          </Typography>
          <Box
            component={Link}
            to={path}
            sx={{
              fontSize: '13px',
              textDecoration: 'none',
              color: '#264a5f',
              fontWeight: 600,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            View All
          </Box>
        </Box>

        <Divider sx={{ mb: 1 }} />

        {/* Data List */}
        {safeData.length > 0 ? (
          safeData.map((item, idx) => (
            <Box key={idx} mb={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography fontWeight={fields[0]?.bold ? 600 : 400} fontSize="13px">
                  {capitalize(item[fields[0]?.name])}
                </Typography>

                {fields
                  .slice(1)
                  .map((f) =>
                    f.name === 'starRating' ? <Rating key={f.name} value={Number(item[f.name] || 0)} readOnly  sx={{ fontSize: 14 }} /> : null
                  )}
              </Box>

              {/* Other fields below */}
              <Typography
                fontSize="13px"
                sx={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}
              >
                {fields
                  .slice(1)
                  .filter((f) => f.name !== 'starRating')
                  .map((f) => capitalize(item[f.name]))
                  .filter(Boolean)
                  .join(' | ')}
              </Typography>

              <Divider sx={{ mt: 1 }} />
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No records found.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
