import React, { Component } from 'react';
import moment from 'moment';
import ScrollContainer from 'react-indiana-drag-scroll';

import { API_ENDPOINT } from '../config';
import './CreateAppointment.scss';

class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      selectedConsultantType: 'gp',
      availableSlots: [],
      selectedDateTime: '',
      selectedAppointmentType: '',
      notes: '',
      bookingSaved: false,
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
      document.getElementById('userError').style.display = 'inline';
    }
    if (!this.state.selectedConsultantType) {
      isError = true;
      document.getElementById('consultantError').style.display = 'inline';
    }
    if (!this.state.selectedDateTime) {
      isError = true;
      document.getElementById('dateTimeError').style.display = 'inline';
    }
    if (!this.state.selectedAppointmentType) {
      isError = true;
      document.getElementById('appointmentError').style.display = 'inline';
    }
    if (isError) {
      document.getElementById('generalError').style.display = 'inline';
      this.setState({ bookingSaved: false });
    }
    if (!isError) {
      try {
        let responseJSON = await fetch(`${API_ENDPOINT}/appointments`, {
          method: 'POST', // *GET, POST, PUT, DELETE,
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({
            notes: this.state.notes,
            userId: this.state.user.id,
            consultantType: this.state.selectedConsultantType + ' appointment',
            appointmentType: this.state.selectedAppointmentType,
            dateTime: this.state.selectedDateTime,
          }), // body data type must match "Content-Type" header
        });
        let response = await responseJSON.json();

        this.setState({
          selectedDateTime: '',
          selectedAppointmentType: '',
          notes: '',
          bookingSaved: true,
        });

        document.getElementById('generalError').style.display = 'none';
        document.getElementById('userError').style.display = 'none';
        document.getElementById('consultantError').style.display = 'none';
        document.getElementById('dateTimeError').style.display = 'none';
        document.getElementById('appointmentError').style.display = 'none';
      } catch (err) {
        console.log(`This is err`);
        console.log(err);
      }
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

    //dynamically getting appointment types based on slots matched. probably should be based on dateTime selected
    let appointmentTypes = [];
    this.state.availableSlots.forEach((slot) => {
      slot.appointmentType.forEach((appointmentType) => {
        if (!appointmentTypes.includes(appointmentType)) appointmentTypes.push(appointmentType);
      });
    });

    return (
      <main>
        <h1>Create Appointment</h1>
        <div className="user">
          <img src={this.state.user.avatar} />
          {this.state.user.firstName} {this.state.user.lastName}
          <span id="userError">Please Log In</span>
        </div>
        <div className="fadeContainer">
          <h3>
            <i className="fas fa-stethoscope fa-lg"></i>
            Consultant Type <span id="consultantError">Please select a consultant type</span>
          </h3>
          <div className="fade"></div>

          <ScrollContainer className="optionsContainer">
            {consultantTypes.map((consultantType) => {
              return (
                <div
                  key={consultantType}
                  className={`button ${
                    this.state.selectedConsultantType === consultantType && 'selected'
                  }`}
                  onClick={(e) => this.handleSelectConsultantType(e)}
                  tabIndex="0"
                >
                  {consultantType === 'gp'
                    ? 'GP'
                    : consultantType.charAt(0).toUpperCase() + consultantType.slice(1)}
                </div>
              );
            })}
          </ScrollContainer>
        </div>

        <div>
          <h3>
            <span>
              <i className="far fa-clock fa-lg"></i>
            </span>
            Date and Time <span id="dateTimeError">Please select a time slot</span>
          </h3>
          {Object.entries(slotsByDate).map(([date, slots]) => {
            return (
              <div key={date} className="fadeContainer">
                <div className="date"> {moment(date).format('MMM D[:]')}</div>
                <div className="fade"></div>

                <ScrollContainer className="optionsContainer">
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
                          {moment(slot.time).format('hh:mm a')}
                        </li>
                      ),
                  )}
                </ScrollContainer>
              </div>
            );
          })}
        </div>
        <div className="fadeContainer">
          <h3>
            <span>
              <i className="fas fa-video fa-lg"></i>
            </span>
            Appointment Type <span id="appointmentError">Please select an appointment type</span>
          </h3>{' '}
          <div className="fade"></div>
          <ScrollContainer className="optionsContainer">
            {appointmentTypes.map((appointmentType) => (
              <div
                key={appointmentType}
                className={`button ${
                  this.state.selectedAppointmentType === appointmentType && 'selected'
                }`}
                onClick={(e) => this.setState({ selectedAppointmentType: appointmentType })}
              >
                {appointmentType.charAt(0).toUpperCase() + appointmentType.slice(1)}
              </div>
            ))}{' '}
          </ScrollContainer>
        </div>
        <div>
          <h3>
            <span>
              <i className="fas fa-pencil-alt fa-lg"></i>
            </span>
            Notes
          </h3>
          <textarea
            placeholder="Describe your symptoms"
            value={this.state.notes}
            onChange={(e) => this.setState({ notes: e.target.value })}
          />
        </div>
        <div>
          <div
            className="button book"
            onClick={() => {
              this.handleSubmit();
            }}
          >
            Book
          </div>
          <span id="generalError">Please fill missing information</span>
          {this.state.bookingSaved && <span id="savedMessage">Booking saved!</span>}
        </div>
      </main>
    );
  }
}

export default CreateAppointment;
