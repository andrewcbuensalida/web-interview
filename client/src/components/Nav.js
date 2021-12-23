import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss'

export class Nav extends Component {
  render() {
    return (
      <nav className="navContainer">
        <div className="navBlock"></div>
        <ul id="nav2">
          <div className="icon">
            <i className="fa fa-2x fa-chevron-right"></i>
          </div>
          <Link to="/scheduledappointments">
            <li className="scheduledNav">Scheduled appointments</li>
          </Link>
          <Link to="/createappointment">
            <li className="createNav">Create an appointment</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
