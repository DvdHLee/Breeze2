import './Landing.css';
import { useNavigate } from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useState } from 'react';

function Landing({ searched }) {
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const submitted = () => {
        navigate("/Home");
        searched(address);
    };

    //Add event listener for enter key press
    const handleEnterPress = (e) => {
        if (e.code.toString() === "Enter") {
            submitted();
        }
    };

    return (
        <div className='landing'>
            <div className='landing__container'>
                <img src={`${process.env.PUBLIC_URL}/assets/breezelogo.png`} alt='breeze logo' className='landing__logo'></img>
                <h2 className='landing__title'>Breeze 2.0</h2>
            </div>
            <h2 className='landing__subtitle'>A Weather App</h2>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={setAddress}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className='suggestion__container'>
                        <input id="location__input" {...getInputProps({ placeholder: 'Location', onKeyDown: handleEnterPress })} />
                        <input type="image" src={`${process.env.PUBLIC_URL}/assets/search.png`} name="submit" id="search__icon" alt='search img' onClick={submitted}></input>
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                return <div key={suggestion.description} {...getSuggestionItemProps(suggestion)} className="suggestion"><span>{suggestion.description}</span></div>
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}

export default Landing;