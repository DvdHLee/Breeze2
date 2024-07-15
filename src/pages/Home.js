import './Home.css';
import Header from '../components/Header';
import Weather from '../components/Weather';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home( {landingLocation} ) {
    const [location, setLocation] = useState(landingLocation);
    const [locationLatLng, setLocationLatLng] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [address, setAddress] = useState("")
    const [noResults, setNoResults] = useState(false);
    const [noData, setNoData] = useState(false);

    const searched = (address) => {
        setLocation(address);
    }

    const fetchData = async () => {
        setLoading(true);
            try {
                const endpointLocation = "https://api.weather.gov/points/" + locationLatLng;
                console.log(endpointLocation)
                const responseLocation = await axios.get(endpointLocation);
                setNoData(false);
                const endpointData = responseLocation.data.properties.forecastHourly;
                const responseData = await axios.get(endpointData);
                setData(responseData.data.properties.periods);
            } catch (error) {
                if (error.response.status === 404) {
                    setNoData(true);
                }
                console.error(error.message);
            }
        setLoading(false);
    }

    const convertLatLng = async () => {
        try {
            const endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDOSjPcOElrMnfnZqu8CCfEdIU_eRPSfRU";
            console.log(endpoint)
            const response = await axios.get(endpoint);
            if (response.data.status === 'ZERO_RESULTS') {
                setLoading(false);
                setNoResults(true);
                throw new Error("No Results");
            }
            setNoResults(false);
            const lat = response.data.results[0].geometry.location.lat;
            const lng = response.data.results[0].geometry.location.lng;
            setLocationLatLng(lat + "%2C" + lng);
            setAddress(response.data.results[0].formatted_address);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        convertLatLng();
        if (locationLatLng.length) {
            fetchData();
        }
        // eslint-disable-next-line
    }, [location, locationLatLng]);

    return (
        <div className="home">
            <Header searched={searched}></Header>
            {data && !loading && !noData && !noResults && <Weather data={data} address={address}></Weather>}
            {noResults && <div className='no__results'>No Results <br></br> Please try another location</div>}
            {noData && !noResults && <div className='no__results'>International data unavailable <br></br> Please try a location in the US</div>}
            {loading && <div className='loading__container'><img src={`${process.env.PUBLIC_URL}/assets/loading.png`} alt='loading img' className='loading'></img></div>}
        </div>
    )
}

export default Home;