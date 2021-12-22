import React from 'react';
import { Outlet } from 'react-router-dom';

import Nav from './components/Nav';
import logo from './logo.png';

function App() {
  return (
    <>
      <div className="app-header">
        <Nav></Nav>
        <img src={logo} className="app-logo" alt="Babylon Health" />
      </div>
      <Outlet />
    </>
  );
}

export default App;
