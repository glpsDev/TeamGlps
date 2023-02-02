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
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchUrl } from '../Config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const columns = [
    { id: 'Sr', label: 'Sr', },
    { id: 'Task_Namr', label: 'Task Name', },
    { id: 'Start Time', label: 'Start Time', },
    { id: 'End_Time', label: 'End Time', },
    { id: 'Time_Diffrencs', label: 'Time Diff (In Sec)', },
    { id: 'User', label: 'User', },
    { id: 'Remark', label: 'Remark', },
];

const appAuditTrailURL = '/appAuditTrail';
const BaseUrl = fetchUrl

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [auditTrail, setauditTrail] = React.useState([]);
    const [inputBatchNo, setinputBatchNo] = React.useState([]);
    const [inputApplicationNo, setinputApplicationNo] = React.useState([]);

    const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen(!open);
	}

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleApplicationAudiTrail = async (event) => {
        handleToggle()
        event.preventDefault();
        const requestOptionscrecbulk = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "batchNo": inputBatchNo,
                // "appNo": inputApplicationNo
            }),
        };
        await fetch(BaseUrl + appAuditTrailURL, requestOptionscrecbulk)
            .then(response => response.json())
            .then((response) => {
                setauditTrail(response);
                handleClose()
            })
    }

    const Navigate = useNavigate()
    const location = useLocation();
    const index = location.state;
    const onhandlecancel = () => {
        Navigate('/index', { state: index })
    }

    return (
        <>
            <div className='applicationAuditTrail'>
                <div className='searchBox mt-4'>
                    <div className="card">
                        <div className="card-header">Application Audit Trail </div>
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

                <div className='border mt-4'>
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

                    <div className='col-12 d-flex align-item-center justify-content-end p-1'>
                        <Button className='bg-orenge ms-3' variant="contained" type="submit"
                            onClick={onhandlecancel}
                        >Cancel</Button>
                    </div>

                    <Backdrop
                            sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                            onClick={handleClose}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                </div>
            </div>
        </>
    );
}