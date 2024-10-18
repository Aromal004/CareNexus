import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import React from 'react';
import { Provider } from 'react-redux';
import store from './components/store';
import SecondPage from './pages/SecondPage';
import Home from './pages/Home';
import Layout from './hocs/Layout';
import ReqResetPass from './pages/ReqResetPass';
import Resetpass from './pages/Resetpass';
import Activate from './pages/Activate';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import HospitalAdministration from './components/HospitalAdministration';
import Doctor from './components/Doctor';
import Patient from './components/Patient';

function App() {


  return (
    <Provider store={store}>
      <Router >
        <Layout>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ReqResetPass />} />
              <Route path="/" element={<Home />} />
              <Route exact path='/password/reset/confirm/:uid/:token' element={<Resetpass />} />
              <Route exact path='/activate/:uid/:token' element={<Activate />} />
              <Route path='/secondpage' element={<SecondPage />} />
              <Route path="/landingpage" element={<LandingPage />} /> 
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/user_info/Patient-Details' element={<Patient />} />
              <Route path='/user_info/Doctor-Details' element={<Doctor />} />
              <Route path='/user_info/HospitalAdmin-Details' element={<HospitalAdministration />} />
            </Routes>
          </Layout>
      </Router>
      
    </Provider>
    
  )
}

export default App
