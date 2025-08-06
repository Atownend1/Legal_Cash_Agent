// Netherlands Regional Configuration for Yieldly
export const netherlandsConfig = {
  // Basic Region Information
  region: 'netherlands',
  name: 'Nederland',
  country: 'Kingdom of the Netherlands',
  currency: 'EUR',
  timezone: 'Europe/Amsterdam',
  language: 'nl-NL',
  
  // Geographic Targeting
  geo: {
    coordinates: {
      lat: 52.3676,
      lng: 4.9041
    },
    cities: ['Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen'],
    provinces: ['Noord-Holland', 'Zuid-Holland', 'Utrecht', 'Noord-Brabant', 'Gelderland'],
    regions: ['Randstad', 'Noord-Nederland', 'Oost-Nederland', 'Zuid-Nederland']
  },

  // Legal & Compliance
  legal: {
    jurisdiction: 'Netherlands',
    regulatoryBody: 'Nederlandse Orde van Advocaten (NOvA)',
    complianceFramework: ['AVG (GDPR)', 'Advocatenwet', 'Verordening op de advocatuur', 'Wwft'],
    practiceRules: 'Gedragsregels Nederlandse Orde van Advocaten',
    qualifications: ['Nederlandse rechtenstudie', 'Beroepsopleiding advocatuur', 'Advocaat'],
    barAssociation: 'Nederlandse Orde van Advocaten'
  },

  // Business Context
  market: {
    size: 'Medium',
    maturity: 'Very Established',
    competition: 'High',
    growthRate: '4.5%',
    averageFirmSize: '10-18 advocaten',
    specializations: ['Ondernemingsrecht', 'Arbeidsrecht', 'Familierecht', 'Strafrecht', 'Belastingrecht']
  },

  // Localized Content
  content: {
    hero: {
      headline: 'Transformeer Uw Advocatenkantoor',
      subheadline: 'AI-gedreven cashflow beheer voor Nederlandse advocaten. Verkort betalingstermijnen met volledige NOvA compliance.',
      cta: 'Vraag Nederland Demo Aan'
    },
    
    features: {
      primary: [
        {
          title: 'NOvA Compliance Gegarandeerd',
          description: 'Automatische naleving van Nederlandse Orde van Advocaten regels en derdengeldrekening beheer.',
          icon: 'shield-check'
        },
        {
          title: 'Nederlandse Recht Integratie',
          description: 'Gespecialiseerde workflows voor Nederlands vennootschapsrecht, arbeidsrecht en contractbeheer.',
          icon: 'briefcase'
        },
        {
          title: 'Lokale Support in Nederland',
          description: 'Nederlandstalige support met kantoren in Amsterdam, Rotterdam en Den Haag.',
          icon: 'map-pin'
        }
      ]
    },

    testimonials: [
      {
        quote: "Yieldly heeft ons Amsterdamse kantoor getransformeerd. We hebben onze cashflow cycli met 48% verkort bij volledige NOvA compliance.",
        author: "Mr. Pieter van der Berg",
        title: "Managing Partner",
        firm: "Van der Berg & Associates, Amsterdam",
        metrics: {
          lockupReduction: "48%",
          savings: "€58,000",
          implementation: "60 uur"
        }
      }
    ],

    caseStudies: [
      {
        title: "Digitale Transformatie Rotterdams Ondernemingsrecht Kantoor",
        firm: "De Jong, Bakker & Partners",
        challenge: "Complexe internationale mandaten met uitgestelde betalingscycli",
        solution: "Implementatie van Yieldly's Nederland-specifieke compliance en workflow features",
        results: {
          cashFlowImprovement: "61%",
          timeToPayment: "35 dagen reductie",
          clientSatisfaction: "94%",
          complianceScore: "100%"
        }
      }
    ]
  },

  // Pricing & Packages
  pricing: {
    currency: 'EUR',
    startingPrice: 369,
    packages: [
      {
        name: 'Nederlandse Advocaat',
        price: 369,
        features: ['NOvA Compliance', 'Nederlandse Recht Templates', 'Lokale Support'],
        ideal: '1-5 advocaten'
      },
      {
        name: 'Nederlands Kantoor',
        price: 779,
        features: ['Multi-kantoor Support', 'Ondernemingsrecht Workflows', 'Priority Support'],
        ideal: '6-20 advocaten'
      },
      {
        name: 'Nederland Enterprise',
        price: 1699,
        features: ['Custom NOvA Integratie', 'Dedicated Account Manager', 'White-label Opties'],
        ideal: '21+ advocaten'
      }
    ]
  },

  // Local Marketing
  marketing: {
    keywords: {
      primary: ['Nederlandse advocatensoftware', 'NOvA conforme cashflow', 'Amsterdam kantoor technologie'],
      secondary: ['Rotterdam kantoor beheer', 'Den Haag advocaat software', 'Utrecht legal tech'],
      local: ['Amsterdam Legal Tech', 'Rotterdam advocatensoftware', 'Den Haag kantoor software']
    },
    
    competitors: {
      local: ['Legal Suite Nederland', 'Kantoor Oplossingen BV', 'Nederlandse Legal Tech'],
      international: ['Clio', 'PracticePanther', 'LexisNexis']
    },

    partnerships: {
      potential: ['Nederlandse Orde van Advocaten', 'VNO-NCW', 'Amsterdam Business Network'],
      current: []
    }
  },

  // Technical Integration
  integrations: {
    required: ['NOvA API', 'Nederlandse Rechtspraak Integratie', 'Paleis van Justitie Systemen'],
    recommended: ['Exact Online', 'AFAS', 'Unit4 Multivers'],
    banking: ['ABN AMRO', 'ING Bank', 'Rabobank', 'SNS Bank']
  },

  // Contact Information
  contact: {
    phone: '+31 20 XXX XXXX',
    email: 'nederland@yieldlycf.com',
    address: {
      street: 'Herengracht XXX',
      city: 'Amsterdam',
      postcode: '1016 XX',
      country: 'Nederland'
    },
    supportHours: 'Ma-Vr 8:00-18:00 CET',
    languages: ['Nederlands', 'English']
  },

  // SEO & Technical
  seo: {
    metaTitle: 'Nederlandse Advocatenkantoor Cashflow Beheer | Yieldly Nederland',
    metaDescription: 'AI-gedreven cashflow software voor Nederlandse advocaten. NOvA compliant, lokale support. Verkort betalingstermijnen met 48%.',
    canonicalDomain: 'yieldlycf.com/nederland',
    hreflangs: [
      { lang: 'nl-NL', url: 'https://yieldlycf.com/nederland' },
      { lang: 'nl', url: 'https://yieldlycf.com/nederland' },
      { lang: 'en', url: 'https://yieldlycf.com/netherlands' }
    ]
  }
};

export default netherlandsConfig;