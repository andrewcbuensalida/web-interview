import React, { Component } from 'react';
import { API_ENDPOINT } from '../config';
import moment from 'moment';

import './ScheduledAppointments.scss';

export class ScheduledAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: null,
    };
  }
  componentDidMount() {
    fetch(`${API_ENDPOINT}/appointments`)
      .then((appointmentsJSON) => appointmentsJSON.json())
      .then((appointments) => {
        this.setState({ appointments: appointments });
      })
      .catch((err) => {});
  }

  async handleCancel(appointmentId) {
    try {
      const response = await fetch(`${API_ENDPOINT}/appointments`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE,
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          appointmentId,
        }), // body data type must match "Content-Type" header
      });
      this.setState({
        appointments: this.state.appointments.filter(
          (appointment) => appointment.id !== appointmentId,
        ),
      });
    } catch (err) {}
  }
  render() {
    return (
      <main>
        <h1>Scheduled Appointments</h1>
        {this.state.appointments?.map((appointment) => (
          <div key={appointment.id} className="ScheduledAppointments__appointment">
            Date:{moment(appointment.dateTime).format('hh:mma MMM D[,] YYYY')}
            <br />
            Consultant type:{appointment.consultantType}
            <br />
            Appointment type:{appointment.appointmentType}
            <br />
            Notes: {appointment.notes}
            <br />
            <button className="Scheduled__cancel" onClick={() => this.handleCancel(appointment.id)}>
              Cancel
            </button>
          </div>
        ))}
      </main>
    );
  }
}

export default ScheduledAppointments;
