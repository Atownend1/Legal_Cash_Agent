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

interface ServicePageProps {
  regionConfig: any;
  regionSlug: string;
  serviceSlug: string;
  serviceData: {
    name: string;
    description: string;
    features: string[];
    benefits: string[];
    pricing: {
      starting: number;
      enterprise: number;
    };
    useCases: Array<{
      title: string;
      description: string;
      outcome: string;
    }>;
    integrations: string[];
  };
}

const ServicePage: React.FC<ServicePageProps> = ({ 
  regionConfig, 
  regionSlug, 
  serviceSlug, 
  serviceData 
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const serviceTitle = `${serviceData.name} for ${regionConfig.name} Law Firms | Yieldly`;
  const serviceDescription = `${serviceData.description} Designed specifically for ${regionConfig.name} legal practices with full regulatory compliance.`;

  return (
    <>
      <Head>
        <title>{serviceTitle}</title>
        <meta name="description" content={serviceDescription} />
        <link rel="canonical" href={`https://${regionConfig.seo.canonicalDomain}/${serviceSlug}`} />
        
        {/* Service-specific meta tags */}
        <meta property="og:title" content={serviceTitle} />
        <meta property="og:description" content={serviceDescription} />
        <meta property="og:url" content={`https://${regionConfig.seo.canonicalDomain}/${serviceSlug}`} />
        <meta property="og:type" content="product" />
        
        {/* Product structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `${serviceData.name} - ${regionConfig.name}`,
            "description": serviceDescription,
            "url": `https://${regionConfig.seo.canonicalDomain}/${serviceSlug}`,
            "brand": {
              "@type": "Brand",
              "name": "Yieldly"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": regionConfig.pricing.currency,
              "price": serviceData.pricing.starting,
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock",
              "areaServed": {
                "@type": "Country",
                "name": regionConfig.country
              }
            },
            "category": "Legal Technology Software"
          })}
        </script>
      </Head>

      <div className="service-page">
        {/* Region selector */}
        <RegionSelector currentRegion={regionSlug} />

        {/* Service Hero Section */}
        <section className="service-hero-section">
          <div className="container">
            <div className="breadcrumb">
              <a href={`/${regionSlug}`}>{regionConfig.name}</a>
              <span> / </span>
              <span>Services</span>
              <span> / </span>
              <span>{serviceData.name}</span>
            </div>
            
            <div className="service-hero-content">
              <h1>{serviceData.name} for {regionConfig.name} Law Firms</h1>
              <p className="service-subtitle">{serviceData.description}</p>
              
              <div className="service-highlights">
                <div className="highlight">
                  <span className="highlight-label">Starting at</span>
                  <span className="highlight-value">
                    {regionConfig.pricing.currency}{serviceData.pricing.starting}/month
                  </span>
                </div>
                <div className="highlight">
                  <span className="highlight-label">Compliance</span>
                  <span className="highlight-value">
                    {regionConfig.legal.regulatoryBody}
                  </span>
                </div>
                <div className="highlight">
                  <span className="highlight-label">Setup Time</span>
                  <span className="highlight-value">48 hours</span>
                </div>
              </div>
              
              <div className="hero-cta">
                <button className="cta-button primary">
                  Start {regionConfig.name} Demo
                </button>
                <button className="cta-button secondary">
                  View Pricing
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section className="service-features-section">
          <div className="container">
            <h2>Key Features</h2>
            
            <div className="features-grid">
              {serviceData.features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <i className="icon-check-circle"></i>
                  </div>
                  <h3>{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Benefits */}
        <section className="service-benefits-section">
          <div className="container">
            <h2>Benefits for {regionConfig.name} Practices</h2>
            
            <div className="benefits-grid">
              {serviceData.benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">
                    <i className="icon-trending-up"></i>
                  </div>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="use-cases-section">
          <div className="container">
            <h2>Real-World Applications</h2>
            
            <div className="use-cases-grid">
              {serviceData.useCases.map((useCase, index) => (
                <div key={index} className="use-case-card">
                  <h3>{useCase.title}</h3>
                  <p className="use-case-description">{useCase.description}</p>
                  <div className="use-case-outcome">
                    <strong>Outcome:</strong> {useCase.outcome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="integrations-section">
          <div className="container">
            <h2>Integrations for {regionConfig.name}</h2>
            
            <div className="integrations-grid">
              {serviceData.integrations.map((integration, index) => (
                <div key={index} className="integration-card">
                  <div className="integration-logo">
                    <img src={`/images/integrations/${integration.toLowerCase().replace(/\s+/g, '-')}.png`} 
                         alt={integration} />
                  </div>
                  <span>{integration}</span>
                </div>
              ))}
            </div>
            
            <p className="integrations-note">
              Full compatibility with {regionConfig.name}'s most popular legal and accounting software.
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="service-pricing-section">
          <div className="container">
            <h2>Pricing for {regionConfig.name}</h2>
            
            <div className="pricing-comparison">
              <div className="pricing-card starter">
                <h3>Professional</h3>
                <div className="price">
                  <span className="currency">{regionConfig.pricing.currency}</span>
                  <span className="amount">{serviceData.pricing.starting}</span>
                  <span className="period">/month</span>
                </div>
                <ul className="pricing-features">
                  <li>Core {serviceData.name} features</li>
                  <li>{regionConfig.legal.regulatoryBody} compliance</li>
                  <li>Email support</li>
                  <li>Basic integrations</li>
                </ul>
                <button className="pricing-cta">Start Professional Trial</button>
              </div>
              
              <div className="pricing-card enterprise">
                <h3>Enterprise</h3>
                <div className="price">
                  <span className="currency">{regionConfig.pricing.currency}</span>
                  <span className="amount">{serviceData.pricing.enterprise}</span>
                  <span className="period">/month</span>
                </div>
                <ul className="pricing-features">
                  <li>All Professional features</li>
                  <li>Advanced {serviceData.name} capabilities</li>
                  <li>Priority support</li>
                  <li>Custom integrations</li>
                  <li>Dedicated account manager</li>
                </ul>
                <button className="pricing-cta">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Compliance */}
        <section className="compliance-section">
          <div className="container">
            <h2>Regulatory Compliance</h2>
            
            <div className="compliance-grid">
              <div className="compliance-card">
                <h3>{regionConfig.legal.regulatoryBody}</h3>
                <p>
                  Fully compliant with {regionConfig.legal.regulatoryBody} regulations 
                  and professional conduct requirements.
                </p>
              </div>
              
              <div className="compliance-card">
                <h3>Data Protection</h3>
                <p>
                  GDPR compliant with {regionConfig.name} data residency requirements 
                  and privacy regulations.
                </p>
              </div>
              
              <div className="compliance-card">
                <h3>Financial Regulations</h3>
                <p>
                  Adheres to client account management rules and anti-money laundering 
                  requirements in {regionConfig.name}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Transform Your {regionConfig.name} Practice?</h2>
              <p>
                Join hundreds of {regionConfig.name} law firms already using {serviceData.name} 
                to improve their cash flow and client satisfaction.
              </p>
              
              <div className="cta-buttons">
                <button className="cta-button primary">
                  Schedule {regionConfig.name} Demo
                </button>
                <button className="cta-button secondary">
                  Download {regionConfig.name} Case Study
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const regions = [
    'midlands', 'london', 'scotland', 'ireland', 
    'germany', 'deutschland', 'france', 'netherlands', 'nederland'
  ];

  const services = [
    'cash-flow-management',
    'invoice-automation',
    'payment-tracking',
    'compliance-monitoring',
    'financial-analytics',
    'client-portal',
    'integration-services'
  ];

  const paths: Array<{ params: { region: string; service: string } }> = [];

  regions.forEach(region => {
    services.forEach(service => {
      paths.push({
        params: { region, service }
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
  const serviceSlug = params?.service as string;
  
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

  // Service data mapping
  const serviceDataMap: Record<string, any> = {
    'cash-flow-management': {
      name: 'AI-Powered Cash Flow Management',
      description: 'Transform your law firm\'s cash flow with intelligent payment predictions and automated invoice management.',
      features: [
        'Real-time cash flow forecasting',
        'Automated payment reminders',
        'Client payment behavior analysis',
        'Lock-up period optimization',
        'Multi-currency support',
        'Integration with major accounting platforms'
      ],
      benefits: [
        'Reduce payment delays by up to 70%',
        'Improve cash flow predictability',
        'Minimize bad debt write-offs',
        'Increase partner profitability',
        'Streamline collection processes',
        'Enhanced client relationships'
      ],
      pricing: {
        starting: regionConfig.pricing.startingPrice,
        enterprise: regionConfig.pricing.startingPrice * 3
      },
      useCases: [
        {
          title: 'Large Corporate Transactions',
          description: 'Managing complex multi-stage billing for major corporate clients',
          outcome: '45% reduction in payment cycle times'
        },
        {
          title: 'Personal Injury Cases',
          description: 'Tracking contingency fee collections and disbursement management',
          outcome: '60% improvement in cash flow predictability'
        },
        {
          title: 'Property Conveyancing',
          description: 'Automated milestone billing and completion tracking',
          outcome: '30% faster transaction completions'
        }
      ],
      integrations: regionConfig.integrations.recommended
    },
    'invoice-automation': {
      name: 'Intelligent Invoice Automation',
      description: 'Automate your entire billing process with AI-powered invoice generation and tracking.',
      features: [
        'Automated invoice generation',
        'Smart billing templates',
        'Time and expense capture',
        'Multi-rate billing structures',
        'Automated approval workflows',
        'Client-specific billing rules'
      ],
      benefits: [
        'Reduce billing time by 80%',
        'Eliminate billing errors',
        'Accelerate invoice delivery',
        'Improve billing compliance',
        'Standardize billing processes',
        'Real-time billing insights'
      ],
      pricing: {
        starting: Math.round(regionConfig.pricing.startingPrice * 0.7),
        enterprise: Math.round(regionConfig.pricing.startingPrice * 2.5)
      },
      useCases: [
        {
          title: 'Multi-Matter Billing',
          description: 'Automated billing across multiple active matters for single clients',
          outcome: '75% reduction in billing preparation time'
        },
        {
          title: 'Hourly Rate Optimization',
          description: 'Dynamic rate adjustments based on matter complexity and client agreements',
          outcome: '25% increase in realized rates'
        }
      ],
      integrations: ['Sage', 'Xero', 'QuickBooks', 'Time tracking software']
    }
    // Add more services as needed
  };

  const serviceData = serviceDataMap[serviceSlug];

  if (!serviceData) {
    return { notFound: true };
  }

  return {
    props: {
      regionConfig,
      regionSlug,
      serviceSlug,
      serviceData
    },
    revalidate: 3600
  };
};

export default ServicePage;