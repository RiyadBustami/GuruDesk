import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketView = () => {
    const bottomRef = useRef(null);
    const [ticket, setTicket] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [user, setUser ] = useState({});
    const [canAssign, setCanAssign] = useState(false);
    const [hasAuth, setHasAuth] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    });
    useEffect(()=>{
        axios.get("http://localhost:8000/api/tickets/"+id, {withCredentials:true})
            .then(res => {
                setTicket(res.data);
                setLoaded(true);
            })
            .catch(err=>console.log(err))
        axios.get('http://localhost:8000/api/loggedin', { withCredentials: true })
            .then(res => {
                setUser(res.data.user);
                user.isAdmin&&setHasAuth(true);
                user.isAgent&&setHasAuth(true);
            })
            .catch(err => { console.log(err) });
        ticket.assignee?setCanAssign(false):setCanAssign(true)
    },[loaded]);

    return (
        loaded&&<div style={{display:'flex', justifyContent:'space-between', backgroundColor:'white', padding:'15px', minWidth:'100%'}}>
            {/* main section with ticket description and comments */}
            <div>
                {/* ticket description */}
                <div className="card mx-2">
                    <div className="card-header" style={{backgroundColor:'#1778f2', color:'white'}}>
                        <h6>{ticket.requester.firstName+" "+ticket.requester.lastName}</h6>
                        <h6 style={{fontSize:'0.85rem'}}>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'medium', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone  }).format(new Date(ticket.createdAt))}</h6>
                    </div>
                    <div className="card-body" style={{backgroundColor:'white'}}>
                        <h5 className="card-title">{ticket.subject}</h5>
                        <p className="card-text">{ticket.description}</p>
                    </div>
                </div>
                {/* scroll div */}
                <div className='mx-2 my-4' style={{overflowY:"scroll", height:"300px", position:"relative"}} data-mdb-perfect-scrollbar='true'>
                    {/* comment client */}
                    
                    <div className="card mx-1 my-3" style={{border:'1px solid #f15412'}} >
                        <div className="card-header" style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #f15412'}}>
                            <div>Sender</div>
                            <div style={{fontSize:'0.9rem'}}>date</div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nam eos maxime aspernatur dolores veritatis quia sint accusantium possimus mollitia veniam corporis, nemo neque quae vel?</p>
                        </div>
                    </div>
                    {/* comment agent */}
                    <div className="card mx-1 my-3" style={{border:'1px solid #1778f2'}} >
                        <div className="card-header" style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #1778f2'}}>
                            <div>Sender</div>
                            <div style={{fontSize:'0.9rem'}}>date</div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nam eos maxime aspernatur dolores veritatis quia sint accusantium possimus mollitia veniam corporis, nemo neque quae vel?</p>
                        </div>
                    </div>
                    {/* comment client */}
                    <div className="card mx-1 my-3" style={{border:'1px solid #f15412'}} >
                        <div className="card-header" style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #f15412'}}>
                            <div>Sender</div>
                            <div style={{fontSize:'0.9rem'}}>date</div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nam eos maxime aspernatur dolores veritatis quia sint accusantium possimus mollitia veniam corporis, nemo neque quae vel?</p>
                        </div>
                    </div>
                    {/* comment agent */}
                    <div className="card mx-1 my-3" style={{border:'1px solid #1778f2'}} >
                        <div className="card-header" style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #1778f2'}}>
                            <div>Sender</div>
                            <div style={{fontSize:'0.9rem'}}>date</div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nam eos maxime aspernatur dolores veritatis quia sint accusantium possimus mollitia veniam corporis, nemo neque quae vel?</p>
                        </div>
                    </div>
                </div>
                <div className='mx-2' style={{border:'1px lightgray solid', borderRadius:'5px', padding:'15px'}}>
                <TextField
                    id="standard-multiline-static"
                    label="Comment"
                    multiline
                    rows={4}
                    variant="standard"
                    fullWidth
                    />
                <div className='text-end mt-3'>
                <Button variant="contained" type="submit">Send</Button>
                </div>
                </div>
            </div>
            {/* side bar with ticket details */}
            <div className='mx-2'>
                <div className="card" style={{width:"18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title mb-3">Ticket Info</h5>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Ticket ID:</span> <span style={{fontSize:"0.8rem"}}>{ticket._id}</span></h6>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Created at:</span> <span style={{fontSize:"0.8rem"}}>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone  }).format(new Date(ticket.createdAt))}</span></h6>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Status:</span> <span style={{fontSize:"0.8rem"}}>{ticket.status}</span></h6>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Priority:</span> <span style={{fontSize:"0.8rem"}}>{ticket.priority}</span></h6>
                    </div>
                </div>
                <div className="card my-3" style={{width:"18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title mb-3">Requester</h5>
                        <h6 className="card-subtitle mb-4">{ticket.requester.firstName+" "+ticket.requester.lastName}</h6>
                        <h5 className="card-title mb-3">Agent</h5>
                        <h6 className="card-subtitle mb-2">{ticket.assignee?ticket.assignee.firstName+" "+ticket.assignee.lastName:"Not assigned"}</h6>
                    </div>
                </div>
                {
                    hasAuth&&<>
                <form className='mt-4'>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Change Ticket Status</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Age"
                        // onChange={handleChange}
                        >
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Solved">Solved</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" fullWidth sx={{mt:3}}>
                        <InputLabel id="demo-simple-select-standard-label">Change Ticket Priority</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Age"
                        // onChange={handleChange}
                        >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Normal">Normal</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <div className='mt-4'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={agents}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Assign an Agent" variant="standard"/>}
                            />
                    </div> */}
                    <div className='text-end mt-4'>
                        <Button variant="contained" type="submit">Submit</Button>
                    </div>
                </form>
                {canAssign&&<div className='text-end mt-5'>
                    <Button variant="contained" size="large" sx={{backgroundColor:'#F15412'}} type="submit">Assign me as Agent</Button>
                </div>}
                </>}
            </div>
        </div>
    )
}

export default TicketView
