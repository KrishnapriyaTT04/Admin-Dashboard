import React from 'react';
import {
  Pagination as MuiPagination, // Renamed to avoid conflict with local component name
  Stack, // For arranging components like pagination easily
  Box // For the container div
} from '@mui/material';

const Pagination = ({ countPagination, page, handlePageClick }) => {
  const handleChange = (event, value) => {
    handlePageClick({ selected: value - 1 });
  };

  return (
    <Box className="paginationDiv" sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      {countPagination > 1 && (
        <MuiPagination
          count={countPagination} // Total number of pages
          page={page + 1} // Current page (MUI is 1-indexed, your `page` is 0-indexed)
          onChange={handleChange} // Event handler for page change
          showFirstButton // Shows a button to go to the first page
          showLastButton // Shows a button to go to the last page
          siblingCount={2} // Corresponds to pageRangeDisplayed={5} (current + 2 before + 2 after)
          boundaryCount={2} // Corresponds to marginPagesDisplayed={2}
          color="secondary" 
        />
      )}
    </Box>
  );
};

export default Pagination;