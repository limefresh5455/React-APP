// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerticalNavBar from './VerticalNavBar';
import Home from './Home';
import Projects from './Projects';
import Financial from './Financial';
import Contacts from './Contacts';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <VerticalNavBar />
        <div style={{ marginLeft: '200px', padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/Financial" element={<Financial />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
