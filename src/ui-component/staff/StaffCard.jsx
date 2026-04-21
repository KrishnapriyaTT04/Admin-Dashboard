// // import React, { useEffect, useState } from 'react';
// // import {
// //   Grid,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Box,
// //   TextField,
// //   Button,
// //   Avatar
// // } from '@mui/material';

// // import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
// // import axios from 'axios';
// // import AddStaffForm from './AddStaffsForm'; // ✅ import form

// // const StaffCard = () => {
// //   const [staff, setStaff] = useState([]);
// //   const [search, setSearch] = useState('');
// //   const [open, setOpen] = useState(false);

// //   // ✅ FETCH STAFF
// //   const fetchStaff = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/staff');
// //       setStaff(res.data.staff || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchStaff();
// //   }, []);

// //   // ✅ MODAL HANDLERS
// //   const handleOpen = () => setOpen(true);
// //   const handleClose = () => setOpen(false);

// //   // ✅ SEARCH FILTER
// //   const filteredStaff = staff.filter((member) =>
// //     member.email?.toLowerCase().includes(search.toLowerCase()) ||
// //     member.customId?.toString().includes(search)
// //   );

// //   return (
// //     <>
// //       <Grid container spacing={3}>

// //         {/* SEARCH + ADD */}
// //         <Grid item xs={12}>
// //           <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
// //             <CardContent>
// //               <Box display="flex" justifyContent="space-between" alignItems="center">

// //                 {/* SEARCH */}
// //                 <Box display="flex" alignItems="center" gap={1} width="60%">
// //                   <SearchOutlined />
// //                   <TextField
// //                     placeholder="Search staff by ID or email..."
// //                     fullWidth
// //                     size="small"
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                   />
// //                 </Box>

// //                 {/* ADD BUTTON */}
// //                 <Button
// //                   variant="contained"
// //                   startIcon={<PlusOutlined />}
// //                   onClick={handleOpen}
// //                   sx={{
// //                     borderRadius: 5,
// //                     textTransform: 'none',
// //                     backgroundColor: '#38c1b3ff',
// //                     '&:hover': { backgroundColor: '#32a087ff' }
// //                   }}
// //                 >
// //                   Add Staff
// //                 </Button>

// //               </Box>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* TABLE */}
// //         <Grid item xs={12}>
// //           <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
// //             <CardContent>

// //               {/* HEADER */}
// //               <Grid container mb={2} sx={{ fontWeight: 'bold', color: 'gray' }}>
// //                 <Grid item xs={3}>Staff</Grid>
// //                 <Grid item xs={2}>ID</Grid>
// //                 <Grid item xs={2}>Department</Grid>
// //                 <Grid item xs={2}>Phone</Grid>
// //                 <Grid item xs={3}>Email</Grid>
// //               </Grid>

// //               {/* DATA */}
// //               {filteredStaff.map((member) => (
// //                 <Grid
// //                   container
// //                   key={member._id}
// //                   alignItems="center"
// //                   sx={{
// //                     py: 2,
// //                     borderTop: '1px solid #eee',
// //                     '&:hover': { backgroundColor: '#fafafa' }
// //                   }}
// //                 >
// //                   {/* NAME */}
// //                   <Grid item xs={3} display="flex" alignItems="center" gap={2}>
// //                     <Avatar>
// //                       {member.firstName?.charAt(0)}
// //                     </Avatar>
// //                     <Box>
// //                       <Typography fontWeight="bold">
// //                         {member.firstName} {member.lastName}
// //                       </Typography>
// //                     </Box>
// //                   </Grid>

// //                   {/* ID */}
// //                   <Grid item xs={2}>
// //                     <Typography>{member.customId}</Typography>
// //                   </Grid>

// //                   {/* DEPARTMENT */}
// //                   <Grid item xs={2}>
// //                     <Typography>{member.department}</Typography>
// //                   </Grid>

// //                   {/* PHONE */}
// //                   <Grid item xs={2}>
// //                     <Typography>{member.phone}</Typography>
// //                   </Grid>

// //                   {/* EMAIL */}
// //                   <Grid item xs={3}>
// //                     <Typography color="primary">{member.email}</Typography>
// //                   </Grid>
// //                 </Grid>
// //               ))}

// //               {/* EMPTY STATE */}
// //               {filteredStaff.length === 0 && (
// //                 <Typography textAlign="center" mt={3} color="text.secondary">
// //                   No staff found
// //                 </Typography>
// //               )}

// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       {/* ✅ ADD STAFF MODAL */}
// //       <AddStaffForm
// //         open={open}
// //         handleClose={handleClose}
// //         refreshStaff={fetchStaff}
// //       />
// //     </>
// //   );
// // };

// // export default StaffCard;






// // import React, { useEffect, useState } from 'react';
// // import {
// //   Grid,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Box,
// //   TextField,
// //   Button,
// //   Avatar
// // } from '@mui/material';

// // import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getStaff } from 'container/StaffContainer/slice';
// // import AddStaffForm from './AddStaffsForm';

// // const StaffCard = () => {
// //   const dispatch = useDispatch();

// //   const { staffList } = useSelector((state) => state.staff);

// //   const [search, setSearch] = useState('');
// //   const [open, setOpen] = useState(false);

// //   // ✅ Fetch via saga
// //   useEffect(() => {
// //     dispatch(getStaff());
// //   }, [dispatch]);

// //   const handleOpen = () => setOpen(true);
// //   const handleClose = () => setOpen(false);

// // const safeStaffList = Array.isArray(staffList) ? staffList : [];

// // const filteredStaff = safeStaffList.filter((member) =>
// //   member.email?.toLowerCase().includes(search.toLowerCase()) ||
// //   member.customId?.toString().includes(search)
// // );

// //   return (
// //     <>
// //       <Grid container spacing={3}>

// //         {/* SEARCH + ADD */}
// //         <Grid item xs={12}>
// //           <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
// //             <CardContent>
// //               <Box display="flex" justifyContent="space-between" alignItems="center">

// //                 <Box display="flex" alignItems="center" gap={1} width="60%">
// //                   <SearchOutlined />
// //                   <TextField
// //                     placeholder="Search staff by ID or email..."
// //                     fullWidth
// //                     size="small"
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                   />
// //                 </Box>

// //                 <Button
// //                   variant="contained"
// //                   startIcon={<PlusOutlined />}
// //                   onClick={handleOpen}
// //                   sx={{
// //                     borderRadius: 5,
// //                     textTransform: 'none',
// //                     backgroundColor: '#38c1b3ff',
// //                     '&:hover': { backgroundColor: '#32a087ff' }
// //                   }}
// //                 >
// //                   Add Staff
// //                 </Button>

// //               </Box>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* TABLE */}
// //         <Grid item xs={12}>
// //           <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
// //             <CardContent>

// //               <Grid container mb={2} sx={{ fontWeight: 'bold', color: 'gray' }}>
// //                 <Grid item xs={3}>Staff</Grid>
// //                 <Grid item xs={2}>ID</Grid>
// //                 <Grid item xs={2}>Department</Grid>
// //                 <Grid item xs={2}>Phone</Grid>
// //                 <Grid item xs={3}>Email</Grid>
// //               </Grid>

// //               {filteredStaff.map((member) => (
// //                 <Grid container key={member._id} alignItems="center" sx={{ py: 2, borderTop: '1px solid #eee' }}>
// //                   <Grid item xs={3} display="flex" alignItems="center" gap={2}>
// //                     <Avatar>{member.firstName?.charAt(0)}</Avatar>
// //                     <Typography fontWeight="bold">
// //                       {member.firstName} {member.lastName}
// //                     </Typography>
// //                   </Grid>

// //                   <Grid item xs={2}>{member.customId}</Grid>
// //                   <Grid item xs={2}>{member.department}</Grid>
// //                   <Grid item xs={2}>{member.phone}</Grid>
// //                   <Grid item xs={3}>{member.email}</Grid>
// //                 </Grid>
// //               ))}

// //               {filteredStaff.length === 0 && (
// //                 <Typography textAlign="center" mt={3}>
// //                   No staff found
// //                 </Typography>
// //               )}

// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       {/* ❌ remove refreshStaff */}
// //       <AddStaffForm open={open} handleClose={handleClose} />
// //     </>
// //   );
// // };

// // export default StaffCard;








// import React, { useEffect, useState } from 'react';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Avatar
// } from '@mui/material';

// import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { getStaff } from 'container/StaffContainer/slice';
// import AddStaffForm from './AddStaffsForm';

// const StaffCard = () => {
//   const dispatch = useDispatch();

//   const { staffList } = useSelector((state) => state.staff);

//   const [search, setSearch] = useState('');
//   const [open, setOpen] = useState(false);

//   // ✅ Fetch via saga
//   useEffect(() => {
//     dispatch(getStaff());
//   }, [dispatch]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // ✅ SEARCH FILTER
//   const filteredStaff = staff.filter((member) =>
//     member.email?.toLowerCase().includes(search.toLowerCase()) ||
//     member.customId?.toString().includes(search)
//   );

//   return (
//     <>
//       <Grid container spacing={3}>

//         {/* SEARCH + ADD */}
//         <Grid item xs={12}>
//           <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
//             <CardContent>
//               <Box display="flex" justifyContent="space-between" alignItems="center">

//                 <Box display="flex" alignItems="center" gap={1} width="60%">
//                   <SearchOutlined />
//                   <TextField
//                     placeholder="Search staff by ID or email..."
//                     fullWidth
//                     size="small"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                   />
//                 </Box>

//                 <Button
//                   variant="contained"
//                   startIcon={<PlusOutlined />}
//                   onClick={handleOpen}
//                   sx={{
//                     borderRadius: 5,
//                     textTransform: 'none',
//                     backgroundColor: '#38c1b3ff',
//                     '&:hover': { backgroundColor: '#32a087ff' }
//                   }}
//                 >
//                   Add Staff
//                 </Button>

//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* TABLE */}
//         <Grid item xs={12}>
//           <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
//             <CardContent>

//               <Grid container mb={2} sx={{ fontWeight: 'bold', color: 'gray' }}>
//                 <Grid item xs={3}>Staff</Grid>
//                 <Grid item xs={1}>ID</Grid>
//                 <Grid item xs={2}>Department</Grid>
//                 <Grid item xs={2}>Phone</Grid>
//                 <Grid item xs={3}>Email</Grid>
//                 <Grid item xs={1} textAlign="right">Actions</Grid>
//               </Grid>

//               {filteredStaff.map((member) => (
//                 <Grid
//                   container
//                   key={member._id}
//                   alignItems="center"
//                   sx={{
//                     py: 2,
//                     borderTop: '1px solid #eee',
//                     '&:hover': { backgroundColor: '#fafafa' }
//                   }}
//                 >
//                   {/* NAME */}
//                   <Grid item xs={3} display="flex" alignItems="center" gap={2}>
//                     <Avatar>{member.firstName?.charAt(0)}</Avatar>
//                     <Typography fontWeight="bold">
//                       {member.firstName} {member.lastName}
//                     </Typography>
//                   </Grid>

//                   {/* ID */}
//                   <Grid item xs={2}>
//                     <Typography>{member.customId}</Typography>
//                   </Grid>

//                   {/* DEPARTMENT */}
//                   <Grid item xs={2}>
//                     <Typography>{member.department}</Typography>
//                   </Grid>

//                   {/* PHONE */}
//                   <Grid item xs={2}>
//                     <Typography>{member.phone}</Typography>
//                   </Grid>

//                   {/* EMAIL */}
//                   <Grid item xs={3}>
//                     <Typography color="primary">{member.email}</Typography>
//                   </Grid>
//                 </Grid>
//               ))}

//               {filteredStaff.length === 0 && (
//                 <Typography textAlign="center" mt={3}>
//                   No staff found
//                 </Typography>
//               )}

//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* ✅ ADD STAFF MODAL */}
//       <AddStaffForm
//         open={open}
//         handleClose={handleClose}
//         refreshStaff={fetchStaff}
//       />
//     </>
//   );
// };

// export default StaffCard;





import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Avatar
} from '@mui/material';

import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getStaff } from 'container/StaffContainer/slice';
import AddStaffForm from './AddStaffsForm';

const StaffCard = () => {
  const dispatch = useDispatch();

  const { staffList = [], loading } = useSelector((state) => state.staff || {});

  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  /* ================= FETCH STAFF ================= */
  useEffect(() => {
    dispatch(getStaff());
  }, [dispatch]);

  /* ================= MODAL ================= */
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* ================= SAFE DATA ================= */
  const safeStaffList = Array.isArray(staffList) ? staffList : [];

  /* ================= SEARCH ================= */
  const filteredStaff = safeStaffList.filter((member) =>
    member.email?.toLowerCase().includes(search.toLowerCase()) ||
    member.customId?.toString().includes(search)
  );

  return (
    <>
      <Grid container spacing={3}>

        {/* SEARCH + ADD */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">

                {/* SEARCH */}
                <Box display="flex" alignItems="center" gap={1} width="60%">
                  <SearchOutlined />
                  <TextField
                    placeholder="Search staff by ID or email..."
                    fullWidth
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Box>

                {/* ADD BUTTON */}
                <Button
                  variant="contained"
                  startIcon={<PlusOutlined />}
                  onClick={handleOpen}
                  sx={{
                    borderRadius: 5,
                    textTransform: 'none',
                    backgroundColor: '#38c1b3',
                    '&:hover': { backgroundColor: '#32a087' }
                  }}
                >
                  Add Staff
                </Button>

              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* TABLE */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>

              {/* HEADER */}
              <Grid container mb={2} sx={{ fontWeight: 'bold', color: 'gray' }}>
                <Grid item xs={3}>Staff</Grid>
                <Grid item xs={2}>ID</Grid>
                <Grid item xs={2}>Department</Grid>
                <Grid item xs={2}>Phone</Grid>
                <Grid item xs={3}>Email</Grid>
              </Grid>

              {/* LOADING */}
              {loading && (
                <Typography textAlign="center">Loading...</Typography>
              )}

              {/* DATA */}
              {!loading && filteredStaff.map((member) => (
                <Grid
                  container
                  key={member._id}
                  alignItems="center"
                  sx={{
                    py: 2,
                    borderTop: '1px solid #eee',
                    '&:hover': { backgroundColor: '#fafafa' }
                  }}
                >
                  {/* NAME */}
                  <Grid item xs={3} display="flex" alignItems="center" gap={2}>
                    <Avatar>
                      {member.firstName?.charAt(0)}
                    </Avatar>
                    <Typography fontWeight="bold">
                      {member.firstName} {member.lastName}
                    </Typography>
                  </Grid>

                  {/* ID */}
                  <Grid item xs={2}>
                    <Typography>{member.customId}</Typography>
                  </Grid>

                  {/* DEPARTMENT */}
                  <Grid item xs={2}>
                    <Typography>{member.department}</Typography>
                  </Grid>

                  {/* PHONE */}
                  <Grid item xs={2}>
                    <Typography>{member.phone}</Typography>
                  </Grid>

                  {/* EMAIL */}
                  <Grid item xs={3}>
                    <Typography color="primary">{member.email}</Typography>
                  </Grid>
                </Grid>
              ))}

              {/* EMPTY STATE */}
              {!loading && filteredStaff.length === 0 && (
                <Typography textAlign="center" mt={3} color="text.secondary">
                  No staff found
                </Typography>
              )}

            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ADD STAFF MODAL */}
      <AddStaffForm
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default StaffCard;