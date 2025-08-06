// Scotland Regional Configuration for Yieldly
export const scotlandConfig = {
  // Basic Region Information
  region: 'scotland',
  name: 'Scotland',
  country: 'United Kingdom',
  currency: 'GBP',
  timezone: 'Europe/London',
  language: 'en-GB',
  
  // Geographic Targeting
  geo: {
    coordinates: {
      lat: 56.4907,
      lng: -4.2026
    },
    cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Stirling'],
    postcodes: ['EH', 'G', 'AB', 'DD', 'FK'],
    regions: ['Lothian', 'Strathclyde', 'Grampian', 'Tayside', 'Central']
  },

  // Legal & Compliance
  legal: {
    jurisdiction: 'Scotland',
    regulatoryBody: 'Law Society of Scotland',
    complianceFramework: ['LSS', 'SRA (recognition)', 'GDPR', 'Data Protection Act 2018'],
    practiceRules: 'Scottish Solicitors Practice Rules',
    qualifications: ['Scottish LLB', 'Diploma in Professional Legal Practice', 'LLM Scots Law'],
    barAssociation: 'Faculty of Advocates'
  },

  // Business Context
  market: {
    size: 'Medium',
    maturity: 'Established',
    competition: 'Moderate',
    growthRate: '4.2%',
    averageFirmSize: '12-15 solicitors',
    specializations: ['Property Law', 'Corporate Law', 'Family Law', 'Criminal Law', 'Commercial Litigation']
  },

  // Localized Content
  content: {
    hero: {
      headline: 'Transform Your Scottish Legal Practice',
      subheadline: 'Purpose-built cash flow management for Scottish solicitors. Reduce lock-up periods while maintaining LSS compliance.',
      cta: 'Get Scotland-Specific Demo'
    },
    
    features: {
      primary: [
        {
          title: 'LSS Compliance Built-In',
          description: 'Automated compliance with Law Society of Scotland practice rules and client account regulations.',
          icon: 'shield-check'
        },
        {
          title: 'Scottish Property Law Integration',
          description: 'Specialized workflows for Scottish conveyancing and property transactions.',
          icon: 'home'
        },
        {
          title: 'Edinburgh & Glasgow Support',
          description: 'Local account management with offices in Edinburgh and Glasgow.',
          icon: 'map-pin'
        }
      ]
    },

    testimonials: [
      {
        quote: "Yieldly transformed our Edinburgh practice. We reduced client billing cycles from 90 to 45 days while staying fully LSS compliant.",
        author: "Sarah MacLeod",
        title: "Senior Partner",
        firm: "MacLeod & Associates, Edinburgh",
        metrics: {
          lockupReduction: "50%",
          savings: "£34,000",
          implementation: "72 hours"
        }
      }
    ],

    caseStudies: [
      {
        title: "Edinburgh Corporate Law Firm Transformation",
        firm: "Stewart, Campbell & Associates",
        challenge: "Managing complex corporate transactions with extended payment cycles",
        solution: "Implemented Yieldly's Scottish-specific workflow automation",
        results: {
          cashFlowImprovement: "67%",
          timeToPayment: "42 days reduction",
          clientSatisfaction: "94%",
          complianceScore: "100%"
        }
      }
    ]
  },

  // Pricing & Packages
  pricing: {
    currency: 'GBP',
    startingPrice: 299,
    packages: [
      {
        name: 'Scottish Solicitor',
        price: 299,
        features: ['LSS Compliance', 'Property Law Templates', 'Edinburgh Support'],
        ideal: '1-5 solicitors'
      },
      {
        name: 'Edinburgh Practice',
        price: 599,
        features: ['Multi-office Support', 'Corporate Law Workflows', 'Priority Support'],
        ideal: '6-20 solicitors'
      },
      {
        name: 'Scotland Enterprise',
        price: 1299,
        features: ['Custom LSS Integration', 'Dedicated Account Manager', 'White-label Options'],
        ideal: '21+ solicitors'
      }
    ]
  },

  // Local Marketing
  marketing: {
    keywords: {
      primary: ['Scottish legal software', 'LSS compliant cash flow', 'Edinburgh law firm technology'],
      secondary: ['Glasgow legal practice management', 'Scottish solicitor software', 'Scots law automation'],
      local: ['Edinburgh legal tech', 'Glasgow law firm software', 'Aberdeen solicitor solutions']
    },
    
    competitors: {
      local: ['Scottish Legal Software Ltd', 'Edinburgh Practice Solutions', 'Caledonian LegalTech'],
      international: ['Clio', 'PracticePanther', 'MyCase']
    },

    partnerships: {
      potential: ['Law Society of Scotland', 'Edinburgh Chamber of Commerce', 'Glasgow Business Gateway'],
      current: []
    }
  },

  // Technical Integration
  integrations: {
    required: ['Law Society of Scotland API', 'Scottish Courts Integration'],
    recommended: ['Sage Accounting', 'Xero UK', 'FreeAgent'],
    banking: ['Royal Bank of Scotland', 'Bank of Scotland', 'Clydesdale Bank']
  },

  // Contact Information
  contact: {
    phone: '+44 131 XXX XXXX',
    email: 'scotland@yieldlycf.com',
    address: {
      street: 'XX George Street',
      city: 'Edinburgh',
      postcode: 'EH2 XXX',
      country: 'Scotland'
    },
    supportHours: 'Mon-Fri 8:00-18:00 GMT',
    languages: ['English', 'Scottish Gaelic (limited)']
  },

  // SEO & Technical
  seo: {
    metaTitle: 'Scottish Legal Cash Flow Management | Yieldly Scotland',
    metaDescription: 'Purpose-built cash flow software for Scottish solicitors. LSS compliant, Edinburgh & Glasgow support. Reduce payment cycles by 50%.',
    canonicalDomain: 'yieldlycf.com/scotland',
    hreflangs: [
      { lang: 'en-GB', url: 'https://yieldlycf.com/scotland' },
      { lang: 'en', url: 'https://yieldlycf.com/scotland' }
    ]
  }
};

export default scotlandConfig;