import React, { useEffect, useRef } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

const TicketView = () => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    });

    const agents = ['reina','saeed','riyad','ameer'];

    return (
        <div style={{display:'flex', justifyContent:'space-between', backgroundColor:'white', padding:'15px', minWidth:'100%'}}>
            {/* main section with ticket description and comments */}
            <div>
                {/* ticket description */}
                <div className="card mx-2">
                    <div className="card-header" style={{backgroundColor:'#1778f2', color:'white'}}>
                        <h6>Ticket Requester Name</h6>
                        <h6 style={{fontSize:'0.85rem'}}>Ticket created at date</h6>
                    </div>
                    <div className="card-body" style={{backgroundColor:'white'}}>
                        <h5 className="card-title">Ticket Subject</h5>
                        <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem id unde qui, natus quisquam architecto aliquam esse asperiores consectetur numquam corrupti voluptates, deleniti animi facilis? Non vero libero magnam nihil!</p>
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
                    <div ref={bottomRef} />
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
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Ticket ID:</span></h6>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Created:</span></h6>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Status:</span></h6>
                        <h6 className="card-subtitle mb-2"><span className='text-muted'>Priority:</span></h6>
                    </div>
                </div>
                <div className="card my-3" style={{width:"18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title mb-3">Requester</h5>
                        <h6 className="card-subtitle mb-4">requester name</h6>
                        <h5 className="card-title mb-3">Agent</h5>
                        <h6 className="card-subtitle mb-2">agent name</h6>
                    </div>
                </div>
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
                    {/* <div className='mt-4'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={agents}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Assign an Agent" variant="standard"/>}
                            />
                    </div> */}
                    <div className='text-end mt-3'>
                        <Button variant="contained" type="submit">Submit</Button>
                    </div>
                </form>
                <div className='text-end mt-5'>
                    <Button variant="contained" size="large" sx={{backgroundColor:'#F15412'}} type="submit">Assignee me as Agent</Button>
                </div>
            </div>
        </div>
    )
}

export default TicketView
