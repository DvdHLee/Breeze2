import './Header.css';
import { Link } from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useState } from 'react';

function Header({ searched }) {
    const [address, setAddress] = useState("");

    const submitted = () => {
        searched(address);
    };

    //Add event listener for enter key press
    const handleEnterPress = (e) => {
        if (e.code.toString() === "Enter") {
            submitted();
        }
    };

    return (
        <div className="header">
            <nav>
                <Link to="/" className="header__container">
                    <img src={`${process.env.PUBLIC_URL}/assets/breezelogo.png`} alt="breezelogo" className="header__logo"></img>
                    <h2 className="header__title">Breeze 2.0</h2>
                </Link>
            </nav>
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
    );
}

export default Header;