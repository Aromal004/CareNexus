import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPass from './pages/Resetpass';
import React,{useState} from 'react';
import { Provider } from 'react-redux';
import store from './components/store';

function App() {


  return (
    <Provider store={store}>
      <Router >
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPass />} />
          </Routes>
      </Router>
    </Provider>
    
  )
}

export default App
