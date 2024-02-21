import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VaccinationCenterTable from './VaccinationCenterTable';

function AdminPage() {
    const [vaccinationCenterDetails, setVaccinationCenterDetails] = useState({
        name: '',
        location: '',
        dosageDetails: '',
        timings: '',
    });

    const [vaccinationCenters, setVaccinationCenters] = useState([]);

    const handleInput = (event) => {
        setVaccinationCenterDetails((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8081/addVaccinationCenter', vaccinationCenterDetails)
            .then((response) => {
                console.log(response.data);
                setVaccinationCenters((prevCenters) => [...prevCenters, response.data]);
                setVaccinationCenterDetails({
                    name: '',
                    location: '',
                    dosageDetails: '',
                    timings: '',
                });
            })
            .catch((error) => {
                console.error('Error adding vaccination center:', error);
            });
    };

    const handleRemove = (centerId) => {
        axios.post('http://localhost:8081/removeVaccinationCenter', { id: centerId })
            .then((response) => {
                if (response.data.success) {
                    setVaccinationCenters((prevCenters) => prevCenters.filter((center) => center.id !== centerId));
                } else {
                    console.error('Error removing vaccination center:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error removing vaccination center:', error);
            });
    };

    const handleBook = (centerId) => {
        axios.post('http://localhost:8081/bookVaccinationCenter', { id: centerId })
            .then((response) => {
                if (response.data.success) {
                    // Handle success, e.g., show a success message
                } else {
                    // Handle failure, e.g., show an error message
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
        <div className='bg-black text-white vh-100'>
            <h1>Welcome, Admin!</h1>

            <div>
                <h2>Add Vaccination Center</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" name="name" value={vaccinationCenterDetails.name} onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="location"><strong>Location</strong></label>
                        <input type="text" name="location" value={vaccinationCenterDetails.location} onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="dosageDetails"><strong>Dosage Details</strong></label>
                        <input type="text" name="dosageDetails" value={vaccinationCenterDetails.dosageDetails} onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="timings"><strong>Timings</strong></label>
                        <input type="text" name="timings" value={vaccinationCenterDetails.timings} onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Add Vaccination Center
                    </button>
                </form>
            </div>

            <div>
                <h2>Vaccination Centers List</h2>
                <VaccinationCenterTable
                    vaccinationCenters={vaccinationCenters}
                    onRemove={handleRemove}
                    onBook={handleBook}
                    isAdmin={true}
                />
            </div>
        </div>
    );
}

export default AdminPage;
