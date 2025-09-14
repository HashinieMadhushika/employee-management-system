import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import SignUpPage from './Pages/SignUpPage';


function App() {
  return (
    <div className="App">
       <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      </Router>
    </div>

  );
}

export default App;
