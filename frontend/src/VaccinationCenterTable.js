import React from 'react';

function VaccinationCenterTable({ vaccinationCenters, onRemove, onBook, isAdmin }) {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Dosage Details</th>
                    <th>Timings</th>
                    {isAdmin && <th>Available Slots</th>}
                    {isAdmin && <th>Action</th>}
                </tr>
            </thead>
            <tbody>
                {vaccinationCenters.map((center) => (
                    <tr key={center.id}>
                        <td>{center.name}</td>
                        <td>{center.location}</td>
                        <td>{center.dosageDetails}</td>
                        <td>{center.timings}</td>
                        {isAdmin && <td>{center.availableSlots}</td>}
                        {isAdmin ? (
                            <td>
                                <button onClick={() => onRemove(center.id)}>Remove</button>
                            </td>
                        ) : (
                            <td>
                                <button onClick={() => onBook(center.id)}>Book</button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default VaccinationCenterTable;
