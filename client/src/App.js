import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn/>}></Route>
      <Route path="/registration" element={<SignUp/>}></Route>
    </Routes>
  );
}

export default App;
