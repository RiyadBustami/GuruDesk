import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Typography from '../theme/overrides/Typography';

const AssignAgent = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users', { withCredentials: true })
            .then(res => {
                setAllUsers(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            const confirmed = window.confirm("Are you sure?");
            if (confirmed) {
                axios.put("http://localhost:8000/api/users/" + user.id, { isAgent: true }, { withCredentials: true })
                    .then(res => {
                        console.log(res);
                        setMsg(res.data.email + " is assigned as agent.")
                        const index = allUsers.indexOf(user);
                        setAllUsers(allUsers.filter((element)=>{if(element._id!==user.id)return element}));
                        setUser(null);

                    })
                    .catch(err => console.log(err))
            }
        }
    }
    return (
        <div>
            <Container component="main" maxWidth="xs" sx={{ mt: 3 }}>
                <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <h1 className='text-center'>Upgrade to Agent</h1>
                    {loaded && <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={allUsers.filter((user) => { if (!user.isAdmin && !user.isAgent) return user; }).map((user) => { return { label: user.email, id: user._id } })}
                        renderInput={(params) => <TextField {...params} label="Find User" variant="standard" />}
                        fullWidth
                        sx={{ my: 3 }}
                        onChange={(event, newInputValue) => {
                            setUser(newInputValue)
                            console.log(newInputValue);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={user}
                    />}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                    {msg&&<p style={{fontSize:"1rem", color:'green'}}>{msg}</p>}
                </Box>
            </Container>
        </div>
    )
}

export default AssignAgent
