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

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/registration" element={<SignUp/>}/>
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route path='' element={<Navigate to="/dashboard/tickets"/>} />
          <Route path="tickets" element={<TicketTable/>}/>
          <Route path="tickets/new" element={<TicketForm/>}/>
          <Route path="ticket/:id" element={<TicketView />}/>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;



