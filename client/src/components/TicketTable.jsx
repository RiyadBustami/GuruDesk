import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import rowstyle from './modules/table.module.css';
import axios from 'axios';
import { useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
const TicketTable = () => {
    const [myTickets] = useOutletContext();
    const [tickets, setTickets] = useState(myTickets);
    const {status} = useParams();
    const getInitials = (name) => {
        return name.split(" ").map((n)=>n[0]).join("");
    }
    useEffect(()=>{
        status?
        setTickets(myTickets.filter((ticket)=>{if(ticket.status===status){return ticket}})):
        setTickets(myTickets)
    })

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
                        {tickets.map((ticket,i)=><TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className={rowstyle.row} key={i}>
                            <TableCell component="th" scope="row" sx={{display:'flex', alignItems:'center'}}>
                                <div style={{borderRadius:"50%", padding:"7px", width:"35px", height:"35px", backgroundColor:"#1778f2", color:"white", marginRight:"10px"}}>{getInitials(ticket.requester.firstName+" "+ticket.requester.lastName)}</div>
                                {ticket.requester.firstName+" "+ticket.requester.lastName}
                            </TableCell>
                            <TableCell><Link to={"/dashboard/ticket/"+ticket._id}>{ticket.subject}</Link></TableCell>
                            <TableCell>{ticket.assignee?ticket.assignee.firstName+" "+ticket.assignee.lastName:"Not assigned yet"}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                            <TableCell>{new Intl.DateTimeFormat('en-US',{year:'numeric', month:'long', day:'numeric'}).format(new Date(ticket.createdAt))}</TableCell>
                        </TableRow>)}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TicketTable
