import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import rowstyle from './modules/table.module.css';
const TicketTable = () => {
    return (
        <div className='mx-4'>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow style={{}}>
                    <TableCell>Requester</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Agent</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Submitted on</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                    onMouseOver={{}} 
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className={rowstyle.row}>
                    <TableCell component="th" scope="row">Saeed Qatanani</TableCell>
                    <TableCell>Ticket Subject</TableCell>
                    <TableCell>Reina Handal</TableCell>
                    <TableCell>Open</TableCell>
                    <TableCell>January 2, 2023</TableCell>
                    </TableRow>
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className={rowstyle.row}>
                    <TableCell component="th" scope="row">Saeed Qatanani</TableCell>
                    <TableCell>Ticket Subject</TableCell>
                    <TableCell>Reina Handal</TableCell>
                    <TableCell>Open</TableCell>
                    <TableCell>January 2, 2023</TableCell>
                    </TableRow>
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className={rowstyle.row}>
                    <TableCell component="th" scope="row">Saeed Qatanani</TableCell>
                    <TableCell>Ticket Subject</TableCell>
                    <TableCell>Reina Handal</TableCell>
                    <TableCell>Open</TableCell>
                    <TableCell>January 2, 2023</TableCell>
                    </TableRow>
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className={rowstyle.row}>
                    <TableCell component="th" scope="row">Saeed Qatanani</TableCell>
                    <TableCell>Ticket Subject</TableCell>
                    <TableCell>Reina Handal</TableCell>
                    <TableCell>Open</TableCell>
                    <TableCell>January 2, 2023</TableCell>
                    </TableRow>
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className={rowstyle.row}>
                    <TableCell component="th" scope="row">Saeed Qatanani</TableCell>
                    <TableCell>Ticket Subject</TableCell>
                    <TableCell>Reina Handal</TableCell>
                    <TableCell>Open</TableCell>
                    <TableCell>January 2, 2023</TableCell>
                    </TableRow>
                    
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}

export default TicketTable
