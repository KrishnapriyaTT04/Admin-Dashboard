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

// import { getDepartmentsRequest } from 'container/departmentsContainer/slice';

// const DepartmentsCard = ({ onAdd }) => {
//   const dispatch = useDispatch();

//   const { departments, loading } = useSelector((state) => state.departments);

//   useEffect(() => {
//     dispatch(getDepartmentsRequest());
//   }, [dispatch]);

//   return (
//     <Card>
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" mb={3}>
//           <Typography variant="h5">Departments</Typography>

//           <Button variant="contained" onClick={onAdd}>
//             Add Department
//           </Button>
//         </Box>

//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {departments?.map((dept) => (
//               <TableRow key={dept._id}>
//                 <TableCell>{dept.departmentName}</TableCell>
//                 <TableCell>{dept.description}</TableCell>
//                 <TableCell>{dept.status}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {loading && (
//           <Typography mt={2}>Loading...</Typography>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default DepartmentsCard;






import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import FemaleIcon from '@mui/icons-material/Female';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import { getDepartmentsRequest } from 'container/departmentsContainer/slice';

const departmentIcons = {
  cardiology:    <FavoriteIcon sx={{ fontSize: 22, color: '#ef4444' }} />,
  orthopaedics:  <AccessibilityNewIcon sx={{ fontSize: 22 }} />,
  orthopedics:   <AccessibilityNewIcon sx={{ fontSize: 22 }} />,
  neurology:     <PsychologyIcon sx={{ fontSize: 22, color: '#6c5ce7' }} />,
  ophthalmology: <VisibilityIcon sx={{ fontSize: 22 }} />,
  paediatrics:   <ChildCareIcon sx={{ fontSize: 22 }} />,
  pediatrics:    <ChildCareIcon sx={{ fontSize: 22 }} />,
  dental:        <MedicalServicesIcon sx={{ fontSize: 22 }} />,
  'general opd': <LocalHospitalIcon sx={{ fontSize: 22 }} />,
  dermatology:   <ScienceIcon sx={{ fontSize: 22 }} />,
  pathology:     <BiotechIcon sx={{ fontSize: 22 }} />,
  gynaecology:   <FemaleIcon sx={{ fontSize: 22, color: '#e84393' }} />,
  gynecology:    <FemaleIcon sx={{ fontSize: 22, color: '#e84393' }} />,
  pharmacy:      <MedicationIcon sx={{ fontSize: 22 }} />,
  radiology:     <BiotechIcon sx={{ fontSize: 22 }} />,
  default:       <LocalHospitalIcon sx={{ fontSize: 22, color: '#1D9E75' }} />
};

const DepartmentsCard = ({ onAdd }) => {
  const dispatch = useDispatch();

  const { departments, loading } = useSelector((state) => state.departments);

  useEffect(() => {
    dispatch(getDepartmentsRequest());
  }, [dispatch]);

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={3} mt={3} ml={2}>
          <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>Departments</Typography>

          <Button variant="contained" onClick={onAdd}>
            Add Department
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {departments?.map((dept) => (
              <TableRow key={dept._id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {departmentIcons[dept.departmentName?.toLowerCase().trim()] || departmentIcons.default}
                    </Box>
                    {dept.departmentName}
                  </Box>
                </TableCell>
                <TableCell>{dept.description}</TableCell>
                <TableCell>{dept.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {loading && (
          <Typography mt={2}>Loading...</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DepartmentsCard;