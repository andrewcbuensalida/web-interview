import React, { Component } from 'react';
import { API_ENDPOINT } from '../config';
import moment from 'moment';

import './ScheduledAppointments.scss';

export class ScheduledAppointments extends Component {
    constructor(props){
        super(props)
        this.state = {
            appointments:null
        }
    }
  componentDidMount() {
    fetch(`${API_ENDPOINT}/appointments`)
      .then((appointmentsJSON) => appointmentsJSON.json())
      .then((appointments) => {
        this.setState({appointments:appointments})
      })
      .catch((err) => {});
  }

  render() {
console.log(`This is this.state.appointments`)
console.log(this.state.appointments)

    return (
      <main>
        <h1>Scheduled Appointments</h1>
        {this.state.appointments?.map((appointment) => (
          <div key={appointment.id} className="ScheduledAppointments__appointment">
            Date:{moment(appointment.dateTime).format('hh:mm a MMM D[,] YYYY')}
            <br />
            Consultant type:{appointment.consultantType}
            <br />
            Appointment type:{appointment.appointmentType}
            <br />
            Notes: {appointment.notes}
          </div>
        ))}
      </main>
    );
  }
}

export default ScheduledAppointments;
