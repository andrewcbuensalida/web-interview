import React, { Component } from 'react';
import moment from 'moment';

import logo from './logo.png';
import { API_ENDPOINT } from './config';

import './App.scss';
import { node } from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      selectedConsultantType: 'gp',
      availableSlots: [],
      selectedDateTime: '',
      selectedAppointmentType: '',
      notes: '',
    };
    // this.handleSelectConsultantType = this.handleSelectConsultantType.bind(this);
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

  // second method to update selectedConsultantType
  handleSelectConsultantType(e) {
    this.setState({ selectedConsultantType: e.target.innerText.toLowerCase() });
  }

  async handleSubmit() {
    let isError;
    // could use this method, or have error states which conditionally change display of each error element
    if (!this.state.user) {
      isError = true;
      document.getElementById('generalError').style.display = 'inline';
      document.getElementById('userError').style.display = 'inline';
    }
    if (!this.state.selectedConsultantType) {
      isError = true;
      document.getElementById('generalError').style.display = 'inline';
      document.getElementById('consultantError').style.display = 'inline';
    }
    if (!this.state.selectedDateTime) {
      isError = true;
      document.getElementById('generalError').style.display = 'inline';
      document.getElementById('dateTimeError').style.display = 'inline';
    }
    if (!this.state.selectedAppointmentType) {
      isError = true;
      document.getElementById('generalError').style.display = 'inline';
      document.getElementById('appointmentError').style.display = 'inline';
    }
    if (!isError) {
      try {
        let response = await fetch(`${API_ENDPOINT}/appointments`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({
            notes: this.state.notes,
            userId: this.state.user.id,
            consultantType: this.state.selectedConsultantType + ' appointment',
            appointmentType: this.state.selectedAppointmentType,
            dateTime: this.state.selectedDateTime,
          }), // body data type must match "Content-Type" header
        });
        console.log(`This is response`);
        console.log(response);

        this.setState({
          selectedConsultantType: 'gp',
          selectedDateTime: '',
          selectedAppointmentType: '',
          notes: '',
        });

        document.getElementById('generalError').style.display = 'none';
        document.getElementById('userError').style.display = 'none';
        document.getElementById('consultantError').style.display = 'none';
        document.getElementById('dateTimeError').style.display = 'none';
        document.getElementById('appointmentError').style.display = 'none';
      } catch (err) {}
    }
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

    let slotsByDate = {};
    slots.forEach((slot) => {
      if (slotsByDate[slot.time.slice(0, -14)]) {
        slotsByDate[slot.time.slice(0, -14)].push(slot);
      } else {
        slotsByDate[slot.time.slice(0, -14)] = [];
        slotsByDate[slot.time.slice(0, -14)].push(slot);
      }
    });

    //dynamically display cosultant type buttons based on slots available
    let consultantTypes = [];
    this.state.availableSlots.forEach((slot) => {
      slot.consultantType.forEach((consultantType) => {
        if (!consultantTypes.includes(consultantType)) consultantTypes.push(consultantType);
      });
    });

    //dynamically getting appointment types based on slots matched
    let appointmentTypes = [];
    this.state.availableSlots.forEach((slot) => {
      slot.appointmentType.forEach((appointmentType) => {
        if (!appointmentTypes.includes(appointmentType)) appointmentTypes.push(appointmentType);
      });
    });

    return (
      <div className="app">
        <div style={{ maxWidth: 600, margin: '24px auto' }}>
          <div className="app-header">
            <img src={logo} className="app-logo" alt="Babylon Health" />
          </div>
          <h1>New Appointment</h1>
          <div className="user">
            <img src={this.state.user.avatar} />
            {this.state.user.firstName} {this.state.user.lastName}
            <span id="userError">Please Log In</span>
          </div>
          <h3>
            Consultant Type <span id="consultantError">Please select a consultant type</span>
          </h3>
          {consultantTypes.map((consultantType) => {
            return (
              <div
                key={consultantType}
                // could add selected className conditionally here based on this.state.selectedConsultantType but there's a delay because it has to wait for availableSlots to fetch, because buttons are dynamic
                className={`button ${
                  this.state.selectedConsultantType === consultantType && 'selected'
                }`}
                // className="button"
                // this is one method. another is binding function in constructor. another is putting setState directly in here.
                onClick={(e) => this.handleSelectConsultantType(e)}
              >
                {consultantType}
              </div>
            );
          })}

          <div>
            <h3>
              Date and Time <span id="dateTimeError">Please select a time slot</span>
            </h3>
            {Object.entries(slotsByDate).map(([date, slots]) => {
              return (
                <div key={date}>
                  <div className="date"> {moment(date).format('MMM D[:]')}</div>

                  {slots.map(
                    (slot, index) =>
                      slot.time !== slots[index - 1]?.time && (
                        <li
                          key={slot.id}
                          className={`button ${
                            this.state.selectedDateTime === slot.time && 'selected'
                          }`}
                          onClick={() => {
                            this.setState({ selectedDateTime: slot.time });
                          }}
                        >
                          {moment(slot.time).format('hh:mm')}
                        </li>
                      ),
                  )}
                </div>
              );
            })}
          </div>
          <div>
            <h3>
              Appointment Type <span id="appointmentError">Please select an appointment type</span>
            </h3>
            {appointmentTypes.map((appointmentType) => (
              <div
                key={appointmentType}
                className={`button ${
                  this.state.selectedAppointmentType === appointmentType && 'selected'
                }`}
                onClick={(e) => this.setState({ selectedAppointmentType: appointmentType })}
              >
                {appointmentType}
              </div>
            ))}
          </div>
          <div>
            <h3>Notes</h3>
            <textarea
              placeholder="Describe your symptoms"
              value={this.state.notes}
              onChange={(e) => this.setState({ notes: e.target.value })}
            />
          </div>
          <div>
            <div
              className="button"
              onClick={() => {
                this.handleSubmit();
              }}
            >
              Book
            </div>
            <span id="generalError">Please fill missing information</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
