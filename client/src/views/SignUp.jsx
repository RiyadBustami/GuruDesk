import React from 'react'
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
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fNameError, setFNameError] = useState("");
    const [lNameError, setLNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPWError, setConfirmPWError] = useState("");
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/loggedin', { withCredentials: true })
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // }, []);

    const register = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }, { withCredentials: true })
            .then(res => {
                if (res.data.code === 11000) {
                    setEmailError("Email already registered!");
                }
                else {
                    navigate("/dashboard");
                }

            })
            .catch(err => console.log(err))
    }

    const handleFirstName = (e) => {
        if (e.target.value.length < 2 && e.target.value.length > 0) {
            setFNameError("First Name must be at least 2 characters")
        } else {
            setFNameError("");
            setFirstName(e.target.value);
        }
    }

    const handleLastName = (e) => {
        if (e.target.value.length < 2 && e.target.value.length > 0) {
            setLNameError("Last Name must be at least 2 characters");
        } else {
            setLNameError("");
            setLastName(e.target.value);
        }
    }

    const handlePW = (e) => {
        const regex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (!regex.test(e.target.value) && e.target.value.length > 0) {
            setPasswordError("Your password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character")
        } else {
            setPasswordError("");
            setPassword(e.target.value);
        }
    }
    const handleEmail = (e) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!regex.test(e.target.value) && e.target.value.length > 0) {
            setEmailError("Please enter a valid email")
        } else {
            setEmailError("");
            setEmail(e.target.value);
        }
    }

    const handleConfirmPW = (e) => {
        if (e.target.value !== password && e.target.value.length > 0) {
            setConfirmPWError("The password confirmation does not match");
        } else {
            setConfirmPWError("");
            setConfirmPassword(e.target.value);
        }
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
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" sx={{ mt: 3 }} onSubmit={register}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {
                                    fNameError ?
                                        <TextField
                                            error
                                            required
                                            fullWidth
                                            id="outlined-error-helper-text"
                                            label="First Name"
                                            onChange={handleFirstName}
                                            helperText={fNameError}
                                        /> :
                                        <TextField
                                            autoComplete="given-name"
                                            onChange={handleFirstName}
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                        />
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {
                                    lNameError ?
                                        <TextField
                                            error
                                            required
                                            fullWidth
                                            id="outlined-error-helper-text"
                                            label="Last Name"
                                            onChange={handleLastName}
                                            helperText={lNameError}
                                        /> :
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            onChange={handleLastName}
                                            autoComplete="family-name"
                                        />
                                }
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    emailError ?
                                        <TextField
                                            error
                                            required
                                            fullWidth
                                            id="outlined-error-helper-text"
                                            label="Email Address"
                                            onChange={handleEmail}
                                            helperText={emailError}
                                        /> :
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            onChange={handleEmail}
                                            autoComplete="email"
                                        />
                                }
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    passwordError ?
                                        <TextField
                                            error
                                            required
                                            fullWidth
                                            id="outlined-error-helper-text"
                                            label="Password"
                                            type="password"
                                            onChange={handlePW}
                                            helperText={passwordError}
                                        /> :
                                        <TextField
                                            required
                                            fullWidth
                                            onChange={handlePW}
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                }
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    confirmPWError ?
                                        <TextField
                                            error
                                            required
                                            fullWidth
                                            id="outlined-error-helper-text"
                                            label="Confirm Password"
                                            type="password"
                                            onChange={handleConfirmPW}
                                            helperText={confirmPWError}
                                        /> :
                                        <TextField
                                            required
                                            fullWidth
                                            onChange={handleConfirmPW}
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete="new-password"
                                        />
                                }
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    )
}

export default SignUp