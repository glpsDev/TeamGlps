import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const columns = [
    { id: 'Sr', label: 'Sr', },
    { id: 'Meeting Center Name', label: 'Meeting Center Name', },
    { id: 'CREC Name', label: 'CREC Name', },
    { id: 'Repayment', label: 'Repayment', },
    { id: 'Repayment Time', label: 'Repayemt Time', },
    { id: 'Repayment Date', label: 'Repayment Date', },
    { id: 'Remark', label: 'Remark', }

];

function NFD() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [nfd, setNfd] = React.useState([]);


    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    }

    const handleCurrentNFD = async (event) => {
        handleClose()
        event.preventDefault();
        handleToggle()
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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

    return (
        <>
            <form onSubmit={""}>
                <div className='NFD'>
                    <div className='searchBox mt-4'>
                        <div className="card">
                            <div className="card-header ">NFD</div>
                            <div className="card-body py-">
                                {/* <form> */}
                                <div className='mb-4 d-flex'>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select branch Code</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='branchCode'
                                            value={""}
                                            label="Select branch Code"
                                            onChange={""}
                                        ><MenuItem value="......">------Select------</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div className='d-flex p-1'>
                                    <Button className='bg-orenge ms-3' variant="contained" type="submit" onClick={handleCurrentNFD}>Search</Button>
                                    </div>
                                </div>
                                <div className='mb-3 d-flex'>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"> Select Meeting Center Code</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="MeetingCenterCode"
                                            value={""}
                                            label="Meeting Center Code"
                                            onChange={""}
                                        >
                                            <MenuItem value="......">------Select------</MenuItem>

                                        </Select>
                                    </FormControl>
                                    <div className='d-flex p-1'>
                                    <Button className='bg-orenge ms-3' variant="contained" type="submit" onClick={handleCurrentNFD}>Search</Button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </form>

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
                                {nfd
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell >{index + 1}</TableCell>
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
                        count={nfd.length}
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

                <div className='col-12 d-flex align-item-center justify-content-end'>
                <div className='d-flex p-1'>
                    <Button className='bg-orenge' variant="contained" type="submit"
                        onClick={onhandlecancel}
                    >Cancel</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default NFD;
