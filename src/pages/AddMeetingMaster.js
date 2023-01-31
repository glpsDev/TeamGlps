
import * as React from 'react';
import { useState, useEffect, useHistory, useRef } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchUrl } from '../Config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const columns = [
    { id: 0, label: 'Meeting Center Code' },
    { id: 1, label: 'Meeting Center Name', },
    { id: 2, label: 'MCL URN', },
    { id: 3, label: 'AMCL URN', },
    { id: 4, label: 'CREC Name', },
    { id: 5, label: 'Status', },
    { id: 6, label: 'Action', },
];

const baseURL = fetchUrl;

const MeetingCenterSearchURL = '/search';
const addMeetingMasterURL = '/addMeetingMaster';
const editMeetingCenter = '/edit';
const cityCodeListURL = '/cityCodeList';
const branchCodeListURL = '/branchCodeList';
const areaCodeListURL = '/areaCodeList';
const statusListURL = '/statusList';

function AddMeetingMaster() {

    const [page, setPage] = React.useState(0);
    const [open, setOpen] = React.useState(false); 
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState([]);
    const [addDetails, setAddDetails] = React.useState([]);
    const [editDetails, setEditDetails] = React.useState([]);
    const [editInputes, setEditInputes] = React.useState([]);
    const [searchInputes, setSearchInputs] = React.useState([]);
    // const [data, setData] = React.useState([]);
    
    const [cityCodeList, setcityCodeList] = React.useState({});
    const [branchCodeList, setbranchCodeList] = React.useState([]);
    const [areaCodeList, setareaCodeList] = React.useState([]);
    const [statusList, setstatusList] = React.useState([]);
    const [citycodedropdown, setcitycodedropdown] = React.useState('');
    const [branchCodedropdown, setBranchCodeDropdown] = React.useState('');
    const [areadropdown, setAreaCodedropdown] = React.useState('');
    const [Statusdropdown, setStatusdropdown] = React.useState('');
    const [tableData, setTableData] = useState([]);
    const [inputsearchValue, setinputsearchValue] = useState();
    const AREA_CODE = React.useRef();
    const BRANCH_CODE = React.useRef();
    const CITY_CODE = React.useRef();
    const NAME = React.useRef();
    const MEETING_CENTER_CODE = React.useRef();
    const AMCL_URN_NO = React.useRef();
    const CREC_EMPLOYEE_ID = React.useRef();
    const MCL_URN_NO = React.useRef();
    const STATUS = React.useRef();
    const REPAYMENT_DAY = React.useRef();
    const REPAYMENT_TIME = React.useRef();
    const REPAYMENT_SLOT = React.useRef();
    const BATCH_COUNT = React.useRef();
    const ADDRESS = React.useRef();
    const MCL_LEAD_ID = React.useRef();
    const FOS_MC_REF_NO = React.useRef();
    const MCL_CIS_NO = React.useRef();
    const GPS_LAT = React.useRef();
    const GPS_LON = React.useRef();
    const AMCL_LEAD_ID = React.useRef();

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    }


    const meetingMasterEdit = editId => () => {
        setEditDetails(search[editId])

    }

    const meetingMasterview = viewId => () => {
        setEditDetails(search[viewId])
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleAddInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAddDetails(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        handleToggle()
        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            }),
        };
        fetch(baseURL + cityCodeListURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                setcityCodeList(response)
                handleClose()
            })
    }, []);
    const cityCodeListArray = Object.values(cityCodeList);


    useEffect(() => {
        handleToggle()
        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            }),
        };
        fetch(baseURL + branchCodeListURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                setbranchCodeList(response)
                handleClose()
            })
    }, []);
    const branchCodeListArray = Object.values(branchCodeList);


    useEffect(() => {
        handleToggle()
        const requestOptionsid = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            }),
        };
        fetch(baseURL + areaCodeListURL, requestOptionsid)
            .then(response => response.json())
            .then((response) => {
                setareaCodeList(response)
                handleClose()
            })
    }, []);
    const areaCodeListArray = Object.values(areaCodeList);


    useEffect(() => {
        handleToggle()
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


    const handleSerarchMetingMaster = async (event) => {
        handleToggle()
        event.preventDefault();
        const requestOptionssearch = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "meetingCenterCode": searchInputes.meetingCenterCode,
                "name": searchInputes.meetingCenterName,
                "crecName": searchInputes.CrecName,
                "branchCode": branchCodedropdown

            }),
        };
        await fetch(baseURL + MeetingCenterSearchURL, requestOptionssearch)
            .then(response => response.json())
            .then((response) => {
                setSearch(response);
                setTableData(response);
                setBranchCodeDropdown("")
                handleClose()
            })
    }


    const onHandelAddMeetingCenter = async (event) => {
        handleToggle()
        event.preventDefault();

        if (addDetails.NAME == "" || addDetails.NAME == null || addDetails.NAME == undefined) {
            event.preventDefault();

            alert("Please Enter Name ")
            return;
        }
        if (areadropdown == "" || areadropdown == null || areadropdown == undefined) {
            alert("Please Enter Area Code")
            return;
        }
        if (branchCodedropdown == "" || branchCodedropdown == null || branchCodedropdown == undefined) {
            alert("Please Enter Branch Code")
            return;
        }
        if (citycodedropdown == "" || citycodedropdown == null || citycodedropdown == undefined) {
            alert("Please Enter City Code ")
            return;
        }

        if (addDetails.AMCL_URN_NO == "" || addDetails.AMCL_URN_NO == null || addDetails.AMCL_URN_NO == undefined) {
            alert("Please Enter AMCL URN Number")
            return;
        }
        if (addDetails.CREC_EMPLOYEE_ID == "" || addDetails.CREC_EMPLOYEE_ID == null || addDetails.CREC_EMPLOYEE_ID == undefined) {
            alert("Please Enter CREC Employee ID")
            return;
        }
        if (addDetails.MCL_URN_NO == "" || addDetails.MCL_URN_NO == null || addDetails.MCL_URN_NO == undefined) {
            alert("Please Enter MCL URN Number")
            return;
        }
        if (Statusdropdown == "" || Statusdropdown == null || Statusdropdown == undefined) {
            alert("Please Enter Status")
            return;
        }
        if (addDetails.REPAYMENT_DAY == "" || addDetails.REPAYMENT_DAY == null || addDetails.REPAYMENT_DAY == undefined) {
            alert("Please Enter Repayment Day")
            return;
        }
        if (addDetails.REPAYMENT_TIME == "" || addDetails.REPAYMENT_TIME == null || addDetails.REPAYMENT_TIME == undefined) {
            alert("Please Enter Repayment Time")
            return;
        }
        if (addDetails.REPAYMENT_SLOT == "" || addDetails.REPAYMENT_SLOT == null || addDetails.REPAYMENT_SLOT == undefined) {
            alert("Please Enter Repayment Slot")
            return;
        }
        if (addDetails.BATCH_COUNT == "" || addDetails.BATCH_COUNT == null || addDetails.BATCH_COUNT == undefined) {
            alert("Please Enter Batch Count")
            return;
        }
        if (addDetails.ADDRESS == "" || addDetails.ADDRESS == null || addDetails.ADDRESS == undefined) {
            alert("Please Enter Address")
            return;
        }
        if (addDetails.MCL_LEAD_ID == "" || addDetails.MCL_LEAD_ID == null || addDetails.MCL_LEAD_ID == undefined) {
            alert("Please Enter MCL Lead ID")
            return;
        }
        if (addDetails.AMCL_LEAD_ID == "" || addDetails.AMCL_LEAD_ID == null || addDetails.AMCL_LEAD_ID == undefined) {
            alert("Please Enter AMCL Lead ID")
            return;
        }
        if (addDetails.FOS_MC_REF_NO == "" || addDetails.FOS_MC_REF_NO == null || addDetails.FOS_MC_REF_NO == undefined) {
            alert("Please Enter FOS MC REF Number")
            return;
        }
        if (addDetails.MCL_CIS_NO == "" || addDetails.MCL_CIS_NO == null || addDetails.MCL_CIS_NO == undefined) {
            alert("Please Enter MCL CIS Number")
            return;
        }
        if (addDetails.GPS_LAT == "" || addDetails.GPS_LAT == null || addDetails.GPS_LAT == undefined) {
            alert("Please Enter GPS LAT")
            return;
        }
        if (addDetails.GPS_LON == "" || addDetails.GPS_LON == null || addDetails.GPS_LON == undefined) {
            alert("Please Enter GPS LON")
            return;
        }

        const requestOptionsadd = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "areaCode": areadropdown,
                "branchCode": branchCodedropdown,
                "cityCode": citycodedropdown,
                "name": addDetails.NAME,
                "amclUrnNo": addDetails.AMCL_URN_NO,
                "crecName": addDetails.CREC_EMPLOYEE_ID,
                "mclUrnNo": addDetails.MCL_URN_NO,
                "status": Statusdropdown,
                "repaymentDay": addDetails.REPAYMENT_DAY,
                "repaymentTime": addDetails.REPAYMENT_TIME,
                "repaymentSlot": addDetails.REPAYMENT_SLOT,
                "batchCount": addDetails.BATCH_COUNT,
                "address": addDetails.ADDRESS,
                "mclLeadID": addDetails.MCL_LEAD_ID,
                "amclLeadID": addDetails.AMCL_LEAD_ID,
                "fosMcRefNO": addDetails.FOS_MC_REF_NO,
                "mclCisNO": addDetails.MCL_CIS_NO,
                "gpsLAT": addDetails.GPS_LAT,
                "gpsLON": addDetails.GPS_LON,
            }),
        };
        await fetch(baseURL + addMeetingMasterURL, requestOptionsadd)
            .then(response => response.json())
            .then((response) => {
             
                alert(response.Success);
                setAddDetails("");
                setcitycodedropdown("")
                setBranchCodeDropdown('');
                setAreaCodedropdown('');
                setStatusdropdown('');
                //    Navigate('/index/AddMeetingMaster');
                handleClose()
            })
    }

    const onHandelEditMeetingCenter = async (event) => {
        handleToggle()
        event.preventDefault();

        const requestOptionsedit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "mclUrnNo": editInputes.mclUrnNo,
                "amclUrnNo": editInputes.amclUrnNo,
                "crecName": editInputes.crecName,
                "status": Statusdropdown,
                "meetingCenterCode": editDetails.meetingCenterCode
            }),
        };
        await fetch(baseURL + editMeetingCenter, requestOptionsedit)
            .then(response => response.json())
            .then((response) => {
                alert(response.Success)
                setStatusdropdown('');
                setEditInputes('');
                handleClose() 
            })
    }

    const handleEditInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditInputes(values => ({ ...values, [name]: value }))

    }

    const onHandleSearchMeetingCenter = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSearchInputs(values => ({ ...values, [name]: value }))
    }

    const requestSearch = (searchedVal) => {

        if (searchedVal.length > 3) {

            const filteredRows = tableData.filter((row) => {
                const searchValue = searchedVal.toString().toLowerCase();
                var val1 = false;
                var val2 = false;
                var val3 = false;
                var val4 = false;
                var val5 = false;

                if (row.meetingCenterCode != null) {
                    val1 = row.meetingCenterCode.toString().toLowerCase().includes(searchValue);
                }
                if (row.name != null) {
                    val2 = row.name.toString().toLowerCase().includes(searchValue);
                }
                if (row.mclUrnNo != null) {
                    val3 = row.mclUrnNo.toString().toLowerCase().includes(searchValue);
                }
                if (row.amclUrnNo != null) {
                    val4 = row.amclUrnNo.toString().toLowerCase().includes(searchValue);
                }
                if (row.crecName != null) {
                    val5 = row.crecName.toString().toLowerCase().includes(searchValue);
                }
                return val1 || val2 || val3 || val4 || val5;
            });
            setSearch(filteredRows);
        }
        else {
            setSearch(tableData);
        }
    };

   

    const handleAddCityCodeSelect = (event) => {
        setcitycodedropdown(event.target.value)
    }
    const handleAddBranchCodeSelect = (event) => {
        setBranchCodeDropdown(event.target.value)
    }
    const handleAddAreaCodeSelect = (event) => {
        setAreaCodedropdown(event.target.value)
    }
    const handleAddStatusSelect = (event) => {
        setStatusdropdown(event.target.value)
    }

    const Navigate = useNavigate();
    const location = useLocation();
    const index = location.state;
    const onHandleExist = () => {
        Navigate('/index', { state: index })
    }

    return (
        <>
            <div className='AddMeetingMaster mt-4'>
                <div className='searchBox'>
                    <div className="card">
                        <div className="card-header"> Search </div>
                        <form onSubmit={handleSerarchMetingMaster}>

                            <div className="card-body ">
                                <div className='d-flex justify-content-around'>
                                    <div className='col-3 me-1'>
                                        <TextField className='me-3' id="outlined-basic" label="Meeting Center Code" variant="outlined" autoComplete='off'
                                            name="meetingCenterCode" value={searchInputes.meetingCenterCode} fullWidth
                                            onChange={onHandleSearchMeetingCenter}
                                        />
                                    </div>
                                    <div className='col-3 me-1'>
                                        <TextField className='me-3' id="outlined-basic" label="Meeting Center Name" variant="outlined" autoComplete='off'
                                            name="meetingCenterName" value={searchInputes.meetingCenterName} fullWidth
                                            onChange={onHandleSearchMeetingCenter}
                                        />
                                    </div>
                                    <div className='col-3 me-1'>
                                        <TextField className='me-3' id="outlined-basic" label="CREC Name" variant="outlined" autoComplete='off'
                                            name="CrecName" value={searchInputes.CrecName} fullWidth
                                            onChange={onHandleSearchMeetingCenter}
                                        // onChange={(e) => setinputCrecName(e.target.value)}
                                        />
                                    </div>
                                    <div className='col-3 me-1'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Branch Code</InputLabel>
                                            <Select
                                                  labelId="demo-simple-select-label"
                                                  id="demo-simple-select"
                                                name="Branch Code"
                                                value={branchCodedropdown}
                                                label="Branch Code"
                                                onChange={handleAddBranchCodeSelect}
                                            >
                                                {branchCodeListArray.map((branchCodedropdown, Index) =>
                                                    <MenuItem key={Index} value={branchCodedropdown}>{branchCodedropdown}</MenuItem>
                                                )};
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mt-4'>
                                    <Button className='me-3 bg-orenge' variant="contained" type='submit'
                                    >Search</Button>
                                    <Button className='me-3 bg-orenge' variant="contained">Clear</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='border mt-4'>
                    <div className='p-3'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='col-12 d-flex ' >
                                    <div className='col-9'>
                                        <TextField id="outlined-basic" label="Search" variant="outlined" autoComplete='off' className='me-3' value={inputsearchValue}
                                            onChange={(e) => requestSearch(e.target.value)} type="search"
                                        />
                                    </div>
                                 
                                </div>
                            </div>
                            <div className='col-6'>
                                <span className='d-flex justify-content-end items-center'>
                                    <Button className='me-3 bg-orenge' data-bs-toggle="modal" data-bs-target="#AddMeetingMaster" variant="contained">Add</Button>
                                    <Button className='me-3 bg-orenge' variant="contained" onClick={onHandleExist}>Exit</Button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='TableDiv '>
                        <Paper  sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead className="tableHead">
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
                                                    <TableRow key={index}>
                                                        <TableCell value={row.meetingCenterCode}>{row.meetingCenterCode}</TableCell>
                                                        <TableCell value={row.name}>{row.name}</TableCell>
                                                        <TableCell>{row.mclUrnNo}</TableCell>
                                                        <TableCell>{row.amclUrnNo}</TableCell>
                                                        <TableCell>{row.crecName}</TableCell>
                                                        <TableCell>{row.status}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.areaCode}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.branchCode}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.cityCode}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.updTime} </TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.productCategory}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.repaymentDay}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.repaymentTime}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.repaymentSlot}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.address}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.fosMcRefNO}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.mclCisNO}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.gpsLAT}</TableCell>
                                                        <TableCell sx={{ display: "none" }}>{row.gpsLON}</TableCell>
                                                        <TableCell  >
                                                            <FontAwesomeIcon className='me-3 fs-5 text-orenge cursor-pointer' data-bs-toggle="modal"
                                                                data-bs-target="#ViewMeetingmaster" variant="contained" icon={faEye} onClick={meetingMasterview(index)} />
                                                            <FontAwesomeIcon className='me-3 fs-5 text-orenge cursor-pointer'
                                                                data-bs-toggle="modal" data-bs-target="#EditMeetingmaster" variant="contained" onClick={meetingMasterEdit(index)} icon={faPenToSquare} />
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
                        </Paper>
                        <Backdrop
                            sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                            onClick={handleClose}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </div>
                </div>
                <div className="modal  fade" id="AddMeetingMaster" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                    <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Meeting Master</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={onHandelAddMeetingCenter}>
                                <div className="modal-body">
                                    <div className='row g-3'>
                                        <div className='col-6'> <TextField id="outlined-basic" label="Meeting Center Code" variant="outlined" autoComplete='off' name="MEETING_CENTER_CODE" value={addDetails.MEETING_CENTER_CODE || ""} onChange={handleAddInputs} InputProps={{ readOnly: true, }} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="Name" variant="outlined" autoComplete='off' name="NAME" value={addDetails.NAME || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">City Code</InputLabel>
                                                <Select
                                                     labelId="demo-simple-select-label"
                                                     id="demo-simple-select"
                                                    name="CITY_CODE"
                                                    value={citycodedropdown}
                                                    label="Target Meeting Center"
                                                    onChange={handleAddCityCodeSelect}
                                                >
                                                    {cityCodeListArray.map((citycodedropdown, Index) =>
                                                        <MenuItem key={Index} value={citycodedropdown}>{citycodedropdown}</MenuItem>
                                                    )};
                                                </Select>
                                            </FormControl>
                                        </div>
                                        {/* <div className='col-6'> <TextField id="outlined-basic" label="City Code" variant="outlined" autoComplete='off' name="CITY_CODE" value={addDetails.CITY_CODE || ""} onChange={handleAddInputs} /></div> */}
                                        <div className='col-6'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Branch Code</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="Branch Code"
                                                    value={branchCodedropdown}
                                                    label="Branch Code"
                                                    onChange={handleAddBranchCodeSelect}
                                                >
                                                    {branchCodeListArray.map((branchCodedropdown, Index) =>
                                                        <MenuItem key={Index} value={branchCodedropdown}>{branchCodedropdown}</MenuItem>
                                                    )};
                                                </Select>
                                            </FormControl>
                                        </div>
                                        {/* <div className='col-6'> <TextField id="outlined-basic" label="Branch Code" name="BRANCH_CODE" autoComplete='off' value={addDetails.BRANCH_CODE || ""} onChange={handleAddInputs} /></div> */}
                                        <div className='col-6'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Area Code</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="Area_code"
                                                    value={areadropdown}
                                                    label="Area_code"
                                                    onChange={handleAddAreaCodeSelect}
                                                >
                                                    {areaCodeListArray.map((areadropdown, Index) =>
                                                        <MenuItem key={Index} value={areadropdown}>{areadropdown}</MenuItem>
                                                    )};
                                                </Select>
                                            </FormControl>
                                        </div>
                                        {/* <div className='col-6'> <TextField id="outlined-basic" label="Area Code" variant="outlined" autoComplete='off' name="Area_code" value={addDetails.Area_code || ""} onChange={handleAddInputs} /></div>                                      */}
                                        <div className='col-6'> <TextField id="outlined-basic" label="Batch Count" variant="outlined" autoComplete='off' name="BATCH_COUNT" value={addDetails.BATCH_COUNT || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="MCL URN No" variant="outlined" autoComplete='off' name="MCL_URN_NO" value={addDetails.MCL_URN_NO || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="AMCL URN No" variant="outlined" autoComplete='off' name="AMCL_URN_NO" value={addDetails.AMCL_URN_NO || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="MCL Lead ID" variant="outlined" autoComplete='off' name="MCL_LEAD_ID" value={addDetails.MCL_LEAD_ID || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="AMCL Lead ID" variant="outlined" autoComplete='off' name="AMCL_LEAD_ID" value={addDetails.AMCL_LEAD_ID || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="MCL CIS No" variant="outlined" autoComplete='off' name="MCL_CIS_NO" value={addDetails.MCL_CIS_NO || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="FOS MC REF No" variant="outlined" autoComplete='off' name="FOS_MC_REF_NO" value={addDetails.FOS_MC_REF_NO || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="CREC Empoyee ID" variant="outlined" autoComplete='off' name="CREC_EMPLOYEE_ID" value={addDetails.CREC_EMPLOYEE_ID || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="Address" variant="outlined" autoComplete='off' name="ADDRESS" value={addDetails.ADDRESS || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="GPS LAT" variant="outlined" autoComplete='off' name="GPS_LAT" value={addDetails.GPS_LAT || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="GPS LON" variant="outlined" autoComplete='off' name="GPS_LON" value={addDetails.GPS_LON || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="Repayment Time" variant="outlined" autoComplete='off' name="REPAYMENT_TIME" value={addDetails.REPAYMENT_TIME || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="Repayment Day" variant="outlined" autoComplete='off' name="REPAYMENT_DAY" value={addDetails.REPAYMENT_DAY || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-basic" label="Repayment Slot" variant="outlined" autoComplete='off' name="REPAYMENT_SLOT" value={addDetails.REPAYMENT_SLOT || ""} onChange={handleAddInputs} /></div>
                                        <div className='col-6'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="STATUS"
                                                    value={Statusdropdown}
                                                    label="Status"
                                                    onChange={handleAddStatusSelect}
                                                >
                                                    <MenuItem value="......">------Select------</MenuItem>
                                                    {statusListArray.map((Statusdropdown, Index) =>
                                                        <MenuItem key={Index} value={Statusdropdown}>{Statusdropdown}</MenuItem>
                                                    )};
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
                        <form onSubmit={onHandelEditMeetingCenter}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Meeting Master</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className='row g-3'>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="Meeting Center Code" variant="filled" autoComplete='off' multiline ref={MEETING_CENTER_CODE} defaultValue={editDetails.meetingCenterCode} InputProps={{ readOnly: true, }} /></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="Name" variant="filled" autoComplete='off' multiline ref={NAME} defaultValue={editDetails.name} InputProps={{ readOnly: true, }} /></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="City Code" variant="filled" autoComplete='off' multiline ref={CITY_CODE} defaultValue={editDetails.cityCode} InputProps={{ readOnly: true, }} /></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="Branch Code" variant="filled" placeholder="Enter MC Name" multiline ref={BRANCH_CODE} defaultValue={editDetails.branchCode} InputProps={{ readOnly: true, }} /></div>
                                        <div className='col-6'><TextField id="outlined-basic" label="Area Code" variant="filled" autoComplete='off' ref={AREA_CODE} multiline defaultValue={editDetails.areaCode} InputProps={{ readOnly: true, }} /></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="Batch Count" variant="filled" autoComplete='off' multiline ref={BATCH_COUNT} defaultValue={editDetails.batchCount} InputProps={{ readOnly: true, }}></TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="MCL URN No" variant="outlined" autoComplete='off' multiline ref={MCL_URN_NO} defaultValue={editDetails.mclUrnNo}
                                            name="mclUrnNo" value={editInputes.mclUrnNo} onChange={handleEditInputs}></TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="AMCL URN No" variant="outlined" autoComplete='off' multiline ref={AMCL_URN_NO} defaultValue={editDetails.amclUrnNo}
                                            name="amclUrnNo" value={editInputes.amclUrnNo} onChange={handleEditInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="MCL Lead ID" variant="filled" autoComplete='off' multiline ref={MCL_LEAD_ID} defaultValue={editDetails.mclLeadID} InputProps={{ readOnly: true, }}> </TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="AMCL Lead ID" variant="filled" autoComplete='off' multiline ref={AMCL_LEAD_ID} defaultValue={editDetails.amclLeadID} InputProps={{ readOnly: true, }}></TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="MCL CIS No" variant="filled" autoComplete='off' multiline ref={MCL_CIS_NO} defaultValue={editDetails.mclCisNO} InputProps={{ readOnly: true, }}> </TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="FOS MC REF No" variant="filled" autoComplete='off' multiline ref={FOS_MC_REF_NO} defaultValue={editDetails.fosMcRefNO} InputProps={{ readOnly: true, }}> </TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="CREC Employee ID" variant="outlined" autoComplete='off' multiline ref={CREC_EMPLOYEE_ID} defaultValue={editDetails.crecName}
                                            name="crecName" value={editInputes.crecName} onChange={handleEditInputs} /></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="Address" variant="filled" autoComplete='off' multiline ref={ADDRESS} defaultValue={editDetails.address} InputProps={{ readOnly: true, }}></TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="GPS LAT" variant="filled" autoComplete='off' multiline ref={GPS_LAT} defaultValue={editDetails.gpsLAT} InputProps={{ readOnly: true, }}> </TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="GPS LON" variant="filled" autoComplete='off' multiline ref={GPS_LON} defaultValue={editDetails.gpsLON} InputProps={{ readOnly: true, }}> </TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="Repayment Day" variant="filled" autoComplete='off' multiline ref={REPAYMENT_DAY} defaultValue={editDetails.repaymentDay} InputProps={{ readOnly: true, }}></TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="Repayment Time" variant="filled" autoComplete='off' multiline ref={REPAYMENT_TIME} defaultValue={editDetails.repaymentTime} InputProps={{ readOnly: true, }}> </TextField></div>
                                        <div className='col-6'> <TextField id="outlined-textarea" label="Repayment Slot" variant="filled" autoComplete='off' multiline ref={REPAYMENT_SLOT} defaultValue={editDetails.repaymentSlot} InputProps={{ readOnly: true, }}> </TextField></div>
                                        <div className='col-6'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="STATUS"
                                                    value={Statusdropdown}
                                                    label="Status"
                                                    onChange={handleAddStatusSelect}
                                                >
                                                    <MenuItem value="......">------Select------</MenuItem>
                                                    {statusListArray.map((Statusdropdown, Index) =>
                                                        <MenuItem key={Index} value={Statusdropdown}>{Statusdropdown}</MenuItem>
                                                    )};
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
                <div className="modal fade" id="ViewMeetingmaster" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">View Meeting Master</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='row g-3'>
                                    <div className='col-6'> <TextField id="outlined-basic" label="Meeting Center Code" value={editDetails.areaCode} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="Name" value={editDetails.name} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="City Code" value={editDetails.cityCode} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="Branch Code" value={editDetails.branchCode} InputProps={{ readOnly: true, }} variant="filled" /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="Area Code" value={editDetails.areaCode} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="BATCH_COUNT Batch Count" value={editDetails.batchCount} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="MCL URN No" value={editDetails.mclUrnNo} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="AMCL URN No" value={editDetails.amclUrnNo} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="MCL Lead ID" value={editDetails.mclLeadID} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="AMCL Lead ID" value={editDetails.amclLeadID} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="MCL CIS No" value={editDetails.mclCisNO} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="FOS MC REF No" value={editDetails.fosMcRefNO} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="CREC Employee ID" value={editDetails.crecName} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="Address" value={editDetails.address} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="GPS LAT" value={editDetails.gpsLAT} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="GPS LON" value={editDetails.gpsLON} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="Repaynent Day" value={editDetails.repaymentDay} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="Repayment Time" value={editDetails.repaymentTime} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="Repayment Slot" value={editDetails.repaymentSlot} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
                                    <div className='col-6'> <TextField id="outlined-basic" label="Status" value={editDetails.status} InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' /></div>
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
            </div>
        </>
    );
}

export default AddMeetingMaster;

