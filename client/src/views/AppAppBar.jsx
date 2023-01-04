import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/ToolBar';
import { NavLink as RouterLink } from 'react-router-dom';
import logo from '../images/gurudesk-white.png';
const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
};

function AppAppBar() {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flex: -3 }} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        href="/premium-themes/onepirate/"
                        sx={{ fontSize: 24 }}
                    >
                        <img src={logo} ></img>

                    </Link>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Link
                            Link component={RouterLink} to="/login"
                            color="inherit"
                            variant="h6"
                            underline="none"
                            sx={rightLink}
                            style={{ color: "#fff" }}
                        >
                            {'Sign In'}
                        </Link>
                        <Link
                            Link component={RouterLink} to="/registration"
                            variant="h6"
                            underline="none"
                            style={{ color: "#fff" }}
                            sx={{ ...rightLink, color: 'white' }}
                        >
                            {'Sign Up'}
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

export default AppAppBar;