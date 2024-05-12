import React, { useState, useEffect } from 'react';

function Location() {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            onError({
                code: 0,
                message: 'Geolocation not supported',
            });
        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }, []);

    return (
        <div>
            <h4>Your Location</h4>
            {location.loaded ? 
                location.error ? 
                    <div>Error: The Geolocation service failed. {location.error.message}</div> :
                    <ul>
                        <li>Latitude: {location.coordinates.lat}</li>
                        <li>Longitude: {location.coordinates.lng}</li>
                    </ul>
            : <div>Loading...</div>}
        </div>
    );
}

export default Location;
