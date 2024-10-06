import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPass from './pages/Resetpass';
import React,{useState} from 'react';
import { Provider } from 'react-redux';
import store from './components/store';
import SecondPage from './pages/SecondPage';
import User_chk from './components/user_chk';



function App() {


  return (
    <Provider store={store}>
      <Router >
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPass />} />
            <Route path="/SecondPage" element={<SecondPage />} />
            <Route path="/" element={<User_chk />} />

          </Routes>
      </Router>
    </Provider>
    
  )
}

export default App
