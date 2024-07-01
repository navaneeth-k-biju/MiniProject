import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [

  createData(['rice,','wheat'], 159, '22/03/2003', 'claimed', 4.0),
  createData(['rice,','wheat'], 237, '19/04/2003', 'claimed', 4.3),
  createData(['rice,','wheat'], 262, '22/05/2003', 'claimed', 6.0),
  createData(['rice,','wheat'], 305, '10/06/2003', 'not claimed', 4.3),
  createData(['rice,','wheat'], 356, '22/03/2003', 'claimed', 3.9),
];

export default function BasicTable() {
  useEffect(()=>{
    const form = new FormData()
    const head=JSON.parse(localStorage.getItem('login'))
    form.append('id',head.userid)
    fetch('http://localhost:3000/rationHistory', {
      method: "POST",
      body: form // formData should be the actual data you want to send
  }).then((res) => {
      // Check if the response is successful
      if (!res.ok) {
          throw new Error('Network response was not ok');
      }
      // Parse the response body
      return res.json(); // or res.text(), depending on the response type
  }).then((data) => {
      console.log(data)
  }).catch((err) => {
      console.error('Fetch error:', err);
  });
  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  >Items</TableCell>
            <TableCell align="left"> Quantity</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">prize</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}