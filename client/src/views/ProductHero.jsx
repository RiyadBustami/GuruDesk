import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import { NavLink as RouterLink } from 'react-router-dom';
import { Grid, Link } from '@mui/material';
import backgroundimg from '../images/5124556.jpg';
import { Box, display } from '@mui/system';

export default function ProductHero() {
    return (
        <Box style={{ display: 'flex' }}
        >
            <Box style={{ width: "60%", marginLeft: "10%", marginTop: "4%", marginBottom:"4%", textAlign: "center" }}>
                <Typography align="center" variant="h4" marked="center">
                    A simple ticketing system for a team like yours
                </Typography>
                <Typography
                    color="black"
                    align="center"
                    variant="h5"
                    sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
                >
                    Manage all your customer messages in one place. Build better bonds automatically.
                </Typography>
                <Link component={RouterLink} to="/registration" underline="none">
                    <Button
                        color="secondary"
                        variant="contained"
                        size="large"
                        component="a"
                        sx={{ minWidth: 200 }}
                        style={{ color: "#fff" }}
                    >
                        Free Trial
                    </Button>
                </Link>
            </Box>
            <Box>
                <img src={backgroundimg} style={{ width: "60%", marginLeft: "30%" }}></img>
            </Box>
        </Box>
    );
}