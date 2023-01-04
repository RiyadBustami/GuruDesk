import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client'

const TicketView = () => {
    const bottomRef = useRef(null);
    const [ticket, setTicket] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [myTickets, setMyTickets] = useOutletContext();
    const [comment, setComment] = useState("");
    const [ticketComments, setTicketComments] = useState([]);
    const [socket] = useState(() => io(':8000', { query: { ticketId: id } }));
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        // socket.emit('comment',"hello from tizi",id);
        // socket.on('comment', data=>console.log(data))
        socket.on(id, data => setRefresh(refresh+1));
        console.log(ticketComments);
        return () => socket.disconnect(true);
    }, [])
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
    useEffect(() => {
        axios.get('http://localhost:8000/api/loggedin', { withCredentials: true })
            .then(res => {
                setUser(res.data.user);
                axios.get("http://localhost:8000/api/tickets/" + id, { withCredentials: true })
                    .then(res => {
                        setTicket(res.data);
                        axios.get("http://localhost:8000/api/comments/ticket/" + id, { withCredentials: true })
                            .then(res => {
                                setTicketComments(res.data);
                                setLoaded(true);
                            })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => { console.log(err) });
    }, [id,ticketComments]);

    const assignMe = (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Are you sure?");
        if (confirmed) {
            axios.put("http://localhost:8000/api/tickets/" + id, { assignee: user.id }, { withCredentials: true })
                .then(res => {

                    setTicket({ ...ticket, assignee: user, status: "Open" });
                    setMyTickets(myTickets.map((element) => {
                        if (element._id === ticket._id) {
                            element.assignee = user;
                            element.status = "Open";
                        }
                        return element;
                    }))
                })
                .catch(err => console.log(err))
        }
    }
    const sendComment = (e) => {
        if (comment.length > 0) {
            axios.post("http://localhost:8000/api/comments", { user: user, ticket: ticket._id, text: comment }, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    res.data.user = user;
                    setTicketComments([...ticketComments, res.data]);
                    setComment("");
                    socket.emit(id, res.data);
                })
                .catch(err => console.log(err))
        }
    }

    const handleStatusSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/tickets/" + id, { status }, { withCredentials: true })
            .then(res => {
                setTicket({ ...ticket, status: status });
                setMyTickets(myTickets.map((element) => {
                    if (element._id === ticket._id) {
                        element.status = status;
                    }
                    return element;
                }));
                setStatus('');
            })
            .catch(err => console.log(err))
    }

    const handlePriortySubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/tickets/" + id, { priority }, { withCredentials: true })
            .then(res => {
                setTicket({ ...ticket, priority: priority });
                setMyTickets(myTickets.map((element) => {
                    if (element._id === ticket._id) {
                        element.priority = priority;
                    }
                    return element;
                }));
                setPriority('');
            })
            .catch(err => console.log(err))
    }

    return (
        loaded && <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', padding: '15px' }}>
            {/* main section with ticket description and comments */}
            <div style={{ minWidth: '65%' }}>
                {/* ticket description */}
                <div className="card mx-2">
                    <div className="card-header" style={{ backgroundColor: '#1778f2', color: 'white' }}>
                        <h6>{ticket.requester.firstName + " " + ticket.requester.lastName}</h6>
                        <h6 style={{ fontSize: '0.85rem' }}>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'medium', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }).format(new Date(ticket.createdAt))}</h6>
                    </div>
                    <div className="card-body" style={{ backgroundColor: 'white' }}>
                        <h5 className="card-title">{ticket.subject}</h5>
                        <p className="card-text">{ticket.description}</p>
                    </div>
                </div>
                {/* scroll div */}
                <div className='mx-2 my-4' style={{ overflowY: "scroll", height: "300px", position: "relative" }} data-mdb-perfect-scrollbar='true'>
                    {ticketComments.map((comment, i) => {
                        if (comment?.user?.isAgent) {
                            return <div className="card mx-1 my-3" style={{ border: '1px solid #1778f2' }} key={i} >
                                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1778f2' }}>
                                    <div>{comment?.user?.firstName + " " + comment?.user?.lastName}</div>
                                    <div style={{ fontSize: '0.9rem' }}>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }).format(new Date(ticket.createdAt))}</div>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{comment?.text}</p>
                                </div>
                            </div>
                        }
                        else {
                            return <div className="card mx-1 my-3" style={{ border: '1px solid #f15412' }} key={i}>
                                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f15412' }}>
                                    <div>{comment?.user?.firstName + " " + comment?.user?.lastName}</div>
                                    <div style={{ fontSize: '0.9rem' }}>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }).format(new Date(ticket.createdAt))}</div>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{comment?.text}</p>
                                </div>
                            </div>

                        }
                    })}
                    {/* comment client */}
                    {/* <div className="card mx-1 my-3" style={{ border: '1px solid #f15412' }} >
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f15412' }}>
                            <div>Sender</div>
                            <div style={{ fontSize: '0.9rem' }}>date</div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nam eos maxime aspernatur dolores veritatis quia sint accusantium possimus mollitia veniam corporis, nemo neque quae vel?</p>
                        </div>
                    </div> */}
                    {/* comment agent */}
                    {/* <div className="card mx-1 my-3" style={{ border: '1px solid #1778f2' }} >
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1778f2' }}>
                            <div>Sender</div>
                            <div style={{ fontSize: '0.9rem' }}>date</div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nam eos maxime aspernatur dolores veritatis quia sint accusantium possimus mollitia veniam corporis, nemo neque quae vel?</p>
                        </div>
                    </div> */}
                    {/* comment client */}
                    {/* <div className="card mx-1 my-3" style={{ border: '1px solid #f15412' }} >
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f15412' }}>
                            <div>Sender</div>
                            <div style={{ fontSize: '0.9rem' }}>date</div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nam eos maxime aspernatur dolores veritatis quia sint accusantium possimus mollitia veniam corporis, nemo neque quae vel?</p>
                        </div>
                    </div> */}
                    {/* comment agent */}
                    {/* <div className="card mx-1 my-3" style={{ border: '1px solid #1778f2' }} >
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1778f2' }}>
                            <div>Sender</div>
                            <div style={{ fontSize: '0.9rem' }}>date</div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nam eos maxime aspernatur dolores veritatis quia sint accusantium possimus mollitia veniam corporis, nemo neque quae vel?</p>
                        </div>
                    </div> */}
                </div>
                {(ticket?.status !== "Closed" && (ticket?.assignee?._id === user?._id || ticket?.requester?._id === user?._id)) && <div className='mx-2' style={{ border: '1px lightgray solid', borderRadius: '5px', padding: '15px' }}>
                    <TextField
                        id="standard-multiline-static"
                        label="Comment"
                        multiline
                        rows={4}
                        variant="standard"
                        fullWidth
                        onChange={e => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='text-end mt-3'>
                        <Button variant="contained" type="submit" onClick={sendComment}>Send</Button>
                    </div>
                </div>}
            </div>
            {/* side bar with ticket details */}
            <div className='mx-2'>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title mb-3">Ticket Info</h5>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Ticket ID:</span> <span style={{ fontSize: "0.8rem" }}>{ticket._id}</span></h6>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Created at:</span> <span style={{ fontSize: "0.8rem" }}>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }).format(new Date(ticket.createdAt))}</span></h6>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Status:</span> <span style={{ fontSize: "0.8rem" }}>{ticket.status}</span></h6>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Priority:</span> <span style={{ fontSize: "0.8rem" }}>{ticket.priority}</span></h6>
                    </div>
                </div>
                <div className="card my-3" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title mb-3">Requester</h5>
                        <h6 className="card-subtitle mb-4">{ticket.requester.firstName + " " + ticket.requester.lastName}</h6>
                        <h5 className="card-title mb-3">Agent</h5>
                        <h6 className="card-subtitle mb-2">{ticket.assignee ? ticket.assignee.firstName + " " + ticket.assignee.lastName : "Not assigned"}</h6>
                    </div>
                </div>
                {
                    user.isAgent && <>
                        {
                            ticket.assignee && ticket?.assignee._id === user.id &&
                            <><form className='mt-4' onSubmit={handleStatusSubmit}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">Change Ticket Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Age"
                                        onChange={e => setStatus(e.target.value)}
                                        value={status}
                                    >
                                        <MenuItem value="Open">Open</MenuItem>
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Solved">Solved</MenuItem>
                                        <MenuItem value="Closed">Closed</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className='text-end mt-4'>
                                    <Button variant="contained" type="submit">Submit</Button>
                                </div>
                            </form>
                                <form className='mt-4' onSubmit={handlePriortySubmit}>
                                    <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Change Ticket Priority</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="Age"
                                            onChange={e => setPriority(e.target.value)}
                                            value={priority}
                                        >
                                            <MenuItem value="Low">Low</MenuItem>
                                            <MenuItem value="Normal">Normal</MenuItem>
                                            <MenuItem value="High">High</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div className='text-end mt-4'>
                                        <Button variant="contained" type="submit">Submit</Button>
                                    </div>
                                </form></>
                        }
                        {
                            !ticket?.assignee &&
                            <div className='text-end mt-5'>
                                <Button variant="contained" size="large" sx={{ backgroundColor: '#F15412' }} type="submit" onClick={assignMe}>Assign me as Agent</Button>
                            </div>
                        }
                    </>}
            </div>
        </div>
    )
}

export default TicketView
