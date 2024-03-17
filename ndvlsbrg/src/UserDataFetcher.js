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


export var BrowserAgent = navigator.userAgent;
export var BrowserVersion = GetBrowserVersion();

export function GetBrowserVersion() {
  var userAgent = navigator.userAgent;
  var isMobile = /Mobile/.test(userAgent);

  var browserType;
  var version;

  if (/OPR/.test(userAgent)) {
    browserType = "Opera";
    version = userAgent.match(/OPR\/(\S+)/)[1];
  } else if (/Chrome/.test(userAgent)) {
    browserType = "Google Chrome";
    version = userAgent.match(/Chrome\/(\S+)/)[1];
  } else if (/Safari/.test(userAgent)) {
    browserType = "Safari";
    version = userAgent.match(/Version\/(\S+)/)[1];
  } else if (/Firefox/.test(userAgent)) {
    browserType = "Mozilla Firefox";
    version = userAgent.match(/Firefox\/(\S+)/)[1];
  } else if (/Edge/.test(userAgent)) {
    browserType = "Microsoft Edge";
    version = userAgent.match(/Edge\/(\S+)/)[1];
  } else if (/Trident/.test(userAgent)) {
    browserType = "Internet Explorer";
    version = userAgent.match(/rv:(\S+)/)[1];
  } else {
    browserType = "Unknown";
    version = "Unknown";
  }

  return  { browserType: browserType, Version: version, Ismobile: isMobile};
}

export default IPAddressFetcher;
