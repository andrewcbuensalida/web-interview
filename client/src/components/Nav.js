import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss';

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    };
    this.handleOpen = this.handleOpen.bind(this)
  }
  handleOpen() {
    console.log(`This is this.state.handleOpen`)
    console.log(this.state.handleOpen)
    
    this.setState({ isOpened: !this.state.isOpened });
  }
  render() {
    return (
      <nav className="navContainer">
        <div className="navBlock"></div>
        <ul className={`nav2 ${this.state.isOpened && 'opened'}`}>
          <div className="icon" onClick={this.handleOpen}>
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
