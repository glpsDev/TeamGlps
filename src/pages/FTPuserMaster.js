import * as React from 'react';
import { useState, useEffect, useHistory, useRef } from "react";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const baseURL = fetchUrl;

const UserMasterSearchURL = '/searchUser';
const addUserMasterURL = '/saveUser';
const EditUserMaster = '/editUser'
const statusListURL = '/statusList';
const fetchBranchdetailURL = '/fetchBranchdetail';
const fetchRoleURL = '/fetchRole';

const columns = [

    { id: ' User ID', label: ' User ID' },
    { id: 'User Name', label: 'User Name' },
    { id: 'Role', label: 'Role', },
    { id: 'Branch', label: 'Branch' },
    { id: 'Ldap Flag', label: 'Ldap Flag', },
    { id: 'Status', label: 'Status', },
    { id: 'Action', label: 'Action', }
];
function FTPuserMaster() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState([]);
    const [addDetails, setAddDetails] = React.useState([]);
    const [editInputes, setEditInputes] = React.useState([]);
    const [searchInputes, setSearchInputs] = React.useState([]);
    const [userId, setUserId] = React.useState([]);
    const [Roledropdown, setRoledropdown] = React.useState('');
    const [Branchdropdown, setBranchDropdown] = React.useState('');
    const [Disable_Userdropdown, setDisable_Userdropdown] = React.useState('');
    const [Ldapdropdown, setLDAPdropdown] = React.useState('');
    const [Statusdropdown, setStatusdropdown] = React.useState('');
    const [statusList, setstatusList] = React.useState([]);
    const USER_ID = React.useRef();
    const USER_NAME = React.useRef();
    const EMAIL_ID = React.useRef();
    const MOBILE_NO = React.useRef();
    const EMPLOYEE_NO = React.useRef();
    const VALID_UPTO = React.useRef();
    const ROLE = React.useRef();
    const GROUP_ACCESS = React.useRef();
    const DISABLE_FLAG = React.useRef();
    const LDAP_FLAG = React.useRef();
    const BRANCH = React.useRef();
    const STATUS = React.useRef();
    const [disableBranch, setdisableBranch] = React.useState(false);
    const [userName, setUserName] = React.useState([])
    const [groupId, setGroupId] = React.useState([])
    const [userActiveFlag, setUserActiveFlag] = React.useState([])
    const [emailID, setEmail] = React.useState([])
    const [mobileNO, setMobileNo] = React.useState([])
    const [ValidUpto, setValidUpto] = React.useState([])
    const [EmployeeNo, setEmployeeNo] = React.useState([])
    const [GroupAccess, setGroupAccess] = React.useState([])
    const [branchlist, setBranchlist] = React.useState([])
    const [rolelist, setROlelist] = React.useState([])


    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    }

    const handleCurrentFTP = async (event) => {
        event.preventDefault();
    }
    const handleAddRoleSelect = (event) => {
        setRoledropdown(event.target.value)
        if (Roledropdown == "Branch") {
            setdisableBranch(true)
        }
    }

    const UserMasterview = (userId, userName, Roledropdown, groupId, Ldapdropdown, userActiveFlag, emailID, mobileNO, employeeNO, validUpTo, GroupAccess, Disable_Userdropdown) => () => {
        setUserId(userId);
        setUserName(userName);
        setRoledropdown(Roledropdown);
        setGroupId(groupId);
        setLDAPdropdown(Ldapdropdown);
        setUserActiveFlag(userActiveFlag);
        setEmail(emailID);
        setMobileNo(mobileNO);
        setValidUpto(validUpTo);
        setGroupAccess(GroupAccess);
        setEmployeeNo(employeeNO);
        setDisable_Userdropdown(Disable_Userdropdown);
        setStatusdropdown(Statusdropdown);
    }
    const UserMasterEdit = (userId, userName, Roledropdown, groupId, Ldapdropdown, userActiveFlag, emailID, mobileNO, employeeNO, validUpTo, GroupAccess, Disable_Userdropdown) => () => {
        setUserId(userId)
        setUserName(userName);
        setRoledropdown(Roledropdown);
        setGroupId(groupId);
        setLDAPdropdown(Ldapdropdown);
        setUserActiveFlag(userActiveFlag);
        setEmail(emailID);
        setMobileNo(mobileNO);
        setValidUpto(validUpTo);
        setGroupAccess(GroupAccess);
        setEmployeeNo(employeeNO);
        setDisable_Userdropdown(Disable_Userdropdown);
        setStatusdropdown(Statusdropdown);

    }
    const handleAddBranchSelect = (event) => {
        setBranchDropdown(event.target.value)

    }
    const handleAddLdapSelect = (event) => {
        setLDAPdropdown(event.target.value)
    }
    const handleAddDisable_userSelect = (event) => {
        setDisable_Userdropdown(event.target.value)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleAddStatusSelect = (event) => {
        setStatusdropdown(event.target.value)
    }
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
    const onHandlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSearchInputs(values => ({ ...values, [name]: value }))
    }
    const handleEditInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditInputes(values => ({ ...values, [name]: value }))

    }

    const onHandleSearchUserMaster = async (event) => {

        event.preventDefault();
        const requestOptionssearch = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userId": searchInputes.UserID,
                "userName": searchInputes.User_Name,

            }),
        };
        await fetch(baseURL + UserMasterSearchURL, requestOptionssearch)
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                setSearch(response);

            })
    }
    useEffect(() => {
        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            }),
        };
        fetch(baseURL + statusListURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                setstatusList(response)
                handleClose()
            })

    }, []);
    const statusListArray = Object.values(statusList);

    const onHandelAddUserMaster = async (event) => {
        event.preventDefault();

        // if (addDetails.UserID === "" || addDetails.UserID === null || addDetails.UserID === undefined) {
        //     event.preventDefault();

        //     alert("Please Enter User ID ")
        //     return;
        // }
        // if (addDetails.User_Name == "" || addDetails.User_Name == null || addDetails.User_Name == undefined) {
        //     event.preventDefault();

        //     alert("Please Enter User Name ")
        //     return;
        // }
        // if (addDetails.Email_ID == "" || addDetails.Email_ID == null || addDetails.Email_ID == undefined) {
        //     event.preventDefault();

        //     alert("Please Enter Email ID ")
        //     return;
        // }
        // if (addDetails.Mobile_No == "" || addDetails.Mobile_No == null || addDetails.Mobile_No == undefined) {
        //     event.preventDefault();

        //     alert("Please Enter Mobile No ")
        //     return;
        // }
        // if (addDetails.Employee_No == "" || addDetails.Employee_No == null || addDetails.Employee_No == undefined) {
        //     event.preventDefault();

        //     alert("Please Enter Employee No ")
        //     return;
        // }
        // if (addDetails.Valid_Upto == "" || addDetails.Valid_Upto == null || addDetails.Valid_Upto == undefined) {
        //     event.preventDefault();

        //     alert("Please Enter Date ")
        //     return;
        // }
        // if (addDetails.Group_Access == "" || addDetails.Group_Access == null || addDetails.Group_Access == undefined) {
        //     event.preventDefault();

        //     alert("Please Enter Group Access ")
        //     return;
        // }
        // if (Roledropdown == "" || Roledropdown == null || Roledropdown == undefined) {
        //     event.preventDefault();

        //     alert("Please Enter Role ")
        //     return;
        // }

        // if (Branchdropdown == "" || Branchdropdown == null || Branchdropdown == undefined) {
        //     event.preventDefault();

        //     alert("Please Enter Branch  ")
        //     return;
        // }
        // if (Disable_Userdropdown == "" || Disable_Userdropdown == null || Disable_Userdropdown == undefined) {
        //     event.preventDefault();

        //     alert("Please EnterDisable User ")
        //     return;
        // }
        // if (Ldapdropdown == "" || Ldapdropdown == null || Ldapdropdown == undefined) {
        //     event.preventDefault();

        //     alert("Please Enter Ldap ")
        //     return;
        // }
        // if (Statusdropdown == "" || Statusdropdown == null || Statusdropdown == undefined) {
        //     event.preventDefault();

        //     alert("Please Enter Status ")
        //     return;
        // }

        const requestOptionsadd = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userId": addDetails.UserID,
                "username": addDetails.UserName,
                "password": "password",
                "mobileNO": addDetails.MobileNo,
                "emailID": addDetails.EmailID,
                "status": "",
                "employeeNO": addDetails.EmployeeNo,
                "validUpTo": addDetails.ValidUpto,
                "userDisableFlag": Disable_Userdropdown,
                "userLDAPFlag": Ldapdropdown,
                "allBranchesAccess": "O"

            }),
        };
        await fetch(baseURL + addUserMasterURL, requestOptionsadd)
            .then(response => response.json())
            .then((response) => {

                alert(response.Success);
                // setAddDetails("");
                setBranchDropdown("");
                setDisable_Userdropdown("");
                setLDAPdropdown("");
                setRoledropdown("");
                setStatusdropdown("");
            })

    }

    const onHandelEditUserMaster = async (event) => {
        event.preventDefault();
        if (editInputes.User_Name == null) {
            editInputes.User_Name = userName
        }
        if (editInputes.Mobile_No == null) {
            editInputes.Mobile_No = mobileNO
        }
        if (editInputes.Email_ID == null) {
            editInputes.Email_ID = emailID
        }
        if (editInputes.Valid_Upto == null) {
            editInputes.Valid_Upto = ValidUpto
        }
        const requestOptionsedit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userId": userId,
                "username": editInputes.User_Name,
                "mobileNO": editInputes.Mobile_No,
                "emailID": editInputes.Email_ID,
                "status": Statusdropdown,
                "employeeNO": EmployeeNo,
                "validUpTo": editInputes.Valid_Upto,
                "userDisableFlag": Disable_Userdropdown,
                "userLDAPFlag": Ldapdropdown,
                "allBranchesAccess": "O"
            }),
        };
        await fetch(baseURL + EditUserMaster, requestOptionsedit)
            .then(response => response.json())
            .then((response) => {
                alert(response.Success)
                setBranchDropdown("");
                setDisable_Userdropdown("");
                setLDAPdropdown("");
                setRoledropdown("");
                setStatusdropdown("");
                setEditInputes('');
                handleClose()
            })
    }

    useEffect(() => {
        const requestOptionsedit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

            }),
        };
        fetch(baseURL + fetchBranchdetailURL, requestOptionsedit)
            .then(response => response.json())
            .then((response) => {
                setBranchlist(response);
            })
    }, [])
    const BranchList = Object.values(branchlist);

    useEffect(() => {
        const requestOptionsedit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

            }),
        };
        fetch(baseURL + fetchRoleURL, requestOptionsedit)
            .then(response => response.json())
            .then((response) => {
                setROlelist(response);
            })
    }, []);

    const RoleList = Object.values(rolelist);

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
                                        <TextField fullWidth id="outlined-basic" label=" User ID" variant="outlined"
                                            name='UserID'
                                            value={searchInputes.UserID}
                                            onChange={onHandlechange}
                                        />
                                    </div>
                                    <div className='col-5'>
                                        <TextField fullWidth id="outlined-basic" label="User Name" variant="outlined"
                                            name='User_Name'
                                            value={searchInputes.User_Name}
                                            onChange={onHandlechange}
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
                                            {search
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                            <TableCell >{row.userId}</TableCell>
                                                            <TableCell >{row.userName}</TableCell>
                                                            <TableCell >{row.groupId}</TableCell>
                                                            <TableCell >{row.branchCode}</TableCell>
                                                            <TableCell >{row.userLDAPFlag}</TableCell>
                                                            <TableCell >{row.status}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.emailID}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.mobileNO}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.employeeNO}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.validUpTo}</TableCell>                                                            <TableCell sx={{ display: "none" }}>{row.employeeNO}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.GroupAccess}</TableCell>                                                            <TableCell sx={{ display: "none" }}>{row.Roledropdown}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.Disable_Userdropdown}</TableCell>
                                                            <TableCell sx={{ display: "none" }}>{row.Statusdropdown}</TableCell>

                                                            <TableCell  >
                                                                <FontAwesomeIcon className='me-3 fs-5 text-orenge cursor-pointer' data-bs-toggle="modal"
                                                                    data-bs-target="#ViewMeetingmaster" variant="contained" icon={faEye}
                                                                    onClick={UserMasterview(row.userId, row.userName, row.userRoleId, row.groupId, row.Ldapdropdown, row.userActiveFlag, row.emailID, row.mobileNO, row.employeeNO, row.validUpTo, row.GroupAccess, row.Disable_Userdropdown, row.Statusdropdown)}
                                                                />
                                                                <FontAwesomeIcon className='me-3 fs-5 text-orenge cursor-pointer'
                                                                    data-bs-toggle="modal" data-bs-target="#EditMeetingmaster" variant="contained"
                                                                    onClick={UserMasterEdit(row.userId, row.userName, row.userRoleId, row.groupId, row.Ldapdropdown, row.userActiveFlag, row.emailID, row.mobileNO, row.employeeNO, row.validUpTo, row.GroupAccess, row.Disable_Userdropdown, row.Statusdropdown)}
                                                                    icon={faPenToSquare} />
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[3, 5, 10, 25, 100]}
                                    component="div"
                                    count={search.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
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
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="UserID" variant="outlined" autoComplete='off' name="UserID" value={addDetails.UserID} onChange={handleAddInputs} /></div>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="UserName" variant="outlined" autoComplete='off' name="UserName" value={addDetails.UserName} onChange={handleAddInputs} /></div>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="Email ID " variant="outlined" autoComplete='off' name="EmailID" value={addDetails.EmailID} onChange={handleAddInputs} /></div>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="Mobile No" variant="outlined" autoComplete='off' name="MobileNo" value={addDetails.MobileNo} onChange={handleAddInputs} /></div>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="Employee No" variant="outlined" autoComplete='off' name="EmployeeNo" value={addDetails.EmployeeNo} onChange={handleAddInputs} /></div>
                                    <div className='col-6'><TextField type="date" fullWidth id="outlined-basic" label="Valid Upto" variant="outlined" autoComplete='off' name="ValidUpto" value={addDetails.ValidUpto} onChange={handleAddInputs} ></TextField></div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Role"
                                                value={Roledropdown}
                                                label="Role"
                                                onChange={handleAddRoleSelect}
                                            >
                                                {RoleList.map((value, index) => {
                                                    return (
                                                        <MenuItem key={index} value={value}>
                                                            {value}
                                                        </MenuItem>
                                                    )
                                                })}


                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-6'><TextField fullWidth id="outlined-basic" label="Group Access" variant="outlined" autoComplete='off' name="Group_Access" value={addDetails.Group_Access || ""} onChange={handleAddInputs} /></div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Disable Flag</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Disable_User"
                                                value={Disable_Userdropdown}
                                                label="Disable_User"
                                                onChange={handleAddDisable_userSelect}
                                            >
                                                <MenuItem value="yes" >Y</MenuItem>
                                                <MenuItem value="no">N</MenuItem>


                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">LDAP Flag</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="LDAP Flag"
                                                value={Ldapdropdown}
                                                label="LDAP Flag"
                                                onChange={handleAddLdapSelect}
                                            >
                                                <MenuItem value="YES">Y</MenuItem>
                                                <MenuItem value="no" >N</MenuItem>
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
                                                onChange={handleAddBranchSelect}
                                                disabled={disableBranch ? true : false}
                                            >
                                                {BranchList.map((value, index) => {
                                                    return (
                                                        <MenuItem key={index} value={value}>
                                                            {value}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Status"
                                                value={Statusdropdown}
                                                label="Status"
                                                onChange={handleAddStatusSelect}
                                            >
                                                <MenuItem value="......"></MenuItem>
                                                <MenuItem value="yes" >Y</MenuItem>
                                                <MenuItem value="no">N</MenuItem>
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
                        onSubmit={onHandelEditUserMaster}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Meeting Master</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='row g-3'>
                                    <div className='col-6'> <TextField id="outlined-basic" fullWidth label="UserID" variant="filled" autoComplete='off' name='userID' value={userId} InputProps={{ readOnly: true, }} /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" fullWidth label="User Name" variant="outlined" autoComplete='off' multiline ref={USER_NAME} defaultValue={userName}
                                        name="User_Name" value={editInputes.User_Name} onChange={handleEditInputs}></TextField></div>
                                    <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Email Id" variant="outlined" autoComplete='off' multiline ref={EMAIL_ID} defaultValue={emailID}
                                        name="Email_ID" value={editInputes.Email_ID} onChange={handleEditInputs}></TextField></div>
                                    <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Mobile No" variant="outlined" autoComplete='off' multiline ref={MOBILE_NO} defaultValue={mobileNO}
                                        name="Mobile_No" value={editInputes.Mobile_No} onChange={handleEditInputs}></TextField></div>
                                    <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Employee No" variant="filled" autoComplete='off' multiline ref={EMPLOYEE_NO} defaultValue={EmployeeNo} InputProps={{ readOnly: true, }} /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Valid Upto" variant="outlined" autoComplete='off' multiline ref={VALID_UPTO} defaultValue={ValidUpto}
                                        name="Valid_Upto" value={editInputes.Valid_Upto} onChange={handleEditInputs}></TextField></div>

                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Role"
                                                value={Roledropdown}
                                                label="Role"
                                                onChange={handleAddRoleSelect}
                                            >
                                                {RoleList.map((value, index) => {
                                                    return (
                                                        <MenuItem key={index} value={value}>
                                                            {value}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    {/* <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Group Access" variant="filled" autoComplete='off' multiline ref={GROUP_ACCESS} defaultValue={editDetails.Group_Access} InputProps={{ readOnly: true, }} /></div> */}
                                    <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Group Access" variant="outlined" autoComplete='off' multiline ref={GROUP_ACCESS} defaultValue={GroupAccess}
                                        name="Group_Access" value={editInputes.Group_Access} onChange={handleEditInputs}></TextField></div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label"> Disable Flag</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Disable_flag"
                                                value={Disable_Userdropdown}
                                                label="Disable Flag"
                                                onChange={handleAddStatusSelect}
                                            >
                                                <MenuItem value="......">------Select------</MenuItem>
                                                <MenuItem value="yes">YES</MenuItem>
                                                <MenuItem value="No">NO</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label"> Ldap Flag</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Ldap_flag"
                                                value={Ldapdropdown}
                                                label="Ldap Flag"
                                                onChange={handleAddStatusSelect}
                                            >
                                                <MenuItem value="......">------Select------</MenuItem>
                                                <MenuItem value="yes">Y</MenuItem>
                                                <MenuItem value="No">N</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label"> Branch</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Branch"
                                                value={Statusdropdown}
                                                label="Branch"
                                                onChange={handleAddStatusSelect}
                                            >
                                                {BranchList.map((value, index) => {
                                                    return (
                                                        <MenuItem key={index} value={value}>
                                                            {value}
                                                        </MenuItem>
                                                    )
                                                })}

                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-6'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="Status"
                                                value={Statusdropdown}
                                                label="Status"
                                                onChange={handleAddStatusSelect}
                                            >
                                                <MenuItem value="......">------Select------</MenuItem>
                                                <MenuItem value="Y">Y</MenuItem>
                                                <MenuItem value="N">N</MenuItem>

                                            </Select>
                                        </FormControl>
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
            <div className="modal fade" id="ViewMeetingmaster" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">View Meeting Master</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row g-3'>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="UserID" value={userId} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="User Name" value={userName} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Email ID" value={emailID} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Mobile No" value={mobileNO} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Employee No" value={EmployeeNo} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Valid Upto" value={ValidUpto} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Role" value={Roledropdown} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Group Access" value={GroupAccess} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Disable Flag" value={Disable_Userdropdown} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Ldap Flag" value={Ldapdropdown} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Branch" value={Statusdropdown} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                <div className='col-6'> <TextField id="outlined-basic" fullWidth label="Status" value={Statusdropdown} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default FTPuserMaster;