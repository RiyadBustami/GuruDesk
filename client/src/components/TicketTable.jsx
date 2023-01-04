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
import Chip from '@mui/material/Chip';

const TicketTable = () => {
    const [myTickets, ,user] = useOutletContext();
    const [tickets, setTickets] = useState(myTickets);
    const [agenttickets, setAgentTickets] = useState(myTickets);
    const {status} = useParams();
    const getInitials = (name) => {
        return name.split(" ").map((n)=>n[0]).join("");
    }
    useEffect(()=>{
        console.log(user);
        user?.isAgent&&setAgentTickets(myTickets.filter((ticket)=>{if(ticket?.assignee?._id===user._id){return ticket}}).filter((ticket=>{
            if(status){
                if(ticket?.status===status)return ticket;
            }
            else{
                return ticket;
            }
        })));
        status?
        setTickets(myTickets.filter((ticket)=>{if(ticket.status===status){return ticket}})):
        setTickets(myTickets)
    }, [user, myTickets, status]);

    return (
        <div className='mx-4'>
        {user?.isAgent&&<TableContainer component={Paper}>
                <h2 className='my-4 text-center'>My tickets</h2>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{}}>
                            <TableCell width="25%">Requester</TableCell>
                            <TableCell width="25%">Subject</TableCell>
                            <TableCell width="15%">Priority</TableCell>
                            <TableCell width="15%">Status</TableCell>
                            <TableCell width="20%">Submitted on</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {agenttickets.map((ticket,i)=><TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className={rowstyle.row} key={i}>
                            <TableCell component="th" scope="row" sx={{display:'flex', alignItems:'center'}}>
                                <div style={{borderRadius:"50%", padding:"7px", width:"35px", height:"35px", backgroundColor:"#1778f2", color:"white", marginRight:"10px",fontFamily:"sans-serif", fontSize:"0.95rem"}}>{getInitials(ticket.requester.firstName+" "+ticket.requester.lastName)}</div>
                                {ticket.requester.firstName+" "+ticket.requester.lastName}
                            </TableCell>
                            <TableCell><Link to={"/dashboard/ticket/"+ticket._id}>{ticket.subject}</Link></TableCell>
                            <TableCell>{ticket.priority}</TableCell>
                            {/* 'New','Open','Pending','Solved','Closed' */}
                            <TableCell>
                                {ticket.status ==='New' ? <Chip label={ticket.status} variant="outlined" sx={{border:"solid 1px #f15412", color:"#f15412", width:"75px"}}/> 
                                : ticket.status ==='Open' ? <Chip label={ticket.status} variant="outlined" sx={{border:"solid 1px #2979ff",color:"#2979ff", width:"75px"}}/> 
                                : ticket.status === 'Pending' ? <Chip label={ticket.status} variant="outlined" sx={{border:"solid 1px #ffc400",color:"#ffc400", width:"75px"}}/> 
                                : ticket.status === 'Solved' ? <Chip label={ticket.status} variant="outlined" sx={{border:"solid 1px #00a152",color:"#00a152", width:"75px"}} />
                                : <Chip label={ticket.status} variant="outlined" sx={{border:"solid 1px #a9a9a9",color:"#a9a9a9", width:"75px"}} />}
                            </TableCell>
                            <TableCell>{new Intl.DateTimeFormat('en-US',{year:'numeric', month:'long', day:'numeric'}).format(new Date(ticket.createdAt))}</TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>}
            <h2 className='my-4 text-center'>All tickets</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{}}>
                            <TableCell width="20%">Requester</TableCell>
                            <TableCell width="20%">Subject</TableCell>
                            <TableCell width="20%">Agent</TableCell>
                            <TableCell width="20%">Status</TableCell>
                            <TableCell width="20%">Submitted on</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((ticket,i)=><TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className={rowstyle.row} key={i}>
                            <TableCell component="th" scope="row" sx={{display:'flex', alignItems:'center'}}>
                                <div style={{borderRadius:"50%", padding:"7px", width:"35px", height:"35px", backgroundColor:"#1778f2", color:"white", marginRight:"10px",fontFamily:"sans-serif", fontSize:"0.95rem"}}>{getInitials(ticket.requester.firstName+" "+ticket.requester.lastName)}</div>
                                {ticket.requester.firstName+" "+ticket.requester.lastName}
                            </TableCell>
                            <TableCell><Link to={"/dashboard/ticket/"+ticket._id}>{ticket.subject}</Link></TableCell>
                            <TableCell>{ticket.assignee?ticket.assignee.firstName+" "+ticket.assignee.lastName:"Not assigned yet"}</TableCell>
                            {/* 'New','Open','Pending','Solved','Closed' */}
                            <TableCell>
                                {ticket.status ==='New' ? <Chip label={ticket.status} variant="outlined" sx={{border:"solid 1px #f15412", color:"#f15412", width:"75px"}}/> 
                                : ticket.status ==='Open' ? <Chip label={ticket.status} variant="outlined" sx={{border:"solid 1px #2979ff",color:"#2979ff", width:"75px"}}/> 
                                : ticket.status === 'Pending' ? <Chip label={ticket.status} variant="outlined" sx={{border:"solid 1px #ffc400",color:"#ffc400", width:"75px"}}/> 
                                : ticket.status === 'Solved' ? <Chip label={ticket.status} variant="outlined" sx={{border:"solid 1px #00a152",color:"#00a152", width:"75px"}} />
                                : <Chip label={ticket.status} variant="outlined" sx={{border:"solid 1px #a9a9a9",color:"#a9a9a9", width:"75px"}} />}
                            </TableCell>
                            <TableCell>{new Intl.DateTimeFormat('en-US',{year:'numeric', month:'long', day:'numeric'}).format(new Date(ticket.createdAt))}</TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TicketTable
