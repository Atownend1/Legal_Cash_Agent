import { NextApiRequest, NextApiResponse } from 'next';
import masterConfig from '../../config/master.config.js';

interface LocationData {
  country: string;
  region?: string;
  city?: string;
  timezone?: string;
}

interface GeoRedirectResponse {
  region: string;
  redirectUrl?: string;
  detectedLocation?: LocationData;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeoRedirectResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      region: masterConfig.global.defaultRegion,
      message: 'Method not allowed'
    });
  }

  try {
    // Get client IP
    const clientIP = req.headers['x-forwarded-for'] || 
                    req.headers['x-real-ip'] || 
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress;

    // Detect location from IP
    const location = await detectLocationFromIP(clientIP as string);
    
    // Map location to region
    const region = mapLocationToRegion(location);
    
    // Check if region is active
    const regionConfig = masterConfig.global.regions[region as keyof typeof masterConfig.global.regions];
    const isActive = regionConfig && regionConfig.isActive;
    
    // Use default region if detected region is not active
    const finalRegion = isActive ? region : masterConfig.global.defaultRegion;
    
    // Generate redirect URL if needed
    const redirectUrl = generateRedirectUrl(finalRegion, req.url || '/');
    
    const response: GeoRedirectResponse = {
      region: finalRegion,
      detectedLocation: location,
      message: `Detected region: ${finalRegion}`
    };

    if (redirectUrl && redirectUrl !== req.url) {
      response.redirectUrl = redirectUrl;
      response.message = `Redirecting to ${finalRegion} region`;
    }

    // Set cache headers
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('X-Region', finalRegion);
    
    return res.status(200).json(response);

  } catch (error) {
    console.error('Geo redirect error:', error);
    
    return res.status(500).json({
      region: masterConfig.global.defaultRegion,
      message: 'Location detection failed, using default region'
    });
  }
}

async function detectLocationFromIP(ip: string): Promise<LocationData> {
  try {
    // Use IP geolocation service
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country_code,
        region: data.region,
        city: data.city,
        timezone: data.timezone
      };
    }
  } catch (error) {
    console.warn('IP geolocation failed:', error);
  }

  // Fallback to timezone detection
  return getLocationFromTimezone();
}

function getLocationFromTimezone(): LocationData {
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
  } catch (error) {
    console.warn('Timezone detection failed:', error);
    return { country: 'UK', timezone: 'Europe/London' };
  }
}

function mapLocationToRegion(location: LocationData): string {
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
}

function generateRedirectUrl(region: string, currentUrl: string): string | null {
  // If already on the correct regional URL, no redirect needed
  if (currentUrl.includes(`/${region}`) || currentUrl.includes(`region=${region}`)) {
    return null;
  }

  // Generate regional URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.yieldlycf.com';
  const regionalUrl = `${baseUrl}/${region}${currentUrl.startsWith('/') ? currentUrl : `/${currentUrl}`}`;
  
  return regionalUrl;
}

// Export for use in other parts of the application
export { detectLocationFromIP, mapLocationToRegion, generateRedirectUrl }; 