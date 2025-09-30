// renderItem.js
import React from 'react';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography'; // Make sure to import Typography
import dateFormat from 'dateformat';
import { useTheme } from '@mui/material';
import styles from './style';
const getStatusColor = (status) => {
  switch (status) {
    case 'paid':
      return '#4dbd74';
    case 'inProgress':
      return '#f5bc11c2';
    case 'cancelled':
      return '#f86c6b';
    case 'created':
      return '#20a8d8';
    case 'active':
      return '#00cc99';
    case 'suspended':
      return '#808080';
    case 'draft':
      return '#808080';
    case 'publish': // Grouped publish, completed, closed for clarity
    case 'completed':
    case 'closed':
      return '#00cc99';
    case 'deleted':
      return 'red';
    default:
      return 'blue';
  }
};

const renderItem = (data, type, res = '', key = '') => {
  const theme = useTheme();
  const style = styles(theme);
  let returnData = '';

  switch (type) {
    case 'string':
      if (key === 'status') {
        // Corrected: Wrapping Chip in Typography with component="div"
        returnData = (
          <Typography
            variant="body2"
            component="div"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            <Chip
              label={data === 'inProgress' ? 'In Progress' : data}
              sx={{
                ...style.chipLabel,
                backgroundColor: getStatusColor(data)
              }}
              size="small"
            />
          </Typography>
        );
      } else if (key === 'amount') {
        returnData = data ? data : '-';
      } else if (key === 'emissnfactor') {
        returnData = <span className="">{data && data ? data.toFixed(2) : '-'}</span>;
      } else if (key === 'valueInKgCO2e') {
        returnData = <span className="">{data && data ? data.toFixed(2) : '0'}</span>;
      } else {
        returnData = data || '-';
      }
      break;
    case 'object':
      returnData = (data && data.name) || '-';
      break;
    case 'date':
      returnData = data ? dateFormat(data, 'mediumDate') : '-';
      break;
    case 'custom':
      if (key === 'mobileNo') {
        returnData = data ? data.callingCode + data[key] : '-';
      } else {
        returnData = (data && data[key]) || '-';
      }
      break;
    case 'number':
      returnData = data || '-';
      break;
    case 'boolean':
      returnData = String(data);
      break;
    default:
      returnData = '';
  }
  return returnData;
};

export { renderItem, getStatusColor };