
import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Container ,Paper, Pagination } from '@mui/material';


interface DataTableProps {
  data: any[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data,currentPage,itemsPerPage, onPageChange}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };
  return (
    <Container component={Paper}>
        <Table >
      <TableHead>
        <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Address</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayedData.map((list, index) => (
          <TableRow key={index}>
            <TableCell>{index+1}</TableCell>
            <TableCell>{list.first_name}</TableCell>
            <TableCell>{list.last_name}</TableCell>
            <TableCell>{list.email}</TableCell>
            <TableCell>{list.gender}</TableCell>
            <TableCell>{list.mobile}</TableCell>
            <TableCell>{list.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Pagination
    
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Container>
  );
};

export default DataTable;
