import './css/body.css'
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


function useDataJson(ipAddress) {
    console.log("new call for ipaddress data api. ip: "+ipAddress);
    const [dataJson, setJson] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
                const data = await response.json();
                setJson(data);
            } catch (error) {
                console.error('Error fetching IP data:', error);
                throw new Error('Unable to fetch IP data');
            }
        };

        fetchData();
    }, [ipAddress]); // Include ipAddress in the dependency array

    return dataJson;
}

const MapComponent = ({ latitude, longitude }) => {
    console.log("new call for map api. lat: "+latitude+", lon: "+longitude);
    useEffect(() => {
        const map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([latitude, longitude]).addTo(map)
            .bindPopup('Your Location')
            .openPopup();

        return () => {
            map.remove();
        };
    }, [latitude, longitude]);

    return (
        <div id="map" style={{ height: '400px', width: '100%' }} />
    );
};


function MainBody(ipAddress) {
    console.log("we got the ip of: "+ipAddress)
    let ipData = useDataJson(ipAddress);
    // console.log(ipData);
    if(ipData.status==="success"){
        return(
            <div class="container">
                <h1>Location Information</h1>
                
                <div class="location-info">
                    <div class="info-item">
                        <span class="info-label">IP Address: </span>
                        <span class="info-value">{ipAddress}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Country: </span>
                        <span class="info-value">{ipData.country}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">City: </span>
                        <span class="info-value">{ipData.city}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Latitude: </span>
                        <span class="info-value">{ipData.lat}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Longitude: </span>
                        <span class="info-value">{ipData.lon}</span>
                    </div>            
                </div>
                <div className='container' id='mapContainer'>
                    <MapComponent latitude={ipData.lat} longitude={ipData.lon}/>
                </div> 
            </div>
        )
    }

    return (
        <div>
            <p>Your IP address is: {ipAddress}</p>
        </div>
    )
}

export default MainBody;
