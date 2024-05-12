import Search from "../search/Search";
import {useEffect, useState} from "react";

const Weather = () => {

    const[search,setSearch] = useState('');
    const[loading,setLoading] = useState(false);
    const[weatherData, setWeatherData] = useState(null);
    const[emptyData, setEmptyData] = useState(false);
    const[noData,setNoData] = useState(false);
    
    async function fetchWeatherData(param) {
        setLoading(true);
        try{
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=8247cfb6dbeaa578d2b20310b1ed4105
                `);

            if (!response.ok) {
                // Handle non-200 status codes
                const errorText = response.status === 404 ? 'City not found' : 'An error occurred';
                throw new Error(errorText);
            }

            const data = await response.json();
            
            if(data) {
                setWeatherData(data);
                setLoading(false);
                setNoData(false);
            }
            else {
                setWeatherData(null);
            }
        }
        catch (e) {
            setLoading(false);
            setNoData(true);
        }
        
    }

    async function handleSearch() {
        if(search !== "") {
            setEmptyData(false);
            fetchWeatherData(search)
        }
        else {
            setEmptyData(true);
        }
    }
    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us',{
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    }
    useEffect(() => {
      fetchWeatherData("San Diego");
    },[]);
    
    return <>
        <div>
            <Search
            search = {search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            />
            {
                emptyData ? <p className="empty-msg">Please Enter City</p>: 
                loading ? <div>Loading ...</div>:
                noData ? <p className="empty-msg">No Data Found. Please Enter correct City Name</p>:
                <div>
                    <div className="city-name">
                        <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temp">
                        {weatherData?.main?.temp}
                    </div>
                    <p className="description">
                        {weatherData && weatherData.weather && weatherData.weather[0]? weatherData.weather[0].description:""}
                    </p>
                    <div className="weather-info">
                        <div>
                            <div>
                                <p className="wind">{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="humidity">{weatherData?.main?.humidity}% </p>
                                <p>Humidity</p>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    </>

}

export default Weather;