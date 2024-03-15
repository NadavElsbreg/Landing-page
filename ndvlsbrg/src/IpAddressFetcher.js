import React, { useEffect ,useState} from 'react';

function IPAddressFetcher(setIPAddress) {
    const [ipAddress] = useState('');

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

export default IPAddressFetcher;
