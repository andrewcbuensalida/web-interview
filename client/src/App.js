import React, {Component} from 'react';
import { Outlet } from 'react-router-dom';

import Nav from './components/Nav';
import logo from './logo.png';

export class App extends Component {
    render() {
        return (
          <div style={{ maxWidth: 600, margin: '8px auto', padding: '0 1em' }}>
            <div className="app-header">
              <Nav></Nav>
              <img src={logo} className="app-logo" alt="Babylon Health" />
            </div>
            <Outlet />
          </div>
        );
    }
}

export default App
