// src/components/AppointmentList.js
import React from 'react';

const AppointmentList = ({ appointments }) => {
  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>{appointment.name} - {appointment.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
