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
            <Box style={{ width: "60%", marginLeft: "10%", marginTop: "5%", textAlign: "center" }}>
                <Typography align="center" variant="h2" marked="center">
                    Upgrade your Sundays
                </Typography>
                <Typography
                    color="black"
                    align="center"
                    variant="h5"
                    sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
                >
                    Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
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
                        Register
                    </Button>
                </Link>
                <Typography variant="body2" color="black" sx={{ mt: 2 }}>
                    Discover the experience
                </Typography>
            </Box>
            <Box>
                <img src={backgroundimg} style={{ width: "60%", marginLeft: "30%" }}></img>
            </Box>
        </Box>
    );
}