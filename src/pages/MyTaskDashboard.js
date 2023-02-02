// import * as React from 'react'; 
import MyTaskList from './MyTaskList';
import React, { useEffect, useState } from 'react';
// import {useLocation} from 'react-router-dom';

// import { useState } from "react";
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import MyTaskDetails from "./MyTaskDetails";
// import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import MyTaskDetailsDashboard from "./MyTaskDetailsDashboard";
import { Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ApplicationDetails from './ApplicationDetails';
import { fetchUrl } from '../Config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';




const BaseURL = fetchUrl;
const fetchMyTasks = "/fetchMyTasks"

const columns = [
    { id: 'Product_Code', label: 'Product Code' },
    { id: 'Appliction_No', label: 'Application No' },
    { id: 'No_of_Customer', label: 'No. of Customers' },
    { id: 'Application_Status', label: 'Application Status' },
    { id: 'Sanctioned_Date', label: 'Sanctioned Date' },
    { id: 'Last_Modified_By', label: 'Last Modified By' },
    { id: 'Branch_Code', label: 'Branch Code' },
    { id: 'Action', label: 'Action', align: 'center' },
];


function MyTaskDashboard(props) {
    const [navbar, setnavbar] = useState(false);
    const [Mytasklead, setMytasklead] = useState([]);
    const [mytaskQueue, setmytaskQueue] = useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [mytask, setmytask] = React.useState([]);
    const [mytaskTitle, setMytaskTitle] = React.useState('My Task List ( Application Details )');
    // const [batchNo , setBatchNo] = React.useState('');
    // const [batchNo1 , setBatchNo1] = React.useState('');
    // const [data, setdata] = useState(data);
    // const [mytaskapplist, setMytaskapplist] = useState(true);
    const Navigate = useNavigate();
    const location = useLocation();
    const [batchdata, setBatchdata] = React.useState()

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

    const onhandlechange = () => {
        setnavbar(!navbar);
    }

    React.useEffect(() => {
        handleToggle()
        const requestOptionsQueue = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "executorID": menu.username,
                "flag": "all",
                "queueID": ""
            }),
        };
        fetch(BaseURL + fetchMyTasks, requestOptionsQueue)
            .then(response => response.json())
            .then((response) => {
                setmytaskQueue(response.dataMap)
                handleClose()
            })
    }, []);


    const onMenuClick = menuName => (e) => {
        handleToggle()
        e.preventDefault();
        setMytaskTitle(menuName)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "executorID": menu.username,
                "flag": "all",
                "queueID": "",
                "queueName": menuName
            }),
        };
        fetch(BaseURL + fetchMyTasks, requestOptions)
            .then(response => response.json())
            .then((response) => {
                setmytask(response.data)
                handleClose()
            })
    }

    const onHandleeditMytask = F1 => (e) => {
        e.preventDefault();
        window.localStorage.setItem("key", JSON.stringify(F1));
        window.localStorage.setItem("myTask", JSON.stringify(mytaskTitle));
        Navigate("/index/MyTask/MyTaskDetails", { state: menu });
    }

    const QueueList = Object.keys(mytaskQueue);
    const Queuevalue = Object.values(mytaskQueue);
 
    const menu = location.state;
    const onHnadleCancelMytask = () => {
        Navigate('/index', { state: menu })
    }

    return (
        <div className="App">
            <div className="sidebarcontainer"><div className="main2">
                <div className="menu2">
                    <div className={navbar ? "sidenav" : "unset_sidenav"}>
                        <div className="menuIcon" onClick={onhandlechange}>&#9776;</div>
                        {
                            navbar ? <> <div className="holder"></div>
                                <div>
                                    {
                                        QueueList.map((value, i) =>
                                            <div className="holder myTaskList1" onClick={onMenuClick(value)} key={i}>
                                                <span className="ms- badge rounded-pill bg-white">{Queuevalue[i]}</span>
                                                <span className="ms-2">{value}
                                                </span>
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                                : <>
                                    <div>
                                        {
                                            QueueList.map((value, i) =>
                                                <div className="holder"
                                                    onClick={onMenuClick(value)}
                                                    key={i}>
                                                    <span className="ms"><span className="badge rounded-pill bg-white">{Queuevalue[i]}</span></span></div>
                                            )
                                        }
                                    </div>
                                </>
                        }
                    </div>
                </div>
                <div className='sectionMain'>
                    <div className={navbar ? "sectionclose2":"section2"}>
                        <div className='MyTaskDetails'>
                            <div className="card mt-4">
                                <div className="card-header ">
                                    {mytaskTitle}
                                </div>
                                <div className="card-body p-3">
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
                                                    {mytask
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row) => {
                                                            return (
                                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        padding="none"
                                                                    >
                                                                        {row.f3}
                                                                    </TableCell>
                                                                    <TableCell>{row.f4}</TableCell>
                                                                    <TableCell>{row.f12}</TableCell>
                                                                    <TableCell>{row.f11}</TableCell>
                                                                    <TableCell>{row.f13}</TableCell>
                                                                    <TableCell>{row.f14}</TableCell>
                                                                    <TableCell>{row.f2}</TableCell>
                                                                    <TableCell className="text-center editicon"><FontAwesomeIcon className='fs-5 text-orenge cursor-pointer'
                                                                        onClick={onHandleeditMytask(row.f1)} icon={faPenToSquare} />
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, 100]}
                                            component="div"
                                            count={mytask.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </div>
                                <div className=' d-flex justify-content-end p-1  '>
                                    <Button type="button" className='bg-orenge ms-3 ' variant="contained"  onClick={onHnadleCancelMytask}>Cancel</Button>
                                </div>
                                {/* <div className='d-flex justify-content-end'>
                                <button type="button" className="btn m-2 bg-orenge col-1 " onClick={onHnadleCancelMytask}>
                                    Cancel
                                </button>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div >
                </div>
                {/* <MyTaskList></MyTaskList> */}
            </div>
        </div>
    );
}

export default MyTaskDashboard;