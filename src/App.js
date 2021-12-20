import React, { Component } from 'react';

import logo from './logo.png';
import { API_ENDPOINT } from './config';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user:{},
      selectedConsultantType: 'gp',
      availableSlots: [],
    };
  }

  componentDidMount() {
    fetch(`${API_ENDPOINT}/availableSlots`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ availableSlots: json });
      })
      .catch(() => {
        // TODO: Handle error here
      });
    fetch(`${API_ENDPOINT}/users/1`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ user: json });
      })
      .catch(() => {
        // TODO: Handle error here
      });
  }

  onClick() {
    this.setState({ selectedConsultantType: 'gp' });
  }

  render() {
    // calculate matching slots
    let slots = [];
    for (let i = 0; i < this.state.availableSlots.length; i++) {
      for (let j = 0; j < this.state.availableSlots[i]['consultantType'].length; j++) {
        if (
          this.state.availableSlots[i]['consultantType'][j] === this.state.selectedConsultantType
        ) {
          slots.push(this.state.availableSlots[i]);
        }
      }
    }
    console.log(`This is available slots`)
    console.log(this.state.availableSlots)
    console.log(`This is this`)
    console.log(this)
    

    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="Babylon Health" />
        </div>
        <h2 className="h6">New Consultant</h2>
        <img src={this.state.user.avatar} />
        {this.state.user.firstName} {this.state.user.lastName}
        <h3>Consultant Type</h3>
        <div style={{ maxWidth: 600, margin: '24px auto' }}>
          <div className="button">
            GP
          </div>
          <div
            className="button"
            onClick={(e) => {
              this.setState({ selectedConsultantType: 'Therapist' });
            }}
          >
            Therapist
          </div>
          <div
            className="button"
            onClick={(e) => {
              this.setState({ selectedConsultantType: 'Physio' });
            }}
          >
            Physio
          </div>
          <div
            className="button"
            onClick={(e) => {
              this.setState({ selectedConsultantType: 'specialist' });
            }}
          >
            Specialist
          </div>
          <div>
            <h3>Date and Time</h3>
            {slots.map((slot) => (
              <li
                key={slot.id}
                className="Consultant-button"
                onClick={() => {
                  this.setState({ selectedDateAndTime: slot.dateTime });
                }}
              >
                {slot.time}
              </li>
            ))}
          </div>
          <div>
            <h3>Notes</h3>
            <textarea />
          </div>
          <div>
            <div
              className="button"
              onClick={() => {
                /* TODO: submit the data */
              }}
            >
              Book Consultant
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
