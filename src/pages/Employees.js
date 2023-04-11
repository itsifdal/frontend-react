/* eslint-disable camelcase */
// import { Link as RouterLink } from 'react-router-dom';
import { sentenceCase } from 'change-case';
import React, { useEffect,useState } from "react";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Modal,
  FormControl,
  TextField,
  MenuItem,
  Box
} from '@mui/material';

// components
import axios from 'axios';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';


// Style box
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

// ----------------------------------------------------------------------
export default function Employees() {

  //
  const [user, setUser] = useState('');
  const [emps, setEmps] = useState('');

  // fetch api
  const getEmpData = async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/emp`).then((response) => {
      setEmps(response.data);
    });
  }

  useEffect(() => {
    getEmpData()
  }, [])

  // localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  console.log(user)

  return (
    <Page title="Employees">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employees
          </Typography>
          <Button variant="contained"  startIcon={<Iconify icon="eva:plus-fill"/>}>
            New emp
          </Button>
        </Stack>
        <ToastContainer pauseOnFocusLoss={false}/>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>NAMA</TableCell>
                    <TableCell>TELFON</TableCell>
                    <TableCell>ADDRESS</TableCell>
                    <TableCell>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(emps)
                  ? emps.map(emp => ( 
                  <TableRow
                    hover
                    tabIndex={-1}
                    role="checkbox"
                    key={emp.id}
                  >
                    <TableCell align="left">{emp.name}</TableCell>
                    <TableCell align="left">{emp.phone}</TableCell>
                    <TableCell align="left" component="td" >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                          {emp.address} 
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Button variant="contained" color="error" size="small" margin={2} startIcon={<Iconify icon="eva:trash-fill"/> } 
                        data-name={emp.name} 
                        data-id={emp.id}  > 
                        Delete
                      </Button>
                      </TableCell>
                  </TableRow>
                  )) : null} 
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
