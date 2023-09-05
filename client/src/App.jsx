import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavTabs from './components/NavTabs';
import UserLogin from './pages/Login';
import TaskBoard from '../src/pages/TaskBoard';
import Signup from './pages/Signup';
import UserInformation from './pages/UserInformation';

function App() {
  return (
    <Router>
      <NavTabs />
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<TaskBoard />} />
        <Route path="/user-information" element={<UserInformation />} />
      </Routes>
    </Router>
  );
}

export default App;
