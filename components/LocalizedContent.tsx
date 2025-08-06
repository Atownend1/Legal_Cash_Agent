import React, { useState, useEffect } from 'react';
import masterConfig from '../config/master.config.js';

interface LocalizedContentProps {
  regionCode: string;
  contentType: 'hero' | 'benefits' | 'testimonials' | 'services' | 'contact';
  fallbackContent?: any;
  className?: string;
}

interface RegionContent {
  hero?: {
    title: string;
    subtitle: string;
    cta: string;
  };
  benefits?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials?: Array<{
    name: string;
    role: string;
    company: string;
    location: string;
    quote: string;
    rating: number;
  }>;
  services?: Array<{
    name: string;
    description: string;
    price: string;
    features: string[];
  }>;
  contact?: {
    primary: {
      phone: string;
      email: string;
      address: {
        street: string;
        city: string;
        postcode: string;
        country: string;
      };
    };
    regional?: Array<{
      city: string;
      phone: string;
      email: string;
    }>;
  };
}

const LocalizedContent: React.FC<LocalizedContentProps> = ({
  regionCode,
  contentType,
  fallbackContent,
  className = ''
}) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRegionContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load region-specific configuration
        const regionConfig = await import(`../config/regions/${regionCode}.config.js`);
        const regionContent = regionConfig.default.region.content;

        if (regionContent && regionContent[contentType]) {
          setContent(regionContent[contentType]);
        } else {
          // Fallback to global content or provided fallback
          setContent(fallbackContent || getDefaultContent(contentType));
        }
      } catch (err) {
        console.error(`Error loading content for region ${regionCode}:`, err);
        setError(`Failed to load ${regionCode} content`);
        setContent(fallbackContent || getDefaultContent(contentType));
      } finally {
        setLoading(false);
      }
    };

    loadRegionContent();
  }, [regionCode, contentType, fallbackContent]);

  const getDefaultContent = (type: string) => {
    const defaults = {
      hero: {
        title: 'AI-Powered Cash Flow Solutions for Legal Firms',
        subtitle: 'Transform your legal practice with intelligent financial automation.',
        cta: 'Get Your Free Demo'
      },
      benefits: [
        {
          title: 'AI-Powered Insights',
          description: 'Get intelligent analysis of your cash flow patterns',
          icon: '🤖'
        },
        {
          title: 'Automated Processes',
          description: 'Streamline your financial workflows',
          icon: '⚡'
        },
        {
          title: 'Compliance Ready',
          description: 'Built for legal industry regulations',
          icon: '✅'
        }
      ],
      testimonials: [
        {
          name: 'John Smith',
          role: 'Managing Partner',
          company: 'Smith & Associates',
          location: 'UK',
          quote: 'Yieldly transformed our cash flow management.',
          rating: 5
        }
      ],
      services: [
        {
          name: 'Cash Flow Analysis',
          description: 'AI-powered analysis of your legal practice finances',
          price: 'From £99/month',
          features: ['Real-time insights', 'Predictive analytics', 'Benchmarking']
        }
      ],
      contact: {
        primary: {
          phone: '+44 800 123 4567',
          email: 'hello@yieldly.ai',
          address: {
            street: '123 Innovation Street',
            city: 'Birmingham',
            postcode: 'B1 1AA',
            country: 'United Kingdom'
          }
        }
      }
    };

    return defaults[type as keyof typeof defaults];
  };

  const renderContent = () => {
    if (loading) {
      return <div className="content-loading">Loading {regionCode} content...</div>;
    }

    if (error) {
      return <div className="content-error">{error}</div>;
    }

    switch (contentType) {
      case 'hero':
        return (
          <div className={`localized-hero ${className}`}>
            <h1 className="hero-title">{content.title}</h1>
            <p className="hero-subtitle">{content.subtitle}</p>
            <button className="hero-cta">{content.cta}</button>
          </div>
        );

      case 'benefits':
        return (
          <div className={`localized-benefits ${className}`}>
            {content.map((benefit: any, index: number) => (
              <div key={index} className="benefit-item">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        );

      case 'testimonials':
        return (
          <div className={`localized-testimonials ${className}`}>
            {content.map((testimonial: any, index: number) => (
              <div key={index} className="testimonial-item">
                <div className="testimonial-quote">"{testimonial.quote}"</div>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                  <span>{testimonial.company}</span>
                  <span>{testimonial.location}</span>
                </div>
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        );

      case 'services':
        return (
          <div className={`localized-services ${className}`}>
            {content.map((service: any, index: number) => (
              <div key={index} className="service-item">
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.price}</div>
                <ul className="service-features">
                  {service.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className={`localized-contact ${className}`}>
            <div className="contact-primary">
              <h3>Contact {masterConfig.global.brand.name}</h3>
              <p><strong>Phone:</strong> {content.primary.phone}</p>
              <p><strong>Email:</strong> {content.primary.email}</p>
              <p><strong>Address:</strong></p>
              <p>{content.primary.address.street}</p>
              <p>{content.primary.address.city}, {content.primary.address.postcode}</p>
              <p>{content.primary.address.country}</p>
            </div>
            {content.regional && (
              <div className="contact-regional">
                <h4>Regional Offices</h4>
                {content.regional.map((office: any, index: number) => (
                  <div key={index} className="regional-office">
                    <strong>{office.city}</strong>
                    <p>Phone: {office.phone}</p>
                    <p>Email: {office.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return <div>Content type not supported</div>;
    }
  };

  return (
    <>
      {renderContent()}
      <style jsx>{`
        .content-loading,
        .content-error {
          text-align: center;
          padding: 2rem;
          color: #94a3b8;
        }

        .content-error {
          color: #ef4444;
        }

        .localized-hero {
          text-align: center;
          padding: 2rem 0;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #94a3b8;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-cta {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          font-size: 1.1rem;
        }

        .localized-benefits {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 2rem 0;
        }

        .benefit-item {
          background: rgba(96, 165, 250, 0.1);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
        }

        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .benefit-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .benefit-description {
          color: #94a3b8;
          line-height: 1.6;
        }

        .localized-testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          padding: 2rem 0;
        }

        .testimonial-item {
          background: rgba(96, 165, 250, 0.1);
          border-radius: 12px;
          padding: 2rem;
        }

        .testimonial-quote {
          font-size: 1.1rem;
          color: #ffffff;
          font-style: italic;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .testimonial-author strong {
          color: #60a5fa;
        }

        .testimonial-author span {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .testimonial-rating {
          color: #fbbf24;
          font-size: 1.2rem;
        }

        .localized-services {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 2rem 0;
        }

        .service-item {
          background: rgba(96, 165, 250, 0.1);
          border-radius: 12px;
          padding: 2rem;
        }

        .service-name {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .service-description {
          color: #94a3b8;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .service-price {
          font-size: 1.25rem;
          font-weight: 600;
          color: #60a5fa;
          margin-bottom: 1rem;
        }

        .service-features {
          list-style: none;
          padding: 0;
        }

        .service-features li {
          color: #94a3b8;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(96, 165, 250, 0.2);
        }

        .service-features li:before {
          content: '✓';
          color: #10b981;
          font-weight: bold;
          margin-right: 0.5rem;
        }

        .localized-contact {
          padding: 2rem 0;
        }

        .contact-primary {
          background: rgba(96, 165, 250, 0.1);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .contact-primary h3 {
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .contact-primary p {
          color: #94a3b8;
          margin-bottom: 0.5rem;
        }

        .contact-regional h4 {
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .regional-office {
          background: rgba(96, 165, 250, 0.05);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .regional-office strong {
          color: #60a5fa;
        }

        .regional-office p {
          color: #94a3b8;
          margin: 0.25rem 0;
        }
      `}</style>
    </>
  );
};

export default LocalizedContent; 