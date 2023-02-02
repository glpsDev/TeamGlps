import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUrl } from '../Config';

const baseURL = fetchUrl;

const UserMasterSearchURL = '/search';
const addUserMasterURL = '/addMeetingMaster';

const columns = [
    { id: 'Sr', label: 'Sr', },
    { id: ' User ID', label: ' User ID' },
    { id: 'Employee Name', label: 'Employee Name' },
    { id: 'Role', label: 'Role', },
    { id: 'Branch Code', label: 'Branch Code' },
    { id: 'Ldap', label: 'Ldap', },
    { id: 'Status', label: 'Status', }
];
function FTPuserMaster() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [FTP, setFtp] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState([]);
    const [addDetails, setAddDetails] = React.useState([]);
    const [editInputes, setEditInputes] = React.useState([]);
    const [searchInputes, setSearchInputs] = React.useState([]);
    
    const [Roledropdown, setRoledropdown] = React.useState('');
    const [Branchdropdown, setBranchDropdown] = React.useState('');
    const [Disable_Userdropdown, setDisable_Userdropdown] = React.useState('');
    const [Ldapdropdown, setLDAPdropdown] = React.useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    }

    const handleCurrentFTP = async (event) => {
        event.preventDefault();
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const Navigate = useNavigate()
    const location = useLocation();
    const index = location.state;
    const onhandlecancel = () => {
        Navigate('/index', { state: index })
    }
    const handleAddInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAddDetails(values => ({ ...values, [name]: value }))
    }
    const onHandleSearchUserMaster = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSearchInputs(values => ({ ...values, [name]: value }))
    }
    const onHandleUerMaster = async (event) => {
    
        event.preventDefault();
        const requestOptionssearch = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
          

            }),
        };
        await fetch(baseURL + UserMasterSearchURL, requestOptionssearch)
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                setSearch(response);
            
            })
    }
    const onHandelAddUserMaster = async (event) => {

        event.preventDefault();

        if (addDetails.UserID== "" || addDetails.UserID == null || addDetails.UserID == undefined) {
            event.preventDefault();

            alert("Please Enter User ID ")
            return;
        }
        if (addDetails.User_Name== "" || addDetails.User_Name == null || addDetails.User_Name == undefined) {
            event.preventDefault();

            alert("Please Enter User Name ")
            return;
        }
        if (addDetails.Email_ID== "" || addDetails.Email_ID == null || addDetails.Email_ID == undefined) {
            event.preventDefault();

            alert("Please Enter Email ID ")
            return;
        }
        if (addDetails.Mobile_No== "" || addDetails.Mobile_No == null || addDetails.Mobile_No == undefined) {
            event.preventDefault();

            alert("Please Enter Mobile No ")
            return;
        }
        if (addDetails.Employee_No== "" || addDetails.Employee_No == null || addDetails.Employee_No == undefined) {
            event.preventDefault();

            alert("Please Enter Employee No ")
            return;
        }
        if (addDetails.Valid_Upto== "" || addDetails.Valid_Upto == null || addDetails.Valid_Upto == undefined) {
            event.preventDefault();

            alert("Please Enter Date ")
            return;
        }
        if (addDetails.Group_Access== "" || addDetails.Group_Access == null || addDetails.Group_Access == undefined) {
            event.preventDefault();

            alert("Please Enter Group Access ")
            return;
        }
        if (Roledropdown == "" || Roledropdown == null || Roledropdown == undefined) {
            event.preventDefault();

            alert("Please Enter Role ")
            return;
        }
       
        if (Branchdropdown == "" || Branchdropdown == null || Branchdropdown == undefined) {
            event.preventDefault();

            alert("Please Enter Branch  ")
            return;
        }
        if (Disable_Userdropdown == "" || Disable_Userdropdown == null || Disable_Userdropdown == undefined) {
            event.preventDefault();

            alert("Please EnterDisable User ")
            return;
        }
        if (Ldapdropdown == "" || Ldapdropdown == null || Ldapdropdown == undefined) {
            event.preventDefault();

            alert("Please Enter Ldap ")
            return;
        }
        const requestOptionsadd = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            
            }),
        };
        await fetch(baseURL + addUserMasterURL, requestOptionsadd)
            .then(response => response.json())
            .then((response) => {
             
                alert(response.Success);
                setAddDetails("");
                setBranchDropdown("");
                setDisable_Userdropdown("");
                setLDAPdropdown("");
                setRoledropdown("")
              
            })
    }
    
    
    return (
        <>
            <div className='usermaster mt-5'>
                <div className='searchBox mt-4'>
                    <div className="card">
                        <div className="card-header">User Master </div>
                        <form onSubmit={onHandleSearchUserMaster}>
                        <div className="card-body py-4">
                            <div className='row'>
                                <div className='col-5'>
                                    <TextField fullWidth id="outlined-basic" label="Employee Name" variant="outlined"
                                        name='Employee_Name'
                                        value={searchInputes.Employee_Name}
                                        onChange={onHandleSearchUserMaster}
                                    />
                                </div>
                                <div className='col-5'>
                                    <TextField fullWidth id="outlined-basic" label=" User ID" variant="outlined"
                                        name='UserID'
                                        value={searchInputes.UserID}
                                        onChange={onHandleSearchUserMaster}
                                    />
                                </div>
                                <div className='col-2 d-flex align-item-center p-1'>
                                    <Button className='bg-orenge ms-3' variant="contained" type="submit"
                                    >Search</Button>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='TableDiv '>
                <div className='border mt-4'>
                    <div>
                        <span className='d-flex justify-content-end items-center p-1'>
                            <Button className='ms-3 bg-orenge' data-bs-toggle="modal" data-bs-target="#AddUserMaster" variant="contained">Add</Button>
                            <Button className='ms-3 bg-orenge' variant="contained" onClick={onhandlecancel}>Exit</Button>
                        </span>
                        <div className='col-12'>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {FTP
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                            <TableCell >{index + 1}</TableCell>
                                                            <TableCell >{row.Shekhar}</TableCell>
                                                            <TableCell >{row.Shekhar}</TableCell>
                                                            <TableCell >{row.Shekhar}</TableCell>
                                                            <TableCell >{row.Shekhar}</TableCell>
                                                            <TableCell >{row.Shekhar}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={FTP.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page} 
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                                <Backdrop
                                    sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={open}
                                    onClick={handleClose}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </Paper>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="modal  fade" id="AddUserMaster" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add User Master</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={onHandelAddUserMaster} >
                            <div className="modal-body">
                                <div className='row g-3'>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="UserID" variant="outlined" autoComplete='off' name="UserID" value={addDetails.UserID || ""} onChange={handleAddInputs} /></div>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="UserName" variant="outlined" autoComplete='off' name="User_Name" value={addDetails.User_Name || ""} onChange={handleAddInputs} /></div>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="Email ID " variant="outlined" autoComplete='off' name="Email_ID" value={addDetails.Email_ID || ""} onChange={handleAddInputs} /></div>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="Mobile No" variant="outlined" autoComplete='off' name="Mobile_No" value={addDetails.Mobile_No || ""} onChange={handleAddInputs} /></div>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="Employee No" variant="outlined" autoComplete='off' name="Employee_No" value={addDetails.Employee_No || ""} onChange={handleAddInputs} /></div>
                                    <div className='col-6'><TextField fullWidth type="date" id="outlined-basic"  variant="outlined" autoComplete='off' name="Valid_Upto" value={addDetails.Valid_Upto|| ""} onChange={handleAddInputs} /></div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Role"
                                                value={Roledropdown}
                                                label="Role"
                                                onChange=''
                                            >
                                                <MenuItem value="......">------Select------</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="Group Access" variant="outlined" autoComplete='off' name="Group_Access" value={addDetails.Group_Access|| ""} onChange={handleAddInputs} /></div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Disable_User</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Disable_User"
                                                value={Disable_Userdropdown}
                                                label="Disable_User"
                                                onChange='handleAddInputs'
                                            >
                                                <MenuItem value="......">YES</MenuItem>
                                                <MenuItem value="......">NO</MenuItem>


                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">LDAP</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="LDAP"
                                                value={Ldapdropdown}
                                                label="LDAP"
                                                onChange=''
                                            >
                                                <MenuItem value="YES">YES</MenuItem>
                                                <MenuItem value="YES">NO</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Branch"
                                                value={Branchdropdown}
                                                label="Branch"
                                                onChange=''
                                            >
                                                <MenuItem value="......">------Select------</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" >Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="EditMeetingmaster" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                        <form 
                        // onSubmit={onHandelEditMeetingCenter}
                        >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Meeting Master</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className='row g-3'>
                                       <div className='col-6'>
                                       
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="STATUS"
                                                    // value={Statusdropdown}
                                                    label="Status"
                                                    // onChange={handleAddStatusSelect}
                                                >
                                                    <MenuItem value="......">------Select------</MenuItem>
                                                    {/* {statusListArray.map((Statusdropdown, Index) =>
                                                        <MenuItem key={Index} value={Statusdropdown}>{Statusdropdown}</MenuItem>
                                                    )}; */}
                                                </Select>
                                            </FormControl>
                                            {/* 
                                        <TextField id="outlined-textarea" label="Status" variant="outlined" autoComplete='off' multiline ref={STATUS} defaultValue={editDetails.status}
                                            name="status" value={editInputes.status} onChange={handleEditInputs}></TextField> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn bg-orenge" data-bs-dismiss="modal">Close</button>
                                    <button type="Submit" className="btn bg-orenge">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </>

    )
}
export default FTPuserMaster;