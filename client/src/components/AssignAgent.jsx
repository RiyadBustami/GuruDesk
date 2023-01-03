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

    useEffect(() => {
        axios.get('http://localhost:8000/api/users', { withCredentials: true })
            .then(res => {
                setAllUsers(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err))
        }, []);

    return (
        <div>
        <Container component="main" maxWidth="xs" sx={{ mt: 3 }}>
        <Box component="form" sx={{ mt: 1}}>
            <h1 className='text-center'>Upgrade to Agent</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={allUsers.map((user)=>{return {label: user.email, id: user._id}})}
                renderInput={(params) => <TextField {...params} label="Find User" variant="standard"/>}
                fullWidth
                sx={{my:3}}
                onChange={(event, newInputValue)=> {
                    console.log(newInputValue.id)
                }}
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
