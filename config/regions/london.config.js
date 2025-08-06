// London Regional Configuration (UK Expansion)
module.exports = {
  region: {
    name: 'London',
    code: 'london',
    country: 'UK',
    currency: 'GBP',
    language: 'en-GB',
    timezone: 'Europe/London',
    phoneCode: '+44',
    isActive: true,
    isPrimary: false,
    
    // Geographic coverage
    coverage: {
      cities: [
        'London',
        'Westminster',
        'Camden',
        'Islington',
        'Hackney',
        'Tower Hamlets',
        'Southwark',
        'Lambeth',
        'Wandsworth',
        'Hammersmith and Fulham',
        'Kensington and Chelsea',
        'Westminster',
        'City of London',
        'Greenwich',
        'Lewisham',
        'Bromley',
        'Croydon',
        'Sutton',
        'Merton',
        'Kingston upon Thames',
        'Richmond upon Thames',
        'Hounslow',
        'Ealing',
        'Brent',
        'Harrow',
        'Hillingdon',
        'Barnet',
        'Enfield',
        'Waltham Forest',
        'Redbridge',
        'Havering',
        'Barking and Dagenham',
        'Newham',
        'Bexley'
      ],
      boroughs: [
        'Central London',
        'North London',
        'South London',
        'East London',
        'West London'
      ]
    },
    
    // Regional SEO
    seo: {
      title: 'Yieldly - AI Cash Flow Solutions for London Legal Firms',
      description: 'Transform your London legal practice with AI-powered cash flow analysis. Serving Central London, City of London, and across Greater London.',
      keywords: 'London legal cash flow, City of London legal finance, AI legal practice management London, legal accounting London, cash flow automation London',
      localBusiness: {
        name: 'Yieldly London',
        address: {
          street: '456 Innovation Square',
          city: 'London',
          postcode: 'EC1A 1BB',
          country: 'United Kingdom'
        },
        phone: '+44 20 1234 5678',
        email: 'london@yieldly.ai',
        openingHours: 'Mon-Fri 8:00-18:00',
        serviceArea: 'Greater London, UK'
      }
    },
    
    // Regional content
    content: {
      hero: {
        title: 'AI-Powered Cash Flow Solutions for London Legal Firms',
        subtitle: 'Transform your London legal practice with intelligent financial automation. Serving Central London, City of London, and across Greater London.',
        cta: 'Get Your Free London Demo'
      },
      
      benefits: [
        {
          title: 'London Legal Expertise',
          description: 'Deep understanding of London legal market and City of London financial regulations',
          icon: '🏛️'
        },
        {
          title: 'Central London Support',
          description: 'Dedicated London team with City of London legal expertise',
          icon: '🤝'
        },
        {
          title: 'London Compliance',
          description: 'UK legal compliance with London-specific regulatory requirements',
          icon: '✅'
        }
      ],
      
      testimonials: [
        {
          name: 'James Wilson',
          role: 'Managing Partner',
          company: 'Wilson & Partners LLP',
          location: 'City of London',
          quote: 'Yieldly\'s AI insights are crucial for our London practice. The City-specific features are invaluable.',
          rating: 5
        },
        {
          name: 'Emma Davies',
          role: 'Finance Director',
          company: 'Davies Legal Group',
          location: 'Central London',
          quote: 'Outstanding London support and understanding of City of London legal market.',
          rating: 5
        }
      ],
      
      services: [
        {
          name: 'Cash Flow Analysis',
          description: 'AI-powered analysis of your London legal practice finances',
          price: 'From £149/month',
          features: ['Real-time insights', 'Predictive analytics', 'London market benchmarking']
        },
        {
          name: 'Automated Billing',
          description: 'Streamline your London billing process with intelligent automation',
          price: 'From £199/month',
          features: ['Automated invoicing', 'Payment tracking', 'Late payment alerts']
        },
        {
          name: 'Financial Reporting',
          description: 'Comprehensive financial reports for your London practice',
          price: 'From £129/month',
          features: ['Monthly reports', 'Custom dashboards', 'London regulatory compliance']
        }
      ]
    },
    
    // Regional contact information
    contact: {
      primary: {
        phone: '+44 20 1234 5678',
        email: 'london@yieldly.ai',
        address: {
          street: '456 Innovation Square',
          city: 'London',
          postcode: 'EC1A 1BB',
          country: 'United Kingdom'
        }
      },
      regional: [
        {
          city: 'City of London',
          phone: '+44 20 1234 5679',
          email: 'city@yieldly.ai'
        },
        {
          city: 'Central London',
          phone: '+44 20 1234 5680',
          email: 'central@yieldly.ai'
        },
        {
          city: 'Westminster',
          phone: '+44 20 1234 5681',
          email: 'westminster@yieldly.ai'
        }
      ]
    },
    
    // Regional marketing
    marketing: {
      googleAds: {
        campaignId: 'LONDON_LEGAL_CASH_FLOW',
        keywords: [
          'London legal cash flow',
          'City of London legal finance',
          'legal practice management London',
          'legal accounting London',
          'cash flow automation London'
        ]
      },
      facebookAds: {
        campaignId: 'LONDON_LEGAL_TARGETING',
        interests: [
          'Legal professionals',
          'Law firms',
          'Legal practice management',
          'London business',
          'City of London'
        ]
      },
      linkedinAds: {
        campaignId: 'LONDON_LEGAL_B2B',
        jobTitles: [
          'Managing Partner',
          'Finance Director',
          'Practice Manager',
          'Legal Administrator',
          'Partner'
        ],
        industries: ['Legal Services', 'Law Practice', 'Financial Services']
      }
    }
  }
}; 