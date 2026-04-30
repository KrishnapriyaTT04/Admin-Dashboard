// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow
// } from '@mui/material';

// import { getVendorsRequest } from 'container/VendorContainer/slice';

// const VendorsCard = ({ onAdd }) => {
//   const dispatch = useDispatch();

//   const { vendors } = useSelector((state) => state.vendors);

//   useEffect(() => {
//     dispatch(getVendorsRequest());
//   }, [dispatch]);

//   return (
//     <Card>
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" mb={3} mt={3} ml={2}>
//           <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>Vendors</Typography>

//           <Button variant="contained" onClick={onAdd}>
//             Add Vendor
//           </Button>
//         </Box>

//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Vendor Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {vendors?.map((vendor) => (
//               <TableRow key={vendor._id}>
//                 <TableCell>{vendor.vendorName}</TableCell>
//                 <TableCell>{vendor.email}</TableCell>
//                 <TableCell>{vendor.phone}</TableCell>
//                 <TableCell>{vendor.status}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default VendorsCard;






// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow
// } from '@mui/material';

// import { getVendorsRequest } from 'container/VendorContainer/slice';

// const getLetterIcon = (name = '') => {
//   const letter = name.trim().charAt(0).toUpperCase() || '?';
//   const colors = [
//     { bg: '#E8F5EE', color: '#1D9E75' },
//     { bg: '#EAF4FF', color: '#2196F3' },
//     { bg: '#FFF4DE', color: '#EF9F27' },
//     { bg: '#fdecea', color: '#ef4444' },
//     { bg: '#ede9fb', color: '#6c5ce7' },
//     { bg: '#fde8f3', color: '#e84393' },
//   ];
//   const index = letter.charCodeAt(0) % colors.length;
//   return { letter, ...colors[index] };
// };

// const VendorsCard = ({ onAdd }) => {
//   const dispatch = useDispatch();

//   const { vendors } = useSelector((state) => state.vendors);

//   useEffect(() => {
//     dispatch(getVendorsRequest());
//   }, [dispatch]);

//   return (
//     <Card>
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" mb={3} mt={3} ml={2}>
//           <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>Vendors</Typography>

//           <Button variant="contained" onClick={onAdd}>
//             Add Vendor
//           </Button>
//         </Box>

//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Vendor Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {vendors?.map((vendor) => {
//               const ic = getLetterIcon(vendor.vendorName);
//               return (
//                 <TableRow key={vendor._id}>
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                       <Box sx={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: '50%',
//                         backgroundColor: ic.bg,
//                         color: ic.color,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         fontWeight: 700,
//                         fontSize: 15,
//                         flexShrink: 0
//                       }}>
//                         {ic.letter}
//                       </Box>
//                       {vendor.vendorName}
//                     </Box>
//                   </TableCell>
//                   <TableCell>{vendor.email}</TableCell>
//                   <TableCell>{vendor.phone}</TableCell>
//                   <TableCell>{vendor.status}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default VendorsCard;





import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, CardContent, Typography, Button, Box,
  Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import { getVendorsRequest } from 'container/VendorContainer/slice';

const getLetterIcon = (name = '') => {
  const letter = name.trim().charAt(0).toUpperCase() || '?';
  const colors = [
    { bg: '#E8F5EE', color: '#1D9E75' },
    { bg: '#EAF4FF', color: '#2196F3' },
    { bg: '#FFF4DE', color: '#EF9F27' },
    { bg: '#fdecea', color: '#ef4444' },
    { bg: '#ede9fb', color: '#6c5ce7' },
    { bg: '#fde8f3', color: '#e84393' },
  ];
  const index = letter.charCodeAt(0) % colors.length;
  return { letter, ...colors[index] };
};

const VendorsCard = ({ onAdd }) => {
  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(getVendorsRequest());
  }, [dispatch]);

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={3} mt={3} ml={2}>
          <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>Vendors</Typography>
          <Button variant="contained" onClick={onAdd}>Add Vendor</Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vendor Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {vendors?.map((vendor) => { */}
            {vendors?.filter(Boolean).map((vendor) => {
              const ic = getLetterIcon(vendor.vendorName);
              return (
                <TableRow key={vendor._id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{
                        width: 40, height: 40,
                        borderRadius: '50%',
                        backgroundColor: ic.bg,
                        color: ic.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 15,
                        flexShrink: 0
                      }}>
                        {ic.letter}
                      </Box>
                      {vendor.vendorName}
                    </Box>
                  </TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>{vendor.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VendorsCard;