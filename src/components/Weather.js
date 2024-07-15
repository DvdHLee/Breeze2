import './Weather.css';

import { useState } from 'react';

function Weather({ data, address }) {
    const [isCelsius, setIsCelsius] = useState(false);
    const [showTemp, setShowTemp] = useState(true);
    const [day, setDay] = useState(0);
    const timeToNextDay = 24 - parseInt(data[0].startTime.substring(11, 13));
    const highs = [];
    const lows = [];

    const clickedTemp = () => {
        setShowTemp(true);
    }

    const clickedPrec = () => {
        setShowTemp(false);
    }

    const changedTemp = (event) => {
        const tempType = event.target.checked;
        setIsCelsius(tempType);
    }

    const getDayName = (dateData) => {
        const convertedDate = dateData.substring(5, 10) + "-" + dateData.substring(0, 4);
        const date = new Date(convertedDate);
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayNames[date.getDay()];
    }

    const dayforecasts = [];
    var timeLabel;
    if (day === 6) {
        for (let i = day * 24; i < day * 24 + 12; i += 3) {
            if (data[i].startTime.substring(11, 13) === "00") {
                timeLabel = "12am";
            } else if (data[i].startTime.substring(11, 13) === "12") {
                timeLabel = "12pm"
            } else if (parseInt(data[i].startTime.substring(11, 13)) > 12) {
                timeLabel = (parseInt(data[i].startTime.substring(11, 13)) - 12).toString() + "pm";
            } else {
                timeLabel = parseInt(data[i].startTime.substring(11, 13)).toString() + "am"
            }
    
            dayforecasts.push(
                <div className='dayforecast' key={i}>
                    {showTemp ? <p className='dayforecast__temp'>{!isCelsius ? data[i].temperature : ((data[i].temperature - 32) * (5 / 9)).toFixed(1)}</p> : <p className='dayforecast__prec'>{data[i].probabilityOfPrecipitation.value}%</p>}
                    <p className='dayforecast__time'>{timeLabel}</p>
                </div>
            )
        }
    } else {
        for (let i = day * 24; i < day * 24 + 24; i += 3) {
            if (data[i].startTime.substring(11, 13) === "00") {
                timeLabel = "12am";
            } else if (data[i].startTime.substring(11, 13) === "12") {
                timeLabel = "12pm"
            } else if (parseInt(data[i].startTime.substring(11, 13)) > 12) {
                timeLabel = (parseInt(data[i].startTime.substring(11, 13)) - 12).toString() + "pm";
            } else {
                timeLabel = parseInt(data[i].startTime.substring(11, 13)).toString() + "am"
            }
    
            dayforecasts.push(
                <div className='dayforecast' key={i}>
                    {showTemp ? <p className='dayforecast__temp'>{!isCelsius ? data[i].temperature : ((data[i].temperature - 32) * (5 / 9)).toFixed(1)}</p> : <p className='dayforecast__prec'>{data[i].probabilityOfPrecipitation.value}%</p>}
                    <p className='dayforecast__time'>{timeLabel}</p>
                </div>
            )
        }
    }

    const selectDay = (id) => {
        setDay(id);
    }

    //Build Week Forecast module
    const weekforecasts = [];
    var max = 0;
    var min = 1000;

    //first day
    for (let i = 0; i < timeToNextDay; i++) {
        if (data[i].temperature > max) {
            max = data[i].temperature;
        } else if (data[i].temperature < min) {
            min = data[i].temperature;
        }
    }

    highs.push(max);
    lows.push(min);

    weekforecasts.push(
        <div className='weekforecast' key={0}>
            <div>{getDayName(data[0].startTime)}</div>
            <img src={data[0].icon} alt='forecast day img'></img>
            <div className='weekforecast__highlow'>
                <p className='high'>{!isCelsius ? max : ((max - 32) * (5 / 9)).toFixed(1)}</p>
                <p className='low'>{!isCelsius ? min : ((min - 32) * (5 / 9)).toFixed(1)}</p>
            </div>
            {day === 0 ? <input type='button' className='week__check selected' onClick={() => selectDay(0)} id={0}></input> : <input type='button' className='week__check' onClick={() => selectDay(0)} id={0}></input>}
        </div>
    )

    //middle days

    for (let i = timeToNextDay; i < 156 - 12; i += 24) {
        max = 0;
        min = 1000;
        for (let j = i; j <= i + 24; j++) {
            if (data[j]) {
                if (data[j].temperature > max) {
                    max = data[j].temperature;
                } else if (data[j].temperature < min) {
                    min = data[j].temperature;
                }
            }
        }

        highs.push(max);
        lows.push(min);

        weekforecasts.push(
            <div className='weekforecast' key={Math.ceil(i/24)}>
                <div>{getDayName(data[i].startTime)}</div>
                <img src={data[i + 12].icon} alt='forecast day img'></img>
                <div className='weekforecast__highlow'>
                    <p className='high'>{!isCelsius ? max : ((max - 32) * (5 / 9)).toFixed(1)}</p>
                    <p className='low'>{!isCelsius ? min : ((min - 32) * (5 / 9)).toFixed(1)}</p>
                </div>
                {day === Math.ceil(i/24) ? <input type='button' className='week__check selected' onClick={() => selectDay(Math.ceil(i/24))} id={Math.ceil(i/24)}></input> : <input type='button' className='week__check' onClick={() => selectDay(Math.ceil(i/24))} id={Math.ceil(i/24)}></input>}
            </div>
        )
    }

    return (
        <div className="weather">
            <div className='location__container'>
                <h2 className='location__name'>{address.split(/, (.*)/s)[0]}</h2>
                <p className='location__extra'>{address.split(/, (.*)/s)[1]}</p>
            </div>
            <div className='info__container'>
                <div className='temp__container'>
                    <img src={data[0].icon} alt='weather icon' className='current__icon'></img>
                    {day === 0 ? <h2 className='current__temp'>{!isCelsius ? data[0].temperature : ((data[0].temperature - 32) * (5 / 9)).toFixed(1)}</h2> : <h2 className='current__temp'>{!isCelsius ? highs[day] : ((highs[day] - 32) * (5 / 9)).toFixed(1)}</h2>}
                    <div className='switch__container'>
                        <input type="checkbox" className="temp__switch" onChange={changedTemp}></input>
                        <h2 className='fahrenheit'>°F</h2>
                        <div className='divider'></div>
                        <h2 className='celsius'>°C</h2>
                    </div>
                </div>
                <div className='extra--info__container'>
                    <h2 className='local__time'>{getDayName(data[day * 24].startTime)}</h2>
                    <p className='status'>{data[day * 24].shortForecast}</p>
                    <p className='humidity'>Humidity: {data[day * 24].relativeHumidity.value}%</p>
                </div>
            </div>
            <div className='dayforecast__toggle'>
                {showTemp ? <input type="button" className='dayforecast__button dayforecast__selected' onClick={clickedTemp} value="Temperature"></input> : <input type="button" className='dayforecast__button' onClick={clickedTemp} value="Temperature"></input>}
                {showTemp ? <input type="button" className='dayforecast__button' onClick={clickedPrec} value="Precipitation"></input> : <input type="button" className='dayforecast__button dayforecast__selected' onClick={clickedPrec} value="Precipitation"></input>}
            </div>
            <div className='dayforecast__container'>{dayforecasts}</div>
            <div className='weekforecast__container'>{weekforecasts}</div>
        </div>
    );
}

export default Weather;