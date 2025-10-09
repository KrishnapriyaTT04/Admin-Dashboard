import React from 'react';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const DetailCard = ({ title, data = [], count, fields = [], path, sx = {} }) => {
  const capitalizeWords = (str) =>
    str
      ?.toString()
      ?.toLowerCase()
      ?.replace(/\b\w/g, (char) => char.toUpperCase()) || '';

  const safeData = Array.isArray(data) ? data : [];

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, height: '100%', ...sx }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={900}>
            {title}{' '}
            <span
              style={{
                fontWeight: 900,
                fontSize: '10px',
                border: '1px solid rgb(1 152 99)',
                color: 'rgb(1 152 99)',
                borderRadius: '10px',
                background: 'rgb(242 245 248)',
                padding: '3px 7px'
              }}
            >
              <span className="text-lg font-bold leading-none">{String(count).padStart(2, '0')}</span>
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

        {safeData.length > 0
          ? safeData.map((item, idx) => (
              <Box key={idx}>
                <Box mb={1}>
                  <Typography fontWeight={fields[0]?.bold ? 600 : 400} fontSize="13px">
                    {capitalizeWords(item[fields[0]?.name])}
                  </Typography>

                  <Typography fontSize="13px">
                    {[capitalizeWords(item[fields[1]?.name]), capitalizeWords(item[fields[2]?.name])].filter(Boolean).join(' | ')}
                  </Typography>

                  {fields.slice(3).map((field, i) => (
                    <Typography
                      key={i}
                      fontWeight={field.bold ? 600 : 400}
                      fontSize={field.size || '13px'}
                      color={field.color || 'inherit'}
                    >
                      {capitalizeWords(item[field.name])}
                    </Typography>
                  ))}
                </Box>
                <Divider sx={{ mb: 1 }} />
              </Box>
            ))
          : // Blank placeholder rows for consistent card height
            Array.from(new Array(5)).map((_, idx) => (
              <Box key={idx} mb={1} sx={{ minHeight: 20 }}>
                {fields.map((_, i) => (
                  <Typography key={i} fontSize="13px" sx={{ visibility: 'hidden' }}>
                    placeholder
                  </Typography>
                ))}
                <Divider sx={{ mb: 1 }} />
              </Box>
            ))}
      </CardContent>
    </Card>
  );
};
