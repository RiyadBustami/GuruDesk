import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';

const TicketForm = () => {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [subjectError, setSubjectError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [myTickets, setMyTickets, user] = useOutletContext();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/tickets', {
            subject,
            description
        },{withCredentials:true})
        .then(res=>{
            console.log(res);
            setMyTickets(myTickets.concat({subject,description,requester:user, status:"New", createdAt:new Date()}))
            navigate("/dashboard")
        })
        .catch(err=>console.log(err))
    }

    const handleSubject = e => {
        if(e.target.value.length>25 && e.target.value.length>0){
            setSubjectError("Ticket subject should be no more than 25 characters")
        } else {
            setSubjectError("");
            setSubject(e.target.value);
        }
    }

    const handleDesc = e => {
        if(e.target.value.length>1500 && e.target.value.length>0){
            setDescriptionError("Ticket description must be no more than 1500 characters")
        } else {
            setDescriptionError("");
            setDescription(e.target.value);
        }
    }

    return (
        <div>
        <Container component="main" maxWidth="xs" sx={{ mt: 3 }}>
        <Box component="form" sx={{ mt: 1}} onSubmit={handleSubmit}>
            <h1 className='text-center'>Submit a ticket</h1>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Subject"
                onChange={handleSubject}
                autoFocus
                sx={{ mb: 3 }}
                helperText={subjectError}
            />
            <TextField
                id="outlined-multiline-static"
                required
                fullWidth
                label="Description"
                onChange={handleDesc}
                multiline
                rows={8}
                helperText={descriptionError}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Submit
                </Button>
        </Box>
        </Container>
        </div>
    )
}

export default TicketForm
