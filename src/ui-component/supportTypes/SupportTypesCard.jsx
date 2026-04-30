import React from 'react';
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

const SupportTypesCard = ({ onAdd }) => {
  const supportTypes = [
    { name: 'Technical Support' },
    { name: 'Billing Support' }
  ];

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h5">Support Types</Typography>
          <Button variant="contained" onClick={onAdd}>
            Add Support Type
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {supportTypes.map((type, i) => (
              <TableRow key={i}>
                <TableCell>{type.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SupportTypesCard;