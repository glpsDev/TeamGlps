import * as React from 'react';
import { useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import PaginetionTable from '../Components/PaginetionTable';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchUrl } from '../Config';


const BaseURL = fetchUrl;
const appAuditTrail = "/appAuditTrail";

const columns = [
    { id: 'Sr', label: 'Sr', },
    { id: 'Task_Namr', label: 'Task Name', },
    { id: 'Start Time', label: 'Start Time', },
    { id: 'End_Time', label: 'End Time', },
    { id: 'Time_Diffrencs', label: 'Time Diff (In Sec)', },
    { id: 'User', label: 'User', },
    { id: 'Remark', label: 'Remark', },
];

export default function MeetingCenterAuditTrail() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [auditTrail, setauditTrail] = React.useState([]);
    const [inputBatchNo, setinputBatchNo] = React.useState([]);
    const [inputApplicationNo, setinputApplicationNo] = React.useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleApplicationAudiTrail = async (event) => {

        event.preventDefault();
        const requestOptionscrecbulk = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // "batchNo": 'B21711228202201449',
                "batchNo": inputBatchNo,
                // "appNo": inputApplicationNo
            }),
        };
        await fetch(BaseURL + appAuditTrail, requestOptionscrecbulk)
            .then(response => response.json())
            .then((response) => {
                setauditTrail(response);
            })
    }

    const Navigate = useNavigate()
    const location = useLocation();
       const index = location.state; 
  const onhandlecancel = () =>{
    Navigate('/index', {state: index})
  }
    return (
        <>
            <div className='MeetingCenterAuditTrail mt-5'>
                 <div className='searchBox mt-4'>
                    <div className="card">
                        <div className="card-header">Meeting Center Audit Trail </div>
                        <div className="card-body py-4">
                            <div className='row'>
                                <div className='col-5'>
                                    <TextField fullWidth id="outlined-basic" label="Batch No" variant="outlined"
                                        name='BatchNo'
                                        value={inputBatchNo}
                                        onChange={(e) => setinputBatchNo(e.target.value)}
                                    />
                                </div>
                                <div className='col-5'>
                                    <TextField fullWidth id="outlined-basic" label="Application No" variant="outlined"
                                        name='ApplicationNo'
                                        value={inputApplicationNo}
                                        onChange={(e) => setinputApplicationNo(e.target.value)}
                                    />
                                </div>
                                <div className='col-2 d-flex align-item-center p-1'>
                                    <Button className='bg-orenge ms-3' variant="contained" type="submit"
                                        onClick={handleApplicationAudiTrail}
                                    >Search</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
                {/* <div className='border mt-4'>
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

            <div className='Dudupe'>
                    <div className='row g-4'>
                        <div className='col-6 '>
                            <div className='dudupeBox p-3 border shadow-sm h-100' >
                                <div className='mb-3'>  <TextField fullWidth id="outlined-basic" label="Requsted URN" variant="outlined"
                                    name='BatchNo'
                                    value={inputBatchNo}
                                    onChange={(e) => setinputBatchNo(e.target.value)}
                                />
                                </div>
                                <div className='mb-3'> <TextField fullWidth id="outlined-basic" label="Customer Name" variant="outlined"
                                    name='BatchNo'
                                    value={inputBatchNo}
                                    onChange={(e) => setinputBatchNo(e.target.value)}
                                />
                                </div>
                                <div className='mb-3'> <TextField fullWidth id="outlined-basic" label="Email Id" variant="outlined"
                                    name='BatchNo'
                                    value={inputBatchNo}
                                    onChange={(e) => setinputBatchNo(e.target.value)}
                                />
                                </div>
                                <div className='mb-3'> <TextField fullWidth id="outlined-basic" label="mobile No" variant="outlined"
                                    name='BatchNo'
                                    value={inputBatchNo}
                                    onChange={(e) => setinputBatchNo(e.target.value)}
                                />
                                </div>
                                <div className='mb-3'>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="New Customer" />

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
                        </div> */}
                        {/* <div className='col-6 '>
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
                                <div className='col-12 d-flex align-item-center justify-content-end'>
                                    <Button className='bg-orenge' variant="contained" type="submit"
                                        onClick={onhandlecancel}
                                    >Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Mergig Box</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-4">

                                <TextField fullWidth id="outlined-basic" label="Remark" variant="outlined"
                                    name='BatchNo' multiline
                                    rows={2}
                                    value={inputBatchNo}
                                    onChange={(e) => setinputBatchNo(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Merge</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}