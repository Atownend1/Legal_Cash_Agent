// Ireland Regional Configuration for Yieldly
export const irelandConfig = {
  // Basic Region Information
  region: 'ireland',
  name: 'Ireland',
  country: 'Republic of Ireland',
  currency: 'EUR',
  timezone: 'Europe/Dublin',
  language: 'en-IE',
  
  // Geographic Targeting
  geo: {
    coordinates: {
      lat: 53.3498,
      lng: -6.2603
    },
    cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kilkenny'],
    counties: ['Dublin', 'Cork', 'Galway', 'Mayo', 'Donegal', 'Kerry', 'Tipperary'],
    regions: ['Leinster', 'Munster', 'Connacht', 'Ulster (partial)']
  },

  // Legal & Compliance
  legal: {
    jurisdiction: 'Ireland',
    regulatoryBody: 'Law Society of Ireland',
    complianceFramework: ['LSI', 'GDPR', 'Data Protection Act 2018', 'Central Bank Regulations'],
    practiceRules: 'Solicitors (Professional Practice, Conduct and Discipline) Rules',
    qualifications: ['Irish LLB', 'Barrister-at-Law', 'King\'s Inns Degree'],
    barAssociation: 'Law Library, Four Courts'
  },

  // Business Context
  market: {
    size: 'Medium',
    maturity: 'Growing',
    competition: 'Moderate',
    growthRate: '5.8%',
    averageFirmSize: '8-12 solicitors',
    specializations: ['Property Law', 'Corporate Law', 'Employment Law', 'Family Law', 'Personal Injury']
  },

  // Localized Content
  content: {
    hero: {
      headline: 'Revolutionise Your Irish Legal Practice',
      subheadline: 'AI-powered cash flow management designed for Irish solicitors. Reduce client payment delays while maintaining full LSI compliance.',
      cta: 'Get Ireland-Specific Demo'
    },
    
    features: {
      primary: [
        {
          title: 'LSI Compliance Guaranteed',
          description: 'Automated compliance with Law Society of Ireland practice management standards and client account rules.',
          icon: 'shield-check'
        },
        {
          title: 'Irish Property Law Workflows',
          description: 'Specialised automation for Irish conveyancing, stamp duty, and property registration processes.',
          icon: 'home'
        },
        {
          title: 'Dublin & Regional Support',
          description: 'Local account management with offices in Dublin and regional coverage across Ireland.',
          icon: 'map-pin'
        }
      ]
    },

    testimonials: [
      {
        quote: "Yieldly has been transformational for our Dublin practice. We've cut our debtor days from 85 to 38 while staying fully LSI compliant.",
        author: "Siobhan O'Connor",
        title: "Managing Partner",
        firm: "O'Connor & Associates, Dublin",
        metrics: {
          lockupReduction: "55%",
          savings: "€42,000",
          implementation: "48 hours"
        }
      }
    ],

    caseStudies: [
      {
        title: "Dublin Commercial Law Firm Digital Transformation",
        firm: "Murphy, Kelly & Partners",
        challenge: "Managing international corporate transactions with complex payment structures",
        solution: "Implemented Yieldly's Ireland-specific workflow and EU compliance features",
        results: {
          cashFlowImprovement: "73%",
          timeToPayment: "47 days reduction",
          clientSatisfaction: "96%",
          complianceScore: "100%"
        }
      }
    ]
  },

  // Pricing & Packages
  pricing: {
    currency: 'EUR',
    startingPrice: 349,
    packages: [
      {
        name: 'Irish Solicitor',
        price: 349,
        features: ['LSI Compliance', 'Property Law Templates', 'Dublin Support'],
        ideal: '1-5 solicitors'
      },
      {
        name: 'Dublin Practice',
        price: 699,
        features: ['Multi-office Support', 'Corporate Law Workflows', 'Priority Support'],
        ideal: '6-20 solicitors'
      },
      {
        name: 'Ireland Enterprise',
        price: 1499,
        features: ['Custom LSI Integration', 'Dedicated Account Manager', 'EU Compliance Suite'],
        ideal: '21+ solicitors'
      }
    ]
  },

  // Local Marketing
  marketing: {
    keywords: {
      primary: ['Irish legal software', 'LSI compliant cash flow', 'Dublin law firm technology'],
      secondary: ['Cork legal practice management', 'Irish solicitor software', 'Galway law firm automation'],
      local: ['Dublin legal tech', 'Cork law firm software', 'Galway solicitor solutions']
    },
    
    competitors: {
      local: ['Irish Legal Solutions', 'Dublin Practice Systems', 'Celtic LegalTech'],
      international: ['Clio', 'PracticePanther', 'LawMaster']
    },

    partnerships: {
      potential: ['Law Society of Ireland', 'Dublin Chamber of Commerce', 'Enterprise Ireland'],
      current: []
    }
  },

  // Technical Integration
  integrations: {
    required: ['Law Society of Ireland API', 'Courts Service Integration'],
    recommended: ['Sage Ireland', 'Xero Ireland', 'QuickBooks Ireland'],
    banking: ['AIB', 'Bank of Ireland', 'Ulster Bank Ireland']
  },

  // Contact Information
  contact: {
    phone: '+353 1 XXX XXXX',
    email: 'ireland@yieldlycf.com',
    address: {
      street: 'XX Grafton Street',
      city: 'Dublin',
      postcode: 'D02 XXXX',
      country: 'Ireland'
    },
    supportHours: 'Mon-Fri 8:00-18:00 IST',
    languages: ['English', 'Irish Gaelic (limited)']
  },

  // SEO & Technical
  seo: {
    metaTitle: 'Irish Legal Cash Flow Management | Yieldly Ireland',
    metaDescription: 'AI-powered cash flow software for Irish solicitors. LSI compliant, Dublin & regional support. Reduce payment delays by 55%.',
    canonicalDomain: 'yieldlycf.com/ireland',
    hreflangs: [
      { lang: 'en-IE', url: 'https://yieldlycf.com/ireland' },
      { lang: 'en', url: 'https://yieldlycf.com/ireland' }
    ]
  }
};

export default irelandConfig;