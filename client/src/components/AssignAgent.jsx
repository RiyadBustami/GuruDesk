import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const AssignAgent = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users', { withCredentials: true })
            .then(res => {
                setAllUsers(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err))
        }, []);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(userId){
            axios.put("http://localhost:8000/api/users/"+userId,{isAgent:true},{withCredentials:true})
                .then(res=>console.log(res))
                .catch(err=>console.log(err))
        }
    }
    return (
        <div>
        <Container component="main" maxWidth="xs" sx={{ mt: 3 }}>
        <Box component="form" sx={{ mt: 1}} onSubmit={handleSubmit}>
            <h1 className='text-center'>Upgrade to Agent</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={allUsers.filter((user)=>{if(!user.isAdmin&&!user.isAgent)return user;}).map((user)=>{return {label: user.email, id: user._id}})}
                renderInput={(params) => <TextField {...params} label="Find User" variant="standard"/>}
                fullWidth
                sx={{my:3}}
                onChange={(event, newInputValue)=> {
                    setUserId(newInputValue.id)
                    console.log(newInputValue.id);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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

export default AssignAgent
