import './css/body.css'
import React, { useState, useEffect } from 'react';

function useIPAddress() {
    const [ipAddress, setIPAddress] = useState('');

    useEffect(() => {
        const fetchIPAddress = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIPAddress(data.ip);
            } catch (error) {
                console.error('Error fetching IP address:', error);
                throw new Error('Unable to fetch IP address');
            }
        };

        fetchIPAddress();
    }, []);

    return ipAddress;
}


function useDataJson(ipAddress) {
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


function MainBody() {
    const ipAddress = useIPAddress();
    let ipData = useDataJson(ipAddress);
    console.log(ipData)
    if(ipData.status=="success"){
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
