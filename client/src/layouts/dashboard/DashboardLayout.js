import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import { useEffect } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:8000/api/loggedin', { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        setLoaded(true);
      })
      .catch(err => { console.log(err) });
  }, []);
  return (
    <StyledRoot>
      {loaded&&<Header user={user} onOpenNav={() => setOpen(true)} />}

      {loaded && <Nav user={user} openNav={open} onCloseNav={() => setOpen(false)} />}

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
