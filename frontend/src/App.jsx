import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import React from 'react';
import { Provider } from 'react-redux';
import store from './components/store';
import Home from './pages/Home';
import Layout from './hocs/Layout';
import ReqResetPass from './pages/ReqResetPass';
import Resetpass from './pages/Resetpass';
import Activate from './pages/Activate';

function App() {


  return (
    <Provider store={store}>
      <Router >
        <Layout>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ReqResetPass />} />
              <Route path="/home" element={<Home />} />
              <Route exact path='/password/reset/confirm/:uid/:token' element={<Resetpass />} />
              <Route exact path='/activate/:uid/:token' element={<Activate />} />
            </Routes>
          </Layout>
      </Router>
      
    </Provider>
    
  )
}

export default App
