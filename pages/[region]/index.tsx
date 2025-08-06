import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RegionSelector } from '../../components/RegionSelector';
import { LocalizedContent } from '../../components/LocalizedContent';
import { GeoTargeting } from '../../components/GeoTargeting';

// Import all regional configurations
import midlandsConfig from '../../config/regions/midlands.config';
import londonConfig from '../../config/regions/london.config';
import scotlandConfig from '../../config/regions/scotland.config';
import irelandConfig from '../../config/regions/ireland.config';
import germanyConfig from '../../config/regions/germany.config';
import franceConfig from '../../config/regions/france.config';
import netherlandsConfig from '../../config/regions/netherlands.config';

interface RegionalPageProps {
  regionConfig: any;
  regionSlug: string;
  heroContent: string;
  featuresContent: string;
}

const RegionalPage: React.FC<RegionalPageProps> = ({ 
  regionConfig, 
  regionSlug, 
  heroContent, 
  featuresContent 
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{regionConfig.seo.metaTitle}</title>
        <meta name="description" content={regionConfig.seo.metaDescription} />
        <link rel="canonical" href={`https://${regionConfig.seo.canonicalDomain}`} />
        
        {/* Hreflang tags for international SEO */}
        {regionConfig.seo.hreflangs.map((hreflang: any) => (
          <link 
            key={hreflang.lang}
            rel="alternate" 
            hrefLang={hreflang.lang} 
            href={hreflang.url} 
          />
        ))}
        
        {/* Regional meta tags */}
        <meta property="og:title" content={regionConfig.seo.metaTitle} />
        <meta property="og:description" content={regionConfig.seo.metaDescription} />
        <meta property="og:url" content={`https://${regionConfig.seo.canonicalDomain}`} />
        <meta property="og:locale" content={regionConfig.language} />
        
        {/* Geo-targeting meta tags */}
        <meta name="geo.region" content={regionConfig.country} />
        <meta name="geo.placename" content={regionConfig.name} />
        <meta name="geo.position" content={`${regionConfig.geo.coordinates.lat};${regionConfig.geo.coordinates.lng}`} />
        <meta name="ICBM" content={`${regionConfig.geo.coordinates.lat}, ${regionConfig.geo.coordinates.lng}`} />
        
        {/* Structured data for regional business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": `Yieldly ${regionConfig.name}`,
            "description": regionConfig.seo.metaDescription,
            "url": `https://${regionConfig.seo.canonicalDomain}`,
            "areaServed": {
              "@type": "Country",
              "name": regionConfig.country
            },
            "serviceType": "Legal Technology Software",
            "priceRange": `${regionConfig.pricing.currency} ${regionConfig.pricing.startingPrice}+`,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": regionConfig.contact.address.street,
              "addressLocality": regionConfig.contact.address.city,
              "postalCode": regionConfig.contact.address.postcode,
              "addressCountry": regionConfig.contact.address.country
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": regionConfig.contact.phone,
              "email": regionConfig.contact.email,
              "contactType": "customer service",
              "availableLanguage": regionConfig.contact.languages
            }
          })}
        </script>
      </Head>

      <div className="regional-page">
        {/* Geo-targeting component */}
        <GeoTargeting currentRegion={regionSlug} />
        
        {/* Region selector */}
        <RegionSelector currentRegion={regionSlug} />

        {/* Hero Section */}
        <section className="hero-section" style={{ 
          background: `linear-gradient(135deg, ${getRegionColors(regionSlug).primary}, ${getRegionColors(regionSlug).secondary})` 
        }}>
          <div className="container">
            <div className="hero-content">
              <LocalizedContent 
                region={regionSlug} 
                contentType="hero" 
                fallbackContent={heroContent}
              />
              
              <div className="hero-stats">
                {regionConfig.content.testimonials[0]?.metrics && (
                  <div className="stats-grid">
                    <div className="stat">
                      <span className="stat-number">{regionConfig.content.testimonials[0].metrics.lockupReduction}</span>
                      <span className="stat-label">Lock-up Reduction</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{regionConfig.content.testimonials[0].metrics.savings}</span>
                      <span className="stat-label">Average Savings</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{regionConfig.content.testimonials[0].metrics.implementation}</span>
                      <span className="stat-label">Implementation Time</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2>Features Built for {regionConfig.name}</h2>
            
            <div className="features-grid">
              {regionConfig.content.features.primary.map((feature: any, index: number) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <i className={`icon-${feature.icon}`}></i>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>

            <LocalizedContent 
              region={regionSlug} 
              contentType="features" 
              fallbackContent={featuresContent}
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="container">
            <h2>What {regionConfig.name} Legal Professionals Say</h2>
            
            {regionConfig.content.testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="testimonial-card">
                <blockquote>"{testimonial.quote}"</blockquote>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.title}</span>
                  <span>{testimonial.firm}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing-section">
          <div className="container">
            <h2>Pricing for {regionConfig.name}</h2>
            
            <div className="pricing-grid">
              {regionConfig.pricing.packages.map((pkg: any, index: number) => (
                <div key={index} className="pricing-card">
                  <h3>{pkg.name}</h3>
                  <div className="price">
                    <span className="currency">{regionConfig.pricing.currency}</span>
                    <span className="amount">{pkg.price}</span>
                    <span className="period">/month</span>
                  </div>
                  <ul className="features-list">
                    {pkg.features.map((feature: string, fIndex: number) => (
                      <li key={fIndex}>{feature}</li>
                    ))}
                  </ul>
                  <div className="ideal-for">Ideal for: {pkg.ideal}</div>
                  <button className="cta-button">
                    Start {regionConfig.name} Demo
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Contact Section */}
        <section className="contact-section">
          <div className="container">
            <h2>Local Support in {regionConfig.name}</h2>
            
            <div className="contact-info">
              <div className="contact-details">
                <h3>Get in Touch</h3>
                <p><strong>Phone:</strong> {regionConfig.contact.phone}</p>
                <p><strong>Email:</strong> {regionConfig.contact.email}</p>
                <p><strong>Support Hours:</strong> {regionConfig.contact.supportHours}</p>
                <p><strong>Languages:</strong> {regionConfig.contact.languages.join(', ')}</p>
              </div>
              
              <div className="office-address">
                <h3>Local Office</h3>
                <address>
                  {regionConfig.contact.address.street}<br />
                  {regionConfig.contact.address.city} {regionConfig.contact.address.postcode}<br />
                  {regionConfig.contact.address.country}
                </address>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Get region-specific colors for theming
function getRegionColors(region: string) {
  const colorMap: Record<string, { primary: string; secondary: string }> = {
    midlands: { primary: '#60a5fa', secondary: '#3b82f6' },
    london: { primary: '#8b5cf6', secondary: '#7c3aed' },
    scotland: { primary: '#10b981', secondary: '#059669' },
    ireland: { primary: '#f59e0b', secondary: '#d97706' },
    germany: { primary: '#ef4444', secondary: '#dc2626' },
    france: { primary: '#3b82f6', secondary: '#2563eb' },
    netherlands: { primary: '#f97316', secondary: '#ea580c' }
  };
  
  return colorMap[region] || colorMap.midlands;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const regions = [
    'midlands', 'london', 'scotland', 'ireland', 
    'germany', 'deutschland', 'france', 'netherlands', 'nederland'
  ];

  const paths = regions.map((region) => ({
    params: { region }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const regionSlug = params?.region as string;
  
  // Map region slugs to configurations
  const configMap: Record<string, any> = {
    midlands: midlandsConfig,
    london: londonConfig,
    scotland: scotlandConfig,
    ireland: irelandConfig,
    germany: germanyConfig,
    deutschland: germanyConfig, // German alias
    france: franceConfig,
    netherlands: netherlandsConfig,
    nederland: netherlandsConfig // Dutch alias
  };

  const regionConfig = configMap[regionSlug];

  if (!regionConfig) {
    return {
      notFound: true
    };
  }

  // Load content files (in a real implementation, these would be loaded from filesystem)
  const heroContent = "Default hero content";
  const featuresContent = "Default features content";

  return {
    props: {
      regionConfig,
      regionSlug,
      heroContent,
      featuresContent
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default RegionalPage;