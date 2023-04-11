/* eslint-disable camelcase */
// import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect,useState } from "react";

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
  Box
} from '@mui/material';

// components
import axios from 'axios';
import Page from '../components/Page';
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

  const [id, setEmpId]        = useState('');
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [address, setAddress] = useState('');

  //
  const [open, setOpen]  = useState(false);
  const [openDel, setOpenDel]  = useState(false);
  const [openUpd, setOpenUpd]  = useState(false);

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

  let button;
  if (user && user.role === 'super admin') {
    button = <Button variant="contained"  startIcon={<Iconify icon="eva:plus-fill"/>} onClick={handleOpenModalCreate} >
               New Employee
            </Button>
  }

  const data = {
    name, email, phone, address
  }

  // Create
  function handleOpenModalCreate() {
    return setOpen(true);
  }
  const handleCloseModalCreate = () => setOpen(false);
  const handleSubmitCreate = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/create`, data).then(() => {
      getEmpData()
      setOpen(false)
    });
  }

  // Update
  const handleOpenModalUpdate  = (e) => {
    setEmpId(e.target.getAttribute("data-id"))
    setName(e.target.getAttribute("data-name"))
    setEmail(e.target.getAttribute("data-email"))
    setPhone(e.target.getAttribute("data-phone"))
    setAddress(e.target.getAttribute("data-address"))
    setOpenUpd(true);
  }
  const handleCloseModalUpdate = () => setOpenUpd(false);
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const data = {
      id,name,email,phone,address
    }
    axios.put(`${process.env.REACT_APP_BASE_URL}/update`, data).then(()=> {
      getEmpData()
      setOpenUpd(false)
    })
    
  }

  // Delete
  const handleOpenModalDelete  = (e) => {
    setEmpId(e.target.getAttribute("data-id"))
    setOpenDel(true);
  }
  const handleCloseModalDelete = () => setOpenDel(false);
  const handleSubmitDelete = (e) => {
    e.preventDefault();
    axios.delete(`${process.env.REACT_APP_BASE_URL}/delete/${id}`).then(() => {
      getEmpData()
      setOpenDel(false)
    });
  }

  return (
    <Page title="Employees">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employees
          </Typography>
         {button}
        </Stack>
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
                      <Button variant="contained" color="success" size="small" startIcon={<Iconify icon="eva:pencil-fill"/> } 
                        data-id={emp.id}
                        data-name={emp.name}
                        data-email={emp.email} 
                        data-phone={emp.phone} 
                        data-address={emp.address}
                        onClick={handleOpenModalUpdate}> 
                        Update
                      </Button> 
                      <Button variant="contained" color="error" size="small" margin={2} startIcon={<Iconify icon="eva:trash-fill"/> }  
                        data-id={emp.id}  
                        onClick={handleOpenModalDelete}
                      > 
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
        <div>
          <Modal
            open={open}
            onClose={handleCloseModalCreate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create User
              </Typography>
              <FormControl fullWidth >
                <TextField required id="outlined-required name"  margin="normal" label="Name"  name="name" value={name} onChange={(e) => {setName(e.target.value)}} />
                <TextField required id="outlined-required email" margin="normal" label="Email"  name="email" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <TextField required id="outlined-required phone"  margin="normal" label="Phone"  name="phone" value={phone} onChange={(e) => {setPhone(e.target.value)}} />
                <TextField required id="outlined-required address"  margin="normal" label="Address"  name="address" value={address} onChange={(e) => {setAddress(e.target.value)}} />
                <Button variant="contained" type="submit" onClick={handleSubmitCreate}>Save</Button>
              </FormControl>
            </Box>
          </Modal>
        </div>
        <div>
          <Modal
            open={openUpd}
            onClose={handleCloseModalUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update row
              </Typography>
              <FormControl fullWidth >
                <TextField required id="outlined-required name"  margin="normal" label="Name"  name="name" value={name} onChange={(e) => {setName(e.target.value)}} />
                <TextField required id="outlined-required email" margin="normal" label="Email"  name="email" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <TextField required id="outlined-required phone"  margin="normal" label="Phone"  name="phone" value={phone} onChange={(e) => {setPhone(e.target.value)}} />
                <TextField required id="outlined-required address"  margin="normal" label="Address"  name="address" value={address} onChange={(e) => {setAddress(e.target.value)}} />
                <Button variant="contained" type="submit" onClick={handleSubmitUpdate}>Update</Button>
              </FormControl>
            </Box>
          </Modal>
        </div>
        <div>
          <Modal
            open={openDel}
            onClose={handleCloseModalDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={5}>
                Delete row
              </Typography>
              <FormControl fullWidth >
                <Button variant="contained" type="submit" onClick={handleSubmitDelete}>Delete</Button>
              </FormControl>
            </Box>
          </Modal>
        </div>
      </Container>
    </Page>
  );
}
