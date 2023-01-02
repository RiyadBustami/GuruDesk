import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Test from './views/Test';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn/>}></Route>
      <Route path="/registration" element={<SignUp/>}></Route>
      <Route path="/success" element={<Test/>}></Route>
    </Routes>
  );
}

export default App;
