
import React, { useState, useEffect } from 'react';

function State() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    fetch('https://state-server-vwii.onrender.com/countries')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://state-server-vwii.onrender.com/states?countryId=${selectedCountry.id}`)
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.error('Error fetching states:', error));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedCountry || states.length === 0) {
      setErrorMessage(true);
    } else {
      setSelectedCountry('');
      setStates([]);
      setErrorMessage('');
    }
  };

  return (
    <div className='state-form'>
    <div className="container mt-3">
        <div className='row'>
          <div className='col-md-12'>
            <div className='heading'>
              <h2>Select a Country and State</h2>
            </div>
          </div>
          <div className='col-md-5'>
          <div className="input-field">
            <label htmlFor="countrySelect">COUNTRY</label>
            <select
              id="countrySelect"
              value={selectedCountry ? selectedCountry.id : ''}
              onChange={(e) => {
                const selectedCountry = countries.find((country) => country.id === parseInt(e.target.value));
                setSelectedCountry(selectedCountry);
              }}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {errorMessage && !selectedCountry && <p className="error-message">Please select Country</p>}
          </div>
          </div>
          <div className='col-md-5'>
          <div className="input-field">
            <label htmlFor="stateSelect">STATE</label>
            <select id="stateSelect">
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            {errorMessage && !states && <p className="error-message">Please select states</p>}
            </div>
            </div>
            <div className='col-md-2'>
              <button className='button-style' onClick={handleSubmit}>Submit</button>
            </div>
          </div>
          </div>
          </div>
  );
}

export default State;
