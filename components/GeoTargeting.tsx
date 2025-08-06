import React, { useState, useEffect } from 'react';
import masterConfig from '../config/master.config.js';

interface GeoTargetingProps {
  onRegionDetected: (region: string) => void;
  onLocationError: (error: string) => void;
  className?: string;
}

interface LocationData {
  country: string;
  region?: string;
  city?: string;
  timezone?: string;
}

const GeoTargeting: React.FC<GeoTargetingProps> = ({
  onRegionDetected,
  onLocationError,
  className = ''
}) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    detectUserLocation();
  }, []);

  const detectUserLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Method 1: Try to get location from IP geolocation
      const ipLocation = await getLocationFromIP();
      if (ipLocation) {
        setLocation(ipLocation);
        const detectedRegion = mapLocationToRegion(ipLocation);
        onRegionDetected(detectedRegion);
        return;
      }

      // Method 2: Try browser geolocation (requires user permission)
      const browserLocation = await getLocationFromBrowser();
      if (browserLocation) {
        setLocation(browserLocation);
        const detectedRegion = mapLocationToRegion(browserLocation);
        onRegionDetected(detectedRegion);
        return;
      }

      // Method 3: Use timezone as fallback
      const timezoneLocation = getLocationFromTimezone();
      if (timezoneLocation) {
        setLocation(timezoneLocation);
        const detectedRegion = mapLocationToRegion(timezoneLocation);
        onRegionDetected(detectedRegion);
        return;
      }

      // Fallback to default region
      onRegionDetected(masterConfig.global.defaultRegion);
      setError('Could not detect location, using default region');

    } catch (err) {
      console.error('Location detection error:', err);
      setError('Location detection failed');
      onLocationError('Location detection failed');
      onRegionDetected(masterConfig.global.defaultRegion);
    } finally {
      setLoading(false);
    }
  };

  const getLocationFromIP = async (): Promise<LocationData | null> => {
    try {
      // Use a free IP geolocation service
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        return {
          country: data.country_code,
          region: data.region,
          city: data.city,
          timezone: data.timezone
        };
      }
    } catch (err) {
      console.warn('IP geolocation failed:', err);
    }
    return null;
  };

  const getLocationFromBrowser = (): Promise<LocationData | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            
            if (response.ok) {
              const data = await response.json();
              resolve({
                country: data.countryCode,
                region: data.locality,
                city: data.city,
                timezone: data.timezone
              });
            } else {
              resolve(null);
            }
          } catch (err) {
            console.warn('Browser geolocation reverse lookup failed:', err);
            resolve(null);
          }
        },
        (error) => {
          console.warn('Browser geolocation failed:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  };

  const getLocationFromTimezone = (): LocationData | null => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const timezoneMap: { [key: string]: LocationData } = {
        'Europe/London': { country: 'UK', timezone: 'Europe/London' },
        'Europe/Dublin': { country: 'IE', timezone: 'Europe/Dublin' },
        'Europe/Berlin': { country: 'DE', timezone: 'Europe/Berlin' },
        'Europe/Paris': { country: 'FR', timezone: 'Europe/Paris' },
        'Europe/Amsterdam': { country: 'NL', timezone: 'Europe/Amsterdam' }
      };

      return timezoneMap[timezone] || { country: 'UK', timezone: 'Europe/London' };
    } catch (err) {
      console.warn('Timezone detection failed:', err);
      return null;
    }
  };

  const mapLocationToRegion = (location: LocationData): string => {
    const { country, region, city } = location;

    // UK regions
    if (country === 'GB' || country === 'UK') {
      // Midlands cities
      const midlandsCities = [
        'Birmingham', 'Coventry', 'Leicester', 'Nottingham', 'Derby',
        'Wolverhampton', 'Stoke-on-Trent', 'Walsall', 'Dudley', 'Sandwell',
        'Solihull', 'Warwick', 'Rugby', 'Northampton', 'Milton Keynes',
        'Bedford', 'Luton', 'Peterborough', 'Cambridge', 'Oxford'
      ];

      // London areas
      const londonAreas = [
        'London', 'Westminster', 'Camden', 'Islington', 'Hackney',
        'Tower Hamlets', 'Southwark', 'Lambeth', 'Wandsworth',
        'Hammersmith and Fulham', 'Kensington and Chelsea', 'City of London'
      ];

      if (city && midlandsCities.some(c => city.toLowerCase().includes(c.toLowerCase()))) {
        return 'midlands';
      }

      if (city && londonAreas.some(c => city.toLowerCase().includes(c.toLowerCase()))) {
        return 'london';
      }

      // Default to Midlands for UK
      return 'midlands';
    }

    // Other countries
    const countryRegionMap: { [key: string]: string } = {
      'IE': 'ireland',
      'DE': 'germany',
      'FR': 'france',
      'NL': 'netherlands'
    };

    return countryRegionMap[country] || masterConfig.global.defaultRegion;
  };

  const getRegionDisplayName = (regionCode: string): string => {
    const region = masterConfig.global.regions[regionCode as keyof typeof masterConfig.global.regions];
    return region ? region.name : 'Unknown Region';
  };

  if (loading) {
    return (
      <div className={`geo-targeting-loading ${className}`}>
        <div className="loading-spinner"></div>
        <p>Detecting your location...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`geo-targeting-error ${className}`}>
        <p>⚠️ {error}</p>
        <p>Using default region: {getRegionDisplayName(masterConfig.global.defaultRegion)}</p>
      </div>
    );
  }

  return (
    <div className={`geo-targeting ${className}`}>
      {location && (
        <div className="location-info">
          <p>
            📍 Detected location: {location.city || location.region || location.country}
          </p>
          <p>
            🌍 Serving content for: {getRegionDisplayName(mapLocationToRegion(location))}
          </p>
        </div>
      )}
      
      <style jsx>{`
        .geo-targeting-loading,
        .geo-targeting-error,
        .geo-targeting {
          text-align: center;
          padding: 1rem;
          background: rgba(96, 165, 250, 0.1);
          border-radius: 8px;
          margin: 1rem 0;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(96, 165, 250, 0.3);
          border-top: 2px solid #60a5fa;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .geo-targeting-loading p,
        .geo-targeting-error p,
        .geo-targeting p {
          color: #94a3b8;
          margin: 0.5rem 0;
          font-size: 0.9rem;
        }

        .geo-targeting-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .location-info {
          color: #60a5fa;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default GeoTargeting; 