import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

function Countries() {

    const[allCountries, setCountries] = useState([]);
    const[allAreas, setSumAreas] = useState(0);
    const[allPopulations, setSumPopulations] = useState(0);
    const[avgArea, setAvgArea] = useState(0);
    const[avgPopulation, setAvgPopulation] = useState(0);
    

    const nameRef = useRef();
    const capitalRef = useRef();
    const populationRef = useRef();
    const areaRef = useRef();
    const minRef = useRef();
    const maxRef = useRef();




    useEffect(() => {
        fetch("http://localhost:8282/all-countries")
        .then(res => res.json())
        .then(json => setCountries(json));
    }, []);


    function fetchAllCountries() {
        fetch("http://localhost:8282/all-countries")
        .then(res => res.json())
        .then(json => setCountries(json));
        minRef.current.value = '';
        maxRef.current.value = '';
    }

    const addCountry = () => {
        fetch("http://localhost:8282/add-country?name=" + nameRef.current.value +
         "&capital=" + capitalRef.current.value + 
         "&population=" + populationRef.current.value +
         "&area=" + areaRef.current.value, {method: "POST"})
        .then (res => res.json())
        .then(json => setCountries(json));
        nameRef.current.value = '';
        capitalRef.current.value = '';
        populationRef.current.value = '';
        areaRef.current.value = '';
    }

    const deleteCountry = (id) => {
        fetch("http://localhost:8282/delete-country?id=" + id, {method: "DELETE"})
        .then (res => res.json())
        .then(json => setCountries(json));
    }

    useEffect(() => {
        fetch("http://localhost:8282/summarize-population")
          .then(res => res.json())
          .then(json => setSumPopulations(json));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8282/summarize-area")
          .then(res => res.json())
          .then(json => setSumAreas(json));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8282/average-population")
          .then(res => res.json())
          .then(json => setAvgPopulation(json));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8282/average-area")
          .then(res => res.json())
          .then(json => setAvgArea(json));
    }, []);

    const PopBtwn = () => {
        fetch("http://localhost:8282/populations-between?minPopulation=" + minRef.current.value +
        "&maxPopulation=" + maxRef.current.value)
          .then(res => res.json())
          .then(json => setCountries(json));
    }

    const AreaBtwn = () => {
        fetch("http://localhost:8282/areas-between?minArea=" + minRef.current.value +
        "&maxArea=" + maxRef.current.value)
          .then(res => res.json())
          .then(json => setCountries(json));
    }

    const updateCountry = (id) => {
        fetch("http://localhost:8282/update-country?id=" + id, {method: "PATCH"})
        .then (res => res.json())
        .then(json => setCountries(json));
    }

    return (
        <div>
            <div>All populations combined: <b>{allPopulations}</b></div>
            <div>All areas combined: <b>{allAreas}</b></div>
            <div>Average population: <b>{avgPopulation}</b></div>
            <div>Average area: <b>{avgArea}</b></div>
            
            <div className="footer">
                <label>Minimum population or area:</label> <br />
                <input ref={minRef} type="number" /> <br />
                <label>Maximum population or area:</label> <br />
                <input ref={maxRef} type="number" /> <br />
                <button onClick={PopBtwn}>Find populations between</button>
                <button onClick={AreaBtwn}>Find Areas between</button>
                <button onClick={fetchAllCountries}>Reset</button>
            </div>


            <table className="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Capital</th>
          <th>Population</th>
          <th>Area</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {allCountries.map((country) => (
        <tr key={country.id}>
          <td>{country.id}</td>
          <td>{country.name}</td>
          <td>{country.capital}</td>
          <td>{country.population}</td>
          <td>{country.area}</td>
          <td>
            <button onClick={() => deleteCountry(country.id)}>x</button>
            <Link to={`/edit/${country.id}`}>
                <button>Edit</button>
            </Link>
          </td>
        </tr>
        ))}
        </tbody>
        </table>

            <div className="footer">
                <label>Country name:</label> <br />
                <input ref={nameRef} type="text" /> <br />
                <label>Country capital:</label> <br />
                <input ref={capitalRef} type="text" /> <br />
                <label>Country poulation:</label> <br />
                <input ref={populationRef} type="number" /> <br />
                <label>Country area:</label> <br />
                <input ref={areaRef} type="number" /> <br />
                <button onClick={addCountry}>Enter</button>
            </div>
        </div>
    )
}

export default Countries;