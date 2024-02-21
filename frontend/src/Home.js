import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VaccinationCenterTable from './VaccinationCenterTable';

function Home() {
    const [vaccinationCenters, setVaccinationCenters] = useState([]);

    const handleBook = (centerId) => {
        const selectedCenter = vaccinationCenters.find((center) => center.id === centerId);

        if (selectedCenter.availableSlots === 0) {
            window.alert('Sorry, the slots are booked. Please try again later.');
            return;
        }

        axios.post('http://localhost:8081/bookVaccinationCenter', { id: centerId })
            .then((response) => {
                if (response.data.success) {
                    window.alert('Booking successful! You have successfully booked a slot.');
                } else {
                    console.error('Booking failed:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error booking vaccination center:', error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:8081/getVaccinationCenters')
            .then((response) => {
                setVaccinationCenters(response.data);
            })
            .catch((error) => {
                console.error('Error fetching vaccination centers:', error);
            });
    }, []);

    return (
        <div>
            <h1>Welcome to the Vaccination Center Portal</h1>

            <h2>Available Vaccination Centers</h2>
            {vaccinationCenters.length > 0 ? (
                <VaccinationCenterTable
                    vaccinationCenters={vaccinationCenters}
                    onBook={handleBook}
                />
            ) : (
                <p>No vaccination centers available at the moment.</p>
            )}
        </div>
    );
}

export default Home;
