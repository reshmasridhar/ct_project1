// src/components/DoctorSearch.js
import React, { useState , useEffect } from 'react';
import doctorsData from '../data/doctors';
import DoctorList from './DoctorList';
import DoctorProfile from './DoctorProfile';
import './DoctorSearch.css';
import { FaCheck } from 'react-icons/fa';



const DoctorSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  //const [disabledSlots, setDisabledSlots] = useState({});
  const [disabledSlots, setDisabledSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState('');
  //const [selectedDate, setSelectedDate] = useState(''); // Store the selected date
  const [bookedSlots, setBookedSlots] = useState([]); // Store booked time slots

  const handleSearch = () => {
    // Implement logic to fetch doctors based on the searchQuery
    // Update setSearchResults with the search results
    const filteredDoctors = doctorsData.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredDoctors);
};
const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };
  const fetchAppointments = async (doctorName, appointmentDate) => {
    // Replace with your API endpoint for fetching appointments based on doctor and date
    try {
      const response = await fetch(`https://newback-3097.onrender.com/appointments?doctorName=${doctorName}&appointmentDate=${appointmentDate}`);
      if (response.ok) {
        const data = await response.json();
        // Extract the booked time slots from the fetched data
        const bookedSlots = data.map((appointment) => appointment.selectedSlot);
        setDisabledSlots(bookedSlots);
      } else {
        console.error('Error fetching appointments.');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    // Fetch appointments for the selected doctor and date
    if (selectedDoctor && selectedDoctor.selectedDate) {
      fetchAppointments(selectedDoctor.name, selectedDoctor.selectedDate);
    }
  }, [selectedDoctor]);

  const handleAppointmentSubmit = (appointmentData) => {
    // Implement logic to handle appointment submissions, e.g., call an API or update state
    console.log('Appointment submitted:', appointmentData);
    setDisabledSlots((prevDisabledSlots) => [...prevDisabledSlots, appointmentData.selectedSlot]);
    // You can add further logic here
  };
  const handleSlotSelect = (slot) => {
    // Check if the selected slot is already booked
    if (bookedSlots.includes(slot)) {
      // If the slot is already booked, do nothing
      return;
    }
    setSelectedSlot(slot); // Define 'handleSlotSelect' to update the selected slot
  };


  return (
    <div className='searchfull'>
    <div className='search'>
      <h1 style={{ color: 'white' }}>Search Doctors</h1>
      <br></br>
      <div className='search-input'>
      
      
      <input
        type="text"
        placeholder="Search by Name or Specialization"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      </div>
     
      
      {selectedDoctor ? (
        <DoctorProfile doctor={selectedDoctor} onAppointmentSubmit={handleAppointmentSubmit}/>
      ) : (
        <DoctorList doctors={searchResults} onDoctorSelect={handleDoctorSelect} />
      )}

<div className="time-slots">
          {availableSlots.map((slot) => (
            <button
              key={slot}
              className={`time-slot-button ${selectedSlot === slot ? 'selected' : ''} ${
                disabledSlots.includes(slot)|| bookedSlots.includes(slot) ? 'disabled' : ''
              }`}
              onClick={() => handleSlotSelect(slot, )}
              disabled={disabledSlots.includes(slot) || bookedSlots.includes(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
      
      <div className="additional-content">
        <div className="paragraph">
          <h2>Safety of your data is our</h2>
          <h1>top priority</h1>
          <br></br><br></br>
          <h4><FaCheck style={{ color: 'hsl(220, 40%, 50%)' }} />  Multi-level security checks</h4>
          <br></br>
          <h4><FaCheck style={{ color:'hsl(220, 40%, 50%)'}}/>  Multiple data backups</h4>
          <br></br>
          <h4><FaCheck style={{ color: 'hsl(220, 40%, 50%)' }}/>  Stringent data privacy policies</h4>

          
        </div>
        <div className="image">
          <img src="safety.webp" alt="Sample" />
        </div>
         </div>
         <div className='setbg'>
        <div className="newimage">
        <br></br>
        
        <div className="image-container">
       <img src="safety1.webp" alt="safe 1" />
      <p>256-bit encryption</p>
       </div>
    <div className="image-container">
      <img src="safety2.webp" alt="safe 2" />
      <p>ISO 27001 certified</p>
    </div>
    <div className="image-container">
      <img src="safety3.webp" alt="safe3" />
      <p>HIPAA compliant data centers</p>
    </div>
    <div className="image-container">
      <img src="safety4.webp" alt="safe 4" />
      <p>DSCI member</p>
    </div>
    <br></br>
  </div>
  </div>
  <div className="additional-content2">
    <br></br>
        <div className="paragraph2">
          <h2>Instant appointment with doctors</h2>
          <h1>Guaranteed.</h1>
          <br></br><br></br>
          <h4><FaCheck style={{ color: 'hsl(220, 40%, 50%)' }} />  100,000 Verified doctors</h4>
          <br></br>
          <h4><FaCheck style={{ color:'hsl(220, 40%, 50%)'}}/> 3M+ Patient recommendations</h4>
          <br></br>
          <h4><FaCheck style={{ color: 'hsl(220, 40%, 50%)' }}/>  25M Patients/year</h4>

          
        </div>
        <div className="image">
        <video controls width="500" height="500">
      <source src="video.webm" type="video/mp4" />
      </video>
        </div>
      </div>
      
  
  
    </div>
  );
};

export default DoctorSearch;
