// Midlands Regional Configuration (Primary Launch Region)
module.exports = {
  region: {
    name: 'Midlands',
    code: 'midlands',
    country: 'UK',
    currency: 'GBP',
    language: 'en-GB',
    timezone: 'Europe/London',
    phoneCode: '+44',
    isActive: true,
    isPrimary: true,
    
    // Geographic coverage
    coverage: {
      cities: [
        'Birmingham',
        'Coventry',
        'Leicester',
        'Nottingham',
        'Derby',
        'Wolverhampton',
        'Stoke-on-Trent',
        'Walsall',
        'Dudley',
        'Sandwell',
        'Solihull',
        'Warwick',
        'Rugby',
        'Northampton',
        'Milton Keynes',
        'Bedford',
        'Luton',
        'Peterborough',
        'Cambridge',
        'Oxford'
      ],
      counties: [
        'West Midlands',
        'Warwickshire',
        'Leicestershire',
        'Nottinghamshire',
        'Derbyshire',
        'Staffordshire',
        'Worcestershire',
        'Herefordshire',
        'Shropshire',
        'Northamptonshire',
        'Bedfordshire',
        'Buckinghamshire',
        'Oxfordshire',
        'Cambridgeshire'
      ]
    },
    
    // Regional SEO
    seo: {
      title: 'Yieldly - AI Cash Flow Solutions for Midlands Legal Firms',
      description: 'Transform your Midlands legal practice with AI-powered cash flow analysis. Serving Birmingham, Coventry, Leicester, Nottingham and across the Midlands.',
      keywords: 'Midlands legal cash flow, Birmingham legal finance, AI legal practice management Midlands, legal accounting Midlands, cash flow automation Midlands',
      localBusiness: {
        name: 'Yieldly Midlands',
        address: {
          street: '123 Innovation Street',
          city: 'Birmingham',
          postcode: 'B1 1AA',
          country: 'United Kingdom'
        },
        phone: '+44 800 123 4567',
        email: 'hello@yieldly.ai',
        openingHours: 'Mon-Fri 9:00-17:00',
        serviceArea: 'Midlands, UK'
      }
    },
    
    // Regional content
    content: {
      hero: {
        title: 'AI-Powered Cash Flow Solutions for Midlands Legal Firms',
        subtitle: 'Transform your legal practice with intelligent financial automation. Serving Birmingham, Coventry, Leicester, Nottingham and across the Midlands.',
        cta: 'Get Your Free Midlands Demo'
      },
      
      benefits: [
        {
          title: 'Midlands-Focused Expertise',
          description: 'Deep understanding of Midlands legal market and regional financial challenges',
          icon: '🏛️'
        },
        {
          title: 'Local Support Network',
          description: 'Dedicated Midlands team with regional legal expertise',
          icon: '🤝'
        },
        {
          title: 'Regional Compliance',
          description: 'UK legal compliance with Midlands-specific considerations',
          icon: '✅'
        }
      ],
      
      testimonials: [
        {
          name: 'Sarah Mitchell',
          role: 'Managing Partner',
          company: 'Mitchell & Associates',
          location: 'Birmingham',
          quote: 'Yieldly transformed our cash flow management. The AI insights are invaluable for our Midlands practice.',
          rating: 5
        },
        {
          name: 'David Thompson',
          role: 'Finance Director',
          company: 'Thompson Legal Group',
          location: 'Coventry',
          quote: 'Outstanding regional support and understanding of Midlands legal market challenges.',
          rating: 5
        }
      ],
      
      services: [
        {
          name: 'Cash Flow Analysis',
          description: 'AI-powered analysis of your legal practice finances',
          price: 'From £99/month',
          features: ['Real-time insights', 'Predictive analytics', 'Regional benchmarking']
        },
        {
          name: 'Automated Billing',
          description: 'Streamline your billing process with intelligent automation',
          price: 'From £149/month',
          features: ['Automated invoicing', 'Payment tracking', 'Late payment alerts']
        },
        {
          name: 'Financial Reporting',
          description: 'Comprehensive financial reports for your practice',
          price: 'From £79/month',
          features: ['Monthly reports', 'Custom dashboards', 'Regulatory compliance']
        }
      ]
    },
    
    // Regional contact information
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
      },
      regional: [
        {
          city: 'Birmingham',
          phone: '+44 121 123 4567',
          email: 'birmingham@yieldly.ai'
        },
        {
          city: 'Coventry',
          phone: '+44 24 123 4567',
          email: 'coventry@yieldly.ai'
        },
        {
          city: 'Leicester',
          phone: '+44 116 123 4567',
          email: 'leicester@yieldly.ai'
        }
      ]
    },
    
    // Regional marketing
    marketing: {
      googleAds: {
        campaignId: 'MIDLANDS_LEGAL_CASH_FLOW',
        keywords: [
          'Midlands legal cash flow',
          'Birmingham legal finance',
          'legal practice management Midlands',
          'legal accounting Midlands',
          'cash flow automation Midlands'
        ]
      },
      facebookAds: {
        campaignId: 'MIDLANDS_LEGAL_TARGETING',
        interests: [
          'Legal professionals',
          'Law firms',
          'Legal practice management',
          'Midlands business'
        ]
      },
      linkedinAds: {
        campaignId: 'MIDLANDS_LEGAL_B2B',
        jobTitles: [
          'Managing Partner',
          'Finance Director',
          'Practice Manager',
          'Legal Administrator'
        ],
        industries: ['Legal Services', 'Law Practice']
      }
    }
  }
}; 