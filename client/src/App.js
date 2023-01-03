import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import TicketForm from './components/TicketForm';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import TicketTable from './components/TicketTable';
import TicketView from './components/TicketView';

import AssignAgent from './components/AssignAgent';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState();
  const [myTickets, setMyTickets] = useState([]);
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/registration" element={<SignUp/>}/>
        <Route path="/dashboard" element={<DashboardLayout tickets={myTickets}/>}>
          <Route path="" element={<TicketTable/>}/>
          <Route path="tickets/:status" element={<TicketTable/>}/>
          <Route path="tickets/create" element={<TicketForm/>}/>
          <Route path="ticket/:id" element={<TicketView/>}/>
          <Route path="admin/users/upgrade" element={<AssignAgent />}/>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;



