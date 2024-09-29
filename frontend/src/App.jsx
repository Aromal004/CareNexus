import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPass from './pages/Resetpass';

function App() {


  return (

    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPass />} />
        </Routes>
    </Router>
  
    
  )
}

export default App
