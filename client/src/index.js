import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import CreateAppointment from './routes/CreateAppointment';
import ScheduledAppointments from './routes/ScheduledAppointments';

render(
  <div style={{ maxWidth: 600, margin: '8px auto', padding: '0 1em' }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="createappointment" element={<CreateAppointment />} />
          <Route path="scheduledappointments" element={<ScheduledAppointments />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>,

  document.getElementById('root'),
);
