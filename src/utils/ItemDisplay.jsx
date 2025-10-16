// renderItem.js
import React from 'react';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography'; 
import dateFormat from 'dateformat';
import { useTheme } from '@mui/material';
import styles from './style';
const getStatusColor = (status) => {
  switch (status) {
    case 'open': 
    case 'active':
      return { text: '#019863', bg: '#0198632e' };
    case 'inactive':
    case 'closed':  
      return { text: 'red', bg: '#ff00001a' };
    case 'cancelled':
      return { text: '#ffffff', bg: '#f86c6b' };
    case 'created':
      return { text: '#ffffff', bg: '#20a8d8' };
    case 'suspended':
      return { text: '#ffffff', bg: '#808080' };
    case 'draft':
      return { text: '#ffffff', bg: '#808080' };
    case 'publish':
    case 'completed':
    case 'closed':
      return { text: '#ffffff', bg: '#00cc99' };
    case 'deleted':
      return { text: '#ffffff', bg: '#ff0000' };
    default:
      return { text: '#ffffff', bg: 'blue' };
  }
};

const renderItem = (data, type, res = '', key = '') => {
  const theme = useTheme();
  const style = styles(theme);
  let returnData = '';

  switch (type) {
    case 'string':
      if (key === 'status') {
        const colors = getStatusColor(data);
        return (
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
                backgroundColor: colors.bg,
                color: colors.text,
                fontWeight: 600
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
