import { Children, useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import { useEffect } from 'react';
import axios from 'axios';
import { set } from 'date-fns';

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

export default function DashboardLayout(props) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [myTickets, setMyTickets] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:8000/api/loggedin', { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        if (res.data.user.isAdmin||res.data.user.isAgent) {
          axios.get("http://localhost:8000/api/tickets", {withCredentials:true})
            .then(res=>{
              setMyTickets(res.data);
              setLoaded(true);
            })
            .catch(err=>console.log(err))
        }
        else{
        axios.get('http://localhost:8000/api/tickets/user/' + res.data.user.id, { withCredentials: true })
          .then(res => {
            setMyTickets(res.data);
            setLoaded(true);
          })
          .catch(err => console.log(err))
        }
        setLoaded(true);
      })
      .catch(err => { console.log(err) });

  }, []);
  return (
    <StyledRoot>
      {loaded && <Header user={user} onOpenNav={() => setOpen(true)} />}

      {loaded && <Nav user={user} openNav={open} onCloseNav={() => setOpen(false)} />}
      <Main>
        <Outlet context={[myTickets, setMyTickets]} />
      </Main>
    </StyledRoot>
  );
}
