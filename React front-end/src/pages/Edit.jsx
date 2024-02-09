import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const [country, setCountry] = useState({
        name: '',
        capital: '',
        population: 0,
        area: 0
    });



    
    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8282/all-countries`);
                if (!response.ok) {
                    throw new Error('Failed to fetch country details');
                }
                const json = await response.json();
                const countryData = json.find(country => country.id === parseInt(id));
                if (countryData) {
                    setCountry(countryData);
                } else {
                    console.error('Country with the specified ID not found');
                }
            } catch (error) {
                console.error('Error fetching country details', error);
            }
        };

        fetchCountryDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCountry(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8282/update-country?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(country)
            });
            if (!response.ok) {
                throw new Error('Failed to update country');
            }
            console.log('Country updated successfully');
            setSuccessMessage('Country updated successfully');
        } catch (error) {
            console.error('Error updating country:', error);
        }
    };

    return (
        <div>
            <h4>Edit Country</h4>
            <form onSubmit={handleSubmit}>
                <label>Name:</label> <br />
                <input
                    type="text"
                    name="name"
                    value={country.name}
                    onChange={handleChange}
                /> <br />
                <label>Capital:</label> <br />
                <input
                    type="text"
                    name="capital"
                    value={country.capital}
                    onChange={handleChange}
                /> <br />
                <label>Population:</label> <br />
                <input
                    type="number"
                    name="population"
                    value={country.population}
                    onChange={handleChange}
                /> <br />
                <label>Area:</label> <br />
                <input
                    type="number"
                    name="area"
                    value={country.area}
                    onChange={handleChange}
                /> <br />
                <button type="submit">Update</button>
            </form>
            <p>{successMessage}</p>
        </div>
    );
}

export default Edit;



