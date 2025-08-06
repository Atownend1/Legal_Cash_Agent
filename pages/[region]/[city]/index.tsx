import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RegionSelector } from '../../../components/RegionSelector';
import { LocalizedContent } from '../../../components/LocalizedContent';

// Import regional configurations
import midlandsConfig from '../../../config/regions/midlands.config';
import londonConfig from '../../../config/regions/london.config';
import scotlandConfig from '../../../config/regions/scotland.config';
import irelandConfig from '../../../config/regions/ireland.config';
import germanyConfig from '../../../config/regions/germany.config';
import franceConfig from '../../../config/regions/france.config';
import netherlandsConfig from '../../../config/regions/netherlands.config';

interface CityPageProps {
  regionConfig: any;
  regionSlug: string;
  citySlug: string;
  cityData: {
    name: string;
    population: number;
    legalMarket: string;
    keyFirms: string[];
    specializations: string[];
    coordinates: { lat: number; lng: number };
  };
}

const CityPage: React.FC<CityPageProps> = ({ 
  regionConfig, 
  regionSlug, 
  citySlug, 
  cityData 
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const cityTitle = `Legal Cash Flow Management in ${cityData.name} | Yieldly ${regionConfig.name}`;
  const cityDescription = `Transform your ${cityData.name} legal practice with AI-powered cash flow management. Local support, regulatory compliance, and proven results for ${cityData.name} law firms.`;

  return (
    <>
      <Head>
        <title>{cityTitle}</title>
        <meta name="description" content={cityDescription} />
        <link rel="canonical" href={`https://${regionConfig.seo.canonicalDomain}/${citySlug}`} />
        
        {/* City-specific geo targeting */}
        <meta name="geo.region" content={regionConfig.country} />
        <meta name="geo.placename" content={cityData.name} />
        <meta name="geo.position" content={`${cityData.coordinates.lat};${cityData.coordinates.lng}`} />
        <meta name="ICBM" content={`${cityData.coordinates.lat}, ${cityData.coordinates.lng}`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={cityTitle} />
        <meta property="og:description" content={cityDescription} />
        <meta property="og:url" content={`https://${regionConfig.seo.canonicalDomain}/${citySlug}`} />
        <meta property="og:type" content="website" />
        
        {/* Local business structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": `Yieldly ${cityData.name}`,
            "description": cityDescription,
            "url": `https://${regionConfig.seo.canonicalDomain}/${citySlug}`,
            "areaServed": {
              "@type": "City",
              "name": cityData.name,
              "containedInPlace": {
                "@type": "Country",
                "name": regionConfig.country
              }
            },
            "serviceType": "Legal Technology Software",
            "priceRange": `${regionConfig.pricing.currency} ${regionConfig.pricing.startingPrice}+`,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": cityData.coordinates.lat,
              "longitude": cityData.coordinates.lng
            }
          })}
        </script>
      </Head>

      <div className="city-page">
        {/* Region selector */}
        <RegionSelector currentRegion={regionSlug} />

        {/* City Hero Section */}
        <section className="city-hero-section">
          <div className="container">
            <div className="breadcrumb">
              <a href={`/${regionSlug}`}>{regionConfig.name}</a>
              <span> / </span>
              <span>{cityData.name}</span>
            </div>
            
            <div className="city-hero-content">
              <h1>Legal Cash Flow Management in {cityData.name}</h1>
              <p className="city-subtitle">
                Transform your {cityData.name} legal practice with AI-powered cash flow management. 
                Join {cityData.keyFirms.length}+ successful law firms in {cityData.name} using Yieldly.
              </p>
              
              <div className="city-stats">
                <div className="stat">
                  <span className="stat-number">{cityData.population.toLocaleString()}</span>
                  <span className="stat-label">Population</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{cityData.keyFirms.length}+</span>
                  <span className="stat-label">Law Firms</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{cityData.legalMarket}</span>
                  <span className="stat-label">Market Size</span>
                </div>
              </div>
              
              <button className="cta-button">
                Get {cityData.name} Demo
              </button>
            </div>
          </div>
        </section>

        {/* Local Market Insights */}
        <section className="market-insights-section">
          <div className="container">
            <h2>{cityData.name} Legal Market</h2>
            
            <div className="insights-grid">
              <div className="insight-card">
                <h3>Market Specializations</h3>
                <ul>
                  {cityData.specializations.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
              
              <div className="insight-card">
                <h3>Local Advantages</h3>
                <ul>
                  <li>Local support team in {cityData.name}</li>
                  <li>{regionConfig.legal.regulatoryBody} compliance</li>
                  <li>Regional banking integration</li>
                  <li>City-specific workflows</li>
                </ul>
              </div>
              
              <div className="insight-card">
                <h3>Success Stories</h3>
                <p>
                  Law firms in {cityData.name} have achieved an average of 45% 
                  reduction in payment cycles using Yieldly's platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Features */}
        <section className="local-features-section">
          <div className="container">
            <h2>Why {cityData.name} Law Firms Choose Yieldly</h2>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="icon-map-pin"></i>
                </div>
                <h3>Local Support in {cityData.name}</h3>
                <p>
                  Dedicated account management with deep understanding of 
                  {cityData.name}'s legal market and business practices.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="icon-shield-check"></i>
                </div>
                <h3>{regionConfig.legal.regulatoryBody} Compliance</h3>
                <p>
                  Built-in compliance with local regulatory requirements 
                  and professional conduct rules.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="icon-clock"></i>
                </div>
                <h3>Rapid Implementation</h3>
                <p>
                  Get started in {cityData.name} within 48 hours with 
                  our streamlined onboarding process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Testimonials */}
        <section className="local-testimonials-section">
          <div className="container">
            <h2>Success Stories from {cityData.name}</h2>
            
            <div className="testimonial-card local-testimonial">
              <blockquote>
                "Yieldly transformed our {cityData.name} practice. We reduced our 
                client payment cycles by 52% while maintaining full compliance 
                with {regionConfig.legal.regulatoryBody} requirements."
              </blockquote>
              <div className="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span>Managing Partner</span>
                <span>Johnson & Associates, {cityData.name}</span>
              </div>
              
              <div className="testimonial-metrics">
                <div className="metric">
                  <span className="metric-number">52%</span>
                  <span className="metric-label">Payment Cycle Reduction</span>
                </div>
                <div className="metric">
                  <span className="metric-number">£67,000</span>
                  <span className="metric-label">Annual Savings</span>
                </div>
                <div className="metric">
                  <span className="metric-number">48hrs</span>
                  <span className="metric-label">Implementation Time</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Contact */}
        <section className="local-contact-section">
          <div className="container">
            <h2>Get Started in {cityData.name}</h2>
            
            <div className="contact-grid">
              <div className="contact-info">
                <h3>Local Support</h3>
                <p><strong>Phone:</strong> {regionConfig.contact.phone}</p>
                <p><strong>Email:</strong> {regionConfig.contact.email}</p>
                <p><strong>Support Hours:</strong> {regionConfig.contact.supportHours}</p>
                <p><strong>Coverage:</strong> {cityData.name} and surrounding areas</p>
              </div>
              
              <div className="demo-form">
                <h3>Request {cityData.name} Demo</h3>
                <form className="demo-request-form">
                  <input 
                    type="text" 
                    placeholder="Firm Name" 
                    required 
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required 
                  />
                  <select required>
                    <option value="">Practice Area</option>
                    {cityData.specializations.map((spec, index) => (
                      <option key={index} value={spec}>{spec}</option>
                    ))}
                  </select>
                  <button type="submit" className="submit-button">
                    Schedule {cityData.name} Demo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Define city mappings for each region
  const cityMappings: Record<string, string[]> = {
    midlands: ['birmingham', 'coventry', 'wolverhampton', 'worcester', 'stoke-on-trent'],
    london: ['london', 'westminster', 'city-of-london', 'canary-wharf'],
    scotland: ['edinburgh', 'glasgow', 'aberdeen', 'dundee', 'stirling'],
    ireland: ['dublin', 'cork', 'galway', 'limerick', 'waterford'],
    germany: ['berlin', 'munich', 'hamburg', 'cologne', 'frankfurt'],
    deutschland: ['berlin', 'muenchen', 'hamburg', 'koeln', 'frankfurt'],
    france: ['paris', 'lyon', 'marseille', 'toulouse', 'nice'],
    netherlands: ['amsterdam', 'rotterdam', 'den-haag', 'utrecht', 'eindhoven'],
    nederland: ['amsterdam', 'rotterdam', 'den-haag', 'utrecht', 'eindhoven']
  };

  const paths: Array<{ params: { region: string; city: string } }> = [];

  Object.entries(cityMappings).forEach(([region, cities]) => {
    cities.forEach(city => {
      paths.push({
        params: { region, city }
      });
    });
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const regionSlug = params?.region as string;
  const citySlug = params?.city as string;
  
  const configMap: Record<string, any> = {
    midlands: midlandsConfig,
    london: londonConfig,
    scotland: scotlandConfig,
    ireland: irelandConfig,
    germany: germanyConfig,
    deutschland: germanyConfig,
    france: franceConfig,
    netherlands: netherlandsConfig,
    nederland: netherlandsConfig
  };

  const regionConfig = configMap[regionSlug];

  if (!regionConfig) {
    return { notFound: true };
  }

  // City data mapping (in production, this would come from a database)
  const cityDataMap: Record<string, Record<string, any>> = {
    birmingham: {
      name: 'Birmingham',
      population: 1141374,
      legalMarket: 'Large',
      keyFirms: ['Pinsent Masons', 'Eversheds Sutherland', 'DLA Piper'],
      specializations: ['Commercial Law', 'Property Law', 'Employment Law', 'Corporate Law'],
      coordinates: { lat: 52.4862, lng: -1.8904 }
    },
    london: {
      name: 'London',
      population: 9648110,
      legalMarket: 'Very Large',
      keyFirms: ['Magic Circle', 'Silver Circle', 'US Elite'],
      specializations: ['Corporate Law', 'Financial Services', 'International Law', 'M&A'],
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    edinburgh: {
      name: 'Edinburgh',
      population: 540000,
      legalMarket: 'Medium',
      keyFirms: ['Shepherd and Wedderburn', 'CMS', 'Burness Paull'],
      specializations: ['Property Law', 'Corporate Law', 'Family Law', 'Criminal Law'],
      coordinates: { lat: 55.9533, lng: -3.1883 }
    },
    dublin: {
      name: 'Dublin',
      population: 1388000,
      legalMarket: 'Large',
      keyFirms: ['A&L Goodbody', 'Arthur Cox', 'McCann FitzGerald'],
      specializations: ['Corporate Law', 'Financial Services', 'EU Regulatory', 'Tax Law'],
      coordinates: { lat: 53.3498, lng: -6.2603 }
    },
    berlin: {
      name: 'Berlin',
      population: 3669000,
      legalMarket: 'Large',
      keyFirms: ['Freshfields', 'CMS', 'Noerr'],
      specializations: ['Corporate Law', 'Technology Law', 'Public Law', 'Employment Law'],
      coordinates: { lat: 52.5200, lng: 13.4050 }
    },
    paris: {
      name: 'Paris',
      population: 2161000,
      legalMarket: 'Very Large',
      keyFirms: ['Cleary Gottlieb', 'Freshfields', 'CMS'],
      specializations: ['Corporate Law', 'Financial Services', 'EU Law', 'Tax Law'],
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    amsterdam: {
      name: 'Amsterdam',
      population: 872000,
      legalMarket: 'Large',
      keyFirms: ['Loyens & Loeff', 'NautaDutilh', 'De Brauw'],
      specializations: ['Corporate Law', 'Financial Services', 'Tax Law', 'EU Regulatory'],
      coordinates: { lat: 52.3676, lng: 4.9041 }
    }
  };

  const cityData = cityDataMap[citySlug];

  if (!cityData) {
    return { notFound: true };
  }

  return {
    props: {
      regionConfig,
      regionSlug,
      citySlug,
      cityData
    },
    revalidate: 3600
  };
};

export default CityPage;