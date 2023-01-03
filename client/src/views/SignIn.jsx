import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as Logo } from '../images/gurudesklogo.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                GuruDesk
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/loggedin', { withCredentials: true })
            .then(res => navigate("/dashboard"))
            .catch(err => { console.log(err) });
    }, []);

    const login = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email,
            password
        }, { withCredentials: true })
            .then(res => {
                navigate("/dashboard");
            })
            .catch(err => {console.log(err); setError("Please check your email address and password then try again.")})
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Logo />
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }} onSubmit={login}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={e => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {
                            error?
                            <p style={{color:"#f15412", fontSize:"0.85rem", margin:"0"}}>{error}</p>
                            :
                            <></>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2">
                    Forgot password?
                    </Link> */}
                            </Grid>
                            <Grid item>
                                <Link href="/registration" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}