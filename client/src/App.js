import React from 'react';

import Nav from './components/Nav';
import logo from './logo.png';
import CreateAppointment from './routes/CreateAppointment';
import ScheduledAppointments from './routes/ScheduledAppointments';

function App() {
  return (
    <div className="app">
      <div style={{ maxWidth: 600, margin: '8px auto', padding: '0 1em' }}>
        <div className="app-header">
          <Nav></Nav>
          <img src={logo} className="app-logo" alt="Babylon Health" />
        </div>
        <CreateAppointment></CreateAppointment>
        <ScheduledAppointments></ScheduledAppointments>
      </div>
    </div>
  );
}

export default App;
