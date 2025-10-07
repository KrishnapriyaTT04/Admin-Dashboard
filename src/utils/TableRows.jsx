import React from 'react';
import {
  TableBody, 
  TableRow, 
  TableCell, 
  IconButton,
  Tooltip,
  Box,
  Typography,
  useTheme
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  History as HistoryIcon,
  MoreVert as MoreVertIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Share as ShareIcon,
  CloudDownload as DownloadIcon,
  Close as CloseIcon,
  SwapHoriz as SwapHorizIcon
} from '@mui/icons-material';
import IosShareIcon from '@mui/icons-material/IosShare';
import { renderItem } from './ItemDisplay';
import NoDataMsg from './NodataMsg';
import styles from './style';

const TableRows = ({
  data = [],
  keys = [],
  config,
  currentPage,
  tableLimit,
  handleViewModel,
  handleFormModal,
  handleDeleteModal,
  handlProjectStatusModal,
  handleRevisionModal,
  createPdf,
  hasProjectDelete,
  hasProjectShare = false,
  hasDelete = true,
  hasEdit = true,
  hasRevision = false,
  hasView = true,
  hasProjectView = false,
  hasProjectFile = false,
  hasProjectClose = false,
  hasPdfView = false,
  hasStatusChange = false,
  hasActionRow = true,
  hasMore = false,
  renderMoreComponent,
  hideArray = [],
  hasProjectStatusChange = false,
  handleMoreButtonClick,
  slNo = true,
  filter,
  msg,
  tableData,
  modal = '',
  ...props
}) => {
  const theme = useTheme();
  const style = styles(theme);

  const user = JSON.parse(localStorage.getItem('PsbUser'));
 
  const cellContent = (keyItem, index, row) => {
   
    if (keyItem === 'starRating' && config[keyItem].type === 'number') {
      return renderItem(
        row[keyItem], 
        config[keyItem].type,
        config[keyItem].res,
        keyItem
      );
    } 

    return renderItem(
      config[keyItem]?.label === 'Status'
        ? row.status
        : config[keyItem].type === 'number' && (row[keyItem] === undefined || row[keyItem] === '')
          ? '00'
          : config[keyItem].type === 'number' && (row[keyItem] !== undefined || row[keyItem] !== '')
            ? 
              String(Number(row[keyItem]) + 1).padStart(2, '0')
            : config[keyItem].type === 'custom'
              ? row[config[keyItem].res]
              : row[keyItem],
      config[keyItem].type,
      config[keyItem].res,
      keyItem
    );
  };
  const visibleColumnCount = React.useMemo(() => {
    let count = 0;
    if (slNo) count++;
    keys.forEach((keyItem) => {
      if (config[keyItem] && !hideArray.includes(config[keyItem].label)) {
        count++;
      }
    });
    if (hasActionRow) count++;
    return count;
  }, [slNo, keys, config, hideArray, hasActionRow]);

  return (
    <TableBody>
      {/* No whitespace here */}
      {data?.length > 0 ? (
        data?.map((row, i) => (
          <TableRow
            key={i}
            sx={{
              backgroundColor: i % 2 === 0 ? '#f5f5f5' : '#ffffff', 
              whiteSpace: 'nowrap',
              overflow: 'ellipsis',
              padding: '10px !important'
            }}
          >
            {slNo ? (
              <TableCell sx={{ width: '23px', padding: '10px !important' }}>{tableLimit * (currentPage - 1) + i + 1}</TableCell>
            ) : null}
            {/* {slNo ? <TableCell sx={{ width: '23px', padding: '10px !important' }}>{10 * (currentPage - 1) + i + 1}</TableCell> : null} */}
            {keys.map((keyItem, index) => {
              if (!config[keyItem] || hideArray.includes(config[keyItem].label)) {
                return null;
              }
              return (
                <TableCell
                  key={index}
                  sx={{
                    textTransform: 'capitalize',
                    ...(keyItem === 'projectId' ? {} : { maxWidth: '155px' }),
                    padding: '10px !important',
                    textAlign: config[keyItem]?.align === 'right' ? 'right' : 'left'
                  }}
                >
                  {}
                  <Tooltip
                    title={keyItem === 'status' || keyItem === 'revision' ? '' : String(cellContent(keyItem, index, row)) || ''}
                    placement="top"
                    disableHoverListener={!cellContent}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          textTransform: 'capitalize' 
                        }
                      }
                    }}
                  >
                    <Typography
                      variant="body1" 
                      sx={style.tableRowLabel}
                    >
                      {cellContent(keyItem, index, row)}
                    </Typography>{' '}
                  </Tooltip>
                </TableCell>
              );
            })}
            {hasActionRow && (
              <TableCell sx={{ whiteSpace: 'nowrap', padding: '10px !important' }}>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {hasView && (
                    <Tooltip title="View">
                      <IconButton color="primary" size="small" sx={{ ...style.cmnIcon, ...style.cmnViewIcon }}>
                        <VisibilityIcon sx={style.cmnSvg} onClick={() => handleViewModel(row, modal)} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {hasEdit &&
                  row.status !== 'publish' &&
                  row.status !== 'deleted' &&
                  row.status !== 'completed' &&
                  row?.status !== 'closed' ? (
                    <Tooltip title="Edit">
                      <IconButton
                        color="info"
                        onClick={() => handleFormModal(row)}
                        size="small"
                        sx={{ ...style.cmnIcon, ...style.cmnEditIcon }}
                      >
                        <EditIcon sx={style.cmnSvg} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                  {hasStatusChange && (
                    <Tooltip title="Change status">
                      <IconButton
                        color="warning"
                        onClick={() => handleDeleteModal(row)}
                        size="small"
                        sx={{ ...style.cmnIcon, ...style.cmnStatusIcon }}
                      >
                        <BlockIcon fontSize="small" sx={style.cmnSvg} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {hasDelete && row.status !== 'publish' ? (
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteModal(row)}
                        size="small"
                        sx={{ ...style.cmnIcon, ...style.cmnStatusIcon }}
                      >
                        <DeleteIcon fontSize="small" sx={style.cmnSvg} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                  {hasProjectDelete && row.status !== 'deleted' && row.status !== 'publish' ? (
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDeleteModal(row)} size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                  {hasRevision && (
                    <Tooltip title="Revision">
                      <IconButton color="default" onClick={() => handleRevisionModal(row)} size="small">
                        <HistoryIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {hasMore && (
                    <Box sx={{ position: 'relative' }}>
                      <Tooltip title="More">
                        <IconButton
                          color="default"
                          onClick={(e) => handleMoreButtonClick(e, row, i)}
                          size="small"
                          sx={{ ...style.cmnMoreIcon }}
                        >
                          <MoreVertIcon sx={style.cmnSvg} />
                        </IconButton>
                      </Tooltip>
                      {renderMoreComponent(row)}
                    </Box>
                  )}
                  {hasPdfView && (
                    <Tooltip title="PDF">
                      <IconButton color="secondary" onClick={() => createPdf(row)} size="small">
                        <PictureAsPdfIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {hasProjectView && (
                    <Tooltip title="View Project">
                      <IconButton color="primary" size="small">
                        <ShareIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {user?.role === 'admin' && hasProjectStatusChange && (
                    <Tooltip title="Change Project Status">
                      <IconButton color="warning" onClick={() => handlProjectStatusModal(row)} size="small">
                        <SwapHorizIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {hasProjectFile && (
                    <Tooltip title="Download Project File">
                      <IconButton color="default" size="small">
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {user?.role === 'user' && hasProjectShare && (
                    <Tooltip title="Share Project">
                      <IconButton color="primary" onClick={() => props.handleProjectShare(row)} size="small">
                        <IosShareIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {hasProjectClose && (
                    <Tooltip title="Close Project">
                      <IconButton color="error" size="small">
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </TableCell>
            )}
          </TableRow>
        )) 
      ) : (
        <>
          {' '}
          <TableRow>
            <TableCell colSpan={visibleColumnCount} sx={{ textAlign: 'center', py: 3 }}>
              <NoDataMsg msg={msg} tableData={tableData} filter={filter} />
            </TableCell>
          </TableRow>
        </>
      )}
    </TableBody>
  );
};

export default TableRows;
