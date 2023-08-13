import './App.css';
import ForgotPass from './components/ForgotPass';
import Login from './components/Login';
import Register from './components/Register';
import ResetPass from './components/ResetPass';
import {BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPass/>}/>
        <Route path='/reset-password/:token' element={<ResetPass/>}/>
      </Routes>
    </Router>
  );
}

export default App;
