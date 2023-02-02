import React from 'react';
import TableNew from '../Components/Table';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import { useState } from "react";
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { LinkOffRounded } from '@mui/icons-material';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { fetchUrl } from '../Config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const BaseURL = fetchUrl;
const applicationDetails = '/applicationDetails';
const fetchLeadLvlDtl = '/fetchLeadLvlDtl';
const completeTask = '/completeTask';
const editOpportunities = '/editOpportunities';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const LeadDetailscolumns = [
  { id: 'Product_code', label: 'Product code', },
  { id: 'Loan_Account_No', label: 'Loan Account No', },
  { id: 'URN', label: 'URN', },
  { id: 'Opportunity_Status', label: 'Opportunity Status', },
  { id: 'Credit_Bureau_Status', label: 'Credit Bureau Status', },
  { id: 'Client_Name', label: 'Client Name', },
  { id: 'Loan_Amount', label: 'Loan Amount', },
  { id: 'Action', label: 'Action', },
];
const Historycolumns = [
  { id: 'Sr', label: 'Sr', },
  { id: 'Task_Namr', label: 'Task Name', },
  { id: 'Start Time', label: 'Start Time', },
  { id: 'End_Time', label: 'End Time', },
  { id: 'Time_Diffrencs', label: 'Time Diff (In Sec)', },
  { id: 'User', label: 'User', },
  { id: 'Remark', label: 'Remark', },
];
const columns = [
  { id: 'Sr', label: 'Sr', },
  { id: 'Task_Namr', label: 'Task Name', },
  { id: 'Start Time', label: 'Start Time', },
  { id: 'End_Time', label: 'End Time', },
  { id: 'Time_Diffrencs', label: 'Time Diff (In Sec)', },
  { id: 'User', label: 'User', },
  { id: 'Remark', label: 'Remark', },
];

function ApplicationDetails(props) {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [applicationDetail, setApplicationDetail] = useState([]);
  const [disabled, setdisabled] = React.useState(false);
  const [leadRecord, setLeadRecord] = React.useState('');
  const [defailtValue, setDefailtValue] = React.useState('');
  const [historyData, setHistoryData] = React.useState([]);
  const [action, setAction] = React.useState('');
  const [taskId, setTaskId] = React.useState('');
  const Navigate = useNavigate();
  const location = useLocation();
  const [batchdata, setBatchdata] = React.useState()
  const [mytask, setMytask] = React.useState()
  const [amlStatus, setAmlStatus] = React.useState(false);
  const [dedupeStatus, setDedupeStatus] = React.useState(false);
  const [cbStatus, setCbStatus] = React.useState(false);
  const [disabledAmlSelectBox, setdisabledAmlSelectBox] = React.useState(false);
  const [disabledDedupeSelectBox, setdisabledDedupeSelectBox] = React.useState(false);
  const [disabledCBSelectBox, setdisabledCBSelectBox] = React.useState(false);
  const [auditTrail, setauditTrail] = React.useState([]);

  const [pcAMLStatus, setpcAMLStatus] = React.useState([]);
  const [pcCbStatus, setpcCbStatus] = React.useState([]);
  const [pcDedupeStatus, setpcDedupeStatus] = React.useState([]);
  const [scCbStatus, setscCbStatus] = React.useState([]);
  const [scAMLStatus, setscAMLStatus] = React.useState([]);
  const [scDedupeStatus, setscDedupeStatus] = React.useState([]);
  const [leadIdRecord, setleadIdRecord] = React.useState([]);
  const [taskIdRecord, settaskIdRecord] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  }

  React.useEffect(() => {
    const data = localStorage.getItem("key");
    if (data != null) {
      setBatchdata(JSON.parse(data));
    }
  }, [batchdata]);

  React.useEffect(() => {
    const data = localStorage.getItem("myTask");
    if (data != null) {
      setMytask(JSON.parse(data));
    }
    
  }, [mytask]);

  React.useEffect(() => {
    handleToggle()
    const requestApplicationDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "f1": batchdata
      }),
    };
    console.log(requestApplicationDetails)

    fetch(BaseURL + applicationDetails, requestApplicationDetails)
      .then(response => response.json())
      .then((response) => {
        // console.log(response)
        setApplicationDetail(response)
        handleClose()
      })

  }, applicationDetail[0]);

  const onhandletabsCahnge = (batchNo, leadId, taskId) => async (e) => {
    handleToggle()
    e.preventDefault();
    setdisabled(true)
    setTaskId(taskId)
    setleadIdRecord(leadId)
    settaskIdRecord(taskId)
    const requestleadRecords = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "batchNo": batchNo,
        "leadId": leadId
      }),
    };
    fetch(BaseURL + fetchLeadLvlDtl, requestleadRecords)
      .then(response => response.json())
      .then((response) => {
        setLeadRecord(response)
        setHistoryData(response.auditTrail)
        handleClose()

      })

    if (mytask == "Dedupe Check Manual Task") {
      setdisabledDedupeSelectBox(true)
    }
    if (mytask == "AML Check Manual Task") {
      setdisabledAmlSelectBox(true)
    }
    if (mytask == "CB Check Manual Task") {
      setdisabledCBSelectBox(true)
    }
    console.log(mytask)

  }

  const handleSubmit = (taskID, actionValue) => async (e) => {
    handleToggle()
    e.preventDefault();

    setdisabled(true)
    const requestleadRecords = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "executorID": menu.username,
        "taskID": taskID,
        "actionValue": actionValue
      }),
    };
    fetch(BaseURL + completeTask, requestleadRecords)
      .then(response => response.json())
      .then((response) => {
        handleClose()
      })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeDropdown = (event) => {
    setAction(event.target.value);
  };
  const handleSave = (e) => {

    handleToggle()
    e.preventDefault();
    setdisabled(true)
    const requesteditOpportunities = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "taskName": mytask,
        "leadId": leadIdRecord,
        "taskId": taskIdRecord,
        "pcCbStatus": pcCbStatus,
        "scCbStatus": scCbStatus,
        "pcAMLStatus": pcAMLStatus,
        "scAMLStatus": scAMLStatus,
        "pcDedupeStatus": pcDedupeStatus,
        "scDedupeStatus": scDedupeStatus
      }),
    };
    fetch(BaseURL + editOpportunities, requesteditOpportunities)
      .then(response => response.json())
      .then((response) => {
        console.log(response)
        // alert('Data Sent Successfuly')
        handleClose()
      })
  };


  const handleChangeDropdownpcAmlStatus = (event) => {
    setpcAMLStatus(event.target.value);
  };

  const handleChangeDropdownpcDedupeStatus = (event) => {
    setpcDedupeStatus(event.target.value);
  };

  const handleChangeDropdownpcCbStatus = (event) => {
    setpcCbStatus(event.target.value);
  };

  const handleChangeDropdownscAmlStatus = (event) => {
    setscAMLStatus(event.target.value);
  };

  const handleChangeDropdownscDedupeStatus = (event) => {
    setscDedupeStatus(event.target.value);
  };

  const handleChangeDropdownscCbStatus = (event) => {
    setscCbStatus(event.target.value);
  };

  const onHandelNewTab = (imgUrl) => (e) => {
    window.open(
      imgUrl
    )
  };

  const menu = location.state;

  const onHandleApplicationCancel = () => {
    Navigate('/index/MyTask', { state: menu });
  }

  return (
    <>
      <div className="card mt-4">
        <div className="card-header  bg-orenge py-2">
          Application No ( {batchdata} )
        </div>
        <div className="card-body">

          <div className='Tabs'>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className='tab-btn' label="Opportunities" />
              <Tab className='tab-btn' label="Application" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Opportunity" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Primary Borrower" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Co-Borrower" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="KYC" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="History" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Dedupe" disabled={disabledDedupeSelectBox ? false : true} />
              {/* <Tab className='tab-btn' label="Upload" disabled={disabled ? false : true} /> */}
            </Tabs>

            <TabPanel value={value} index={0}>
              <div className="mb-4" >
                <TableNew data={batchdata} />
              </div>

              <div>
                <form>
                  <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {LeadDetailscolumns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ top: 0, minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {applicationDetail
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                  <TableCell >{row.productCode}</TableCell>
                                  <TableCell >{row.lanNo}</TableCell>
                                  <TableCell >{row.urn}</TableCell>
                                  <TableCell >{row.status}</TableCell>
                                  <TableCell >{row.pcCbStatus}</TableCell>
                                  <TableCell >{row.customerName}</TableCell>
                                  <TableCell className='text-center' >{row.loanAmount}</TableCell>
                                  <TableCell className="text-center editicon">
                                    <FontAwesomeIcon className='fs-5 text-orenge cursor-pointer'
                                      icon={faPenToSquare}
                                      onClick={onhandletabsCahnge(row.batchNo, row.leadId, row.taskId)}
                                    />

                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={applicationDetail.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </form>
              </div>
              <div className='row mt-3 justify-content-between'>
                <div className='col-6'><TextField fullWidth id="outlined-basic" label="Remark" variant="outlined" multiline rows={3} /></div>
                <div className='col-4 '>
                  <div className='row '>
                    <div className='col-6'>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Action</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={action}
                          label="Action"
                          onChange={handleChangeDropdown}
                        >
                          <MenuItem disabled={true} value={0}>--Select--</MenuItem>
                          <MenuItem value={1}>Proceed Further</MenuItem>
                          <MenuItem value={2}>Re-hit</MenuItem>
                          <MenuItem value={9}>Reject</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className='col-6 '>
                      <Button className='ms-3 bg-orenge' onClick={handleSubmit(taskId, action)} variant="contained">Submit</Button>
                      <Button className='bg-orenge ms-2' onClick={onHandleApplicationCancel}>Cancel</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="Application" value={value} index={1} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Product Code" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.productCode} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Area Code" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.areaCode} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Branch Code" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.branchCode} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Meeting Center Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.meetingCentreName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="MCL URN No" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.mclUrn} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.status} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="No. of Customers" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.batchCount} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Batch Type" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.batchType} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Remark" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.remarks} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Rate Of Interest" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.rateofInterest} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Tenure" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.tenure} fullWidth />
                  </div>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="Opprotunity" value={value} index={2} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Lead ID" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.leadId} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Loan Cycle" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.loanCycle} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Pincode" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.pincode} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Loaan Amount" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.disbursementAmount} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="City" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.city} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="State" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.state} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Loan Purpose" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.loanPurpose} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="CB Check" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.pcCbStatus} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Remark" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.remarks} fullWidth />
                  </div>
                </div>
                <div className='mt-3  d-flex justify-content-end '>
                  <Button className='ms-3 bg-orenge' onClick={handleSave} variant="contained">Save</Button>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="PrimaryBorrower" value={value} index={3} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="URN" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.urn} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="First Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.firtName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Middle Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.middleName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Last Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.lastName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="DOB" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.dateofBirth} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Mobile No" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.mobileNo} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Agriculture Land" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.agriLand} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Age" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.age} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Annual Income" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.annualIncome} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Gender" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.gender} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Marital Status" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.maritalStatus} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Permanent Address" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.permanentAddres} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Present Address" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.presentAddress} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Jana Refencs Id" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.janaIdBorrower} fullWidth />
                  </div>
                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledAmlSelectBox ? false : true} >
                      <InputLabel id="demo-simple-select-label">AML Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="AML Status"
                        name="Lead Data Approval"
                        value={pcAMLStatus}
                        onChange={handleChangeDropdownpcAmlStatus}
                      >
                        <MenuItem value={""}>--Select--</MenuItem>
                        <MenuItem value={"Match Found"}>Match Found</MenuItem>
                        <MenuItem value={"No Match Found"}>No Match Found</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledDedupeSelectBox ? false : true}>
                      <InputLabel id="demo-simple-select-label">Dedupe Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Dedupe Status"
                        value={pcDedupeStatus}
                        onChange={handleChangeDropdownpcDedupeStatus}
                      >
                        <MenuItem value={""}>--Select--</MenuItem>
                        <MenuItem value={"Duplicate"}>Duplicate</MenuItem>
                        <MenuItem value={"Non-Duplicate"}>Non-Duplicate</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledCBSelectBox ? false : true}>
                      <InputLabel id="demo-simple-select-label">CB Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="CB Status"
                        value={pcCbStatus}
                        onChange={handleChangeDropdownpcCbStatus}
                      >
                        <MenuItem value={""}>--Select--</MenuItem>
                        <MenuItem value={"Accepte"}>Accepte</MenuItem>
                        <MenuItem value={"Reject"}>Reject</MenuItem>
                      </Select>
                    </FormControl>

                  </div>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="CoBorrower" value={value} index={4} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="First Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.firtName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Middle Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.middleName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Last Name" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.lastName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="DOB" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.dateofBirth} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Mobile No" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.mobileNo} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Jana Refencs Id" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.janaIdBorrower} fullWidth />
                  </div>
                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledAmlSelectBox ? false : true} >
                      <InputLabel id="demo-simple-select-label">AML Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="AML Status"
                        name="Lead Data Approval"
                        value={scAMLStatus}
                        onChange={handleChangeDropdownscAmlStatus}
                      >
                        <MenuItem value={""}>--Select--</MenuItem>
                        <MenuItem value={"Match Found"}>Match Found</MenuItem>
                        <MenuItem value={"No Match Found"}>No Match Found</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledDedupeSelectBox ? false : true}>
                      <InputLabel id="demo-simple-select-label">Dedupe Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Dedupe Status"
                        value={scDedupeStatus}
                        onChange={handleChangeDropdownscDedupeStatus}
                      >
                        <MenuItem value={""}>--Select--</MenuItem>
                        <MenuItem value={"Duplicate"}>Duplicate</MenuItem>
                        <MenuItem value={"Non-Duplicate"}>Non-Duplicate</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className='col-6'>
                    <FormControl fullWidth disabled={disabledCBSelectBox ? false : true}>
                      <InputLabel id="demo-simple-select-label">CB Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="CB Status"
                        value={scCbStatus}
                        onChange={handleChangeDropdownscCbStatus}
                      >
                        <MenuItem value={""}>--Select--</MenuItem>
                        <MenuItem value={"Accepte"} >Accepte</MenuItem>
                        <MenuItem value={"Reject"}>Reject</MenuItem>
                      </Select>
                    </FormControl>

                  </div>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="KYC" value={value} index={5} disabled={disabled ? false : true}>
              <form>
                <div className='Borrover p-3 border mb-4'>
                  <div className='row g-4'>
                    <h4 className='text-orenge'>Borrower</h4>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Primary ID Type " InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.primaryCustIdType1} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Primary ID Value" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.primaryCustIdVal1} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Secondary ID Type" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.primaryCustIdType2} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Secondary ID Value" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.primaryCustIdVal2} fullWidth />
                    </div>
                  </div>
                </div>
                <div className='Co-Boorover p-3 border'>
                  <div className='row g-4'>
                    <h4 className='text-orenge'>Co-Borrower</h4>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Primary ID Type " InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.secCustIdType1} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Primary ID Value" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.secCustIdVal1} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Secondary ID Type" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.secCustIdType2} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Secondary ID Value" InputProps={{ readOnly: true, }} variant="filled" autoComplete='off' multiline defaultValue={leadRecord.secCustIdVal2} fullWidth />
                    </div>
                  </div>
                </div>
                <div className='col-12 mt-3 d-flex justify-content-end'>
                  <Button className='me-3 bg-orenge' variant="contained" onClick={onHandelNewTab(leadRecord.imgUrl)}>View Document</Button>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="History" value={value} index={6} disabled={disabled ? false : true}>
              <div>
                <form>
                  <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {Historycolumns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ top: 0, minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {historyData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                  <TableCell >{index + 1}</TableCell>
                                  <TableCell >{row.taskName}</TableCell>
                                  <TableCell >{row.startTime}</TableCell>
                                  <TableCell >{row.endTime}</TableCell>
                                  <TableCell >{row.timeDiff}</TableCell>
                                  <TableCell >{row.assignee}</TableCell>
                                  <TableCell >{row.remarkss}</TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={historyData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </form>
              </div>
            </TabPanel>

            <TabPanel className="Dedupe" value={value} index={7} disabled={disabledDedupeSelectBox ? false : true}>
              <div className='Dudupe'>
                <div className='row g-4'>
                  <div className='col-6 '>
                    <div className='dudupeBox p-3 border shadow-sm h-100' >
                      <div className='mb-3'>
                        <TextField fullWidth id="outlined-basic" label="Requsted URN" variant="outlined" />
                      </div>
                      <div className='mb-3'>
                        <TextField fullWidth id="outlined-basic" label="Customer Name" variant="outlined" />
                      </div>
                      <div className='mb-3'>
                        <TextField fullWidth id="outlined-basic" label="Email Id" variant="outlined" />
                      </div>
                      <div className='mb-3'>
                        <TextField fullWidth id="outlined-basic" label="mobile No" variant="outlined" />
                      </div>
                      <div className='mb-3'>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox />} label="New Customer" />

                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  <div className='col-6 '>
                    <div className='dudupeBox p-3 border shadow-sm h-100' >
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
                              {auditTrail
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                  return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                      <TableCell >{index + 1}</TableCell>
                                      <TableCell >{row.taskName}</TableCell>
                                      <TableCell >{row.startTime}</TableCell>
                                      <TableCell >{row.endTime}</TableCell>
                                      <TableCell >{row.timeDiff}</TableCell>
                                      <TableCell >{row.assignee}</TableCell>
                                      <TableCell >{row.remarks}</TableCell>
                                    </TableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[10, 25, 100]}
                          component="div"
                          count={auditTrail.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </Paper>
                      <button type="button" class="btn bg-orenge" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Merge
                      </button>
                    </div>
                  </div>
                  <div className='col-6 '>
                    <div className='dudupeBox p-3 border shadow-sm h-100' >
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
                              {auditTrail
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                  return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                      <TableCell >{index + 1}</TableCell>
                                      <TableCell >{row.taskName}</TableCell>
                                      <TableCell >{row.startTime}</TableCell>
                                      <TableCell >{row.endTime}</TableCell>
                                      <TableCell >{row.timeDiff}</TableCell>
                                      <TableCell >{row.assignee}</TableCell>
                                      <TableCell >{row.remarks}</TableCell>
                                    </TableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[10, 25, 100]}
                          component="div"
                          count={auditTrail.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </Paper>
                    </div>
                  </div>
                  <div className='col-6 '>
                    <div className='dudupeBox p-3 border shadow-sm h-100' >
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
                              {auditTrail
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                  return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                      <TableCell >{index + 1}</TableCell>
                                      <TableCell >{row.taskName}</TableCell>
                                      <TableCell >{row.startTime}</TableCell>
                                      <TableCell >{row.endTime}</TableCell>
                                      <TableCell >{row.timeDiff}</TableCell>
                                      <TableCell >{row.assignee}</TableCell>
                                      <TableCell >{row.remarks}</TableCell>
                                    </TableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[10, 25, 100]}
                          component="div"
                          count={auditTrail.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </Paper>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='mt-5'><PaginetionTable /></div> */}

              <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Mergig Box</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-4">

                      <TextField fullWidth id="outlined-basic" label="Remark" variant="outlined" multiline rows={2} />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary">Merge</button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* <TabPanel className="Upload " value={value} index={8} disabled={disabledDedupeSelectBox ? false : true}>
              <div className='Upload h-100'>
                <div className='row'>
                  <div className='col-6'><TextField fullWidth id="outlined-basic" label="Remark" variant="outlined" multiline rows={3} /></div>
                  <div className='col-6'>
                    <div className='d-flex align-items-center'>
                      <Button className='bg-orenge' variant="contained">Upload Document</Button>
                    </div>
                  </div>
                </div>
              </div>

            </TabPanel> */}

          </div>
        </div>
        <Backdrop
          sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}

export default ApplicationDetails;
