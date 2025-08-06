// Germany Regional Configuration for Yieldly
export const germanyConfig = {
  // Basic Region Information
  region: 'germany',
  name: 'Deutschland',
  country: 'Germany',
  currency: 'EUR',
  timezone: 'Europe/Berlin',
  language: 'de-DE',
  
  // Geographic Targeting
  geo: {
    coordinates: {
      lat: 52.5200,
      lng: 13.4050
    },
    cities: ['Berlin', 'München', 'Hamburg', 'Köln', 'Frankfurt am Main', 'Stuttgart', 'Düsseldorf'],
    states: ['Bayern', 'Baden-Württemberg', 'Nordrhein-Westfalen', 'Hessen', 'Niedersachsen'],
    regions: ['Nord', 'Süd', 'Ost', 'West', 'Mitte']
  },

  // Legal & Compliance
  legal: {
    jurisdiction: 'Germany',
    regulatoryBody: 'Bundesrechtsanwaltskammer (BRAK)',
    complianceFramework: ['BRAO', 'DSGVO', 'GwG', 'StPO', 'ZPO'],
    practiceRules: 'Berufsordnung für Rechtsanwälte (BORA)',
    qualifications: ['Erstes Juristisches Staatsexamen', 'Zweites Juristisches Staatsexamen', 'Rechtsanwalt'],
    barAssociation: 'Rechtsanwaltskammer'
  },

  // Business Context
  market: {
    size: 'Large',
    maturity: 'Very Established',
    competition: 'High',
    growthRate: '3.1%',
    averageFirmSize: '15-25 Rechtsanwälte',
    specializations: ['Wirtschaftsrecht', 'Arbeitsrecht', 'Familienrecht', 'Strafrecht', 'Steuerrecht']
  },

  // Localized Content
  content: {
    hero: {
      headline: 'Digitalisieren Sie Ihre Anwaltskanzlei',
      subheadline: 'KI-gestützte Liquiditätsverwaltung für deutsche Rechtsanwälte. Reduzieren Sie Zahlungszyklen bei vollständiger BRAO-Konformität.',
      cta: 'Deutschland-Demo Anfordern'
    },
    
    features: {
      primary: [
        {
          title: 'BRAO-Konformität Garantiert',
          description: 'Automatische Einhaltung der Berufsordnung für Rechtsanwälte und Mandantenkontoführung.',
          icon: 'shield-check'
        },
        {
          title: 'Deutsche Rechtsintegration',
          description: 'Spezialisierte Workflows für deutsches Gesellschaftsrecht, Arbeitsrecht und Vertragsmanagement.',
          icon: 'briefcase'
        },
        {
          title: 'Lokaler Support in Deutschland',
          description: 'Deutschsprachiger Support mit Büros in Berlin, München und Frankfurt.',
          icon: 'map-pin'
        }
      ]
    },

    testimonials: [
      {
        quote: "Yieldly hat unsere Berliner Kanzlei revolutioniert. Wir haben unsere Liquiditätszyklen um 45% verkürzt bei vollständiger BRAO-Konformität.",
        author: "Dr. Klaus Müller",
        title: "Geschäftsführender Partner",
        firm: "Müller & Associates, Berlin",
        metrics: {
          lockupReduction: "45%",
          savings: "€67,000",
          implementation: "96 Stunden"
        }
      }
    ],

    caseStudies: [
      {
        title: "Digitale Transformation einer Münchener Wirtschaftskanzlei",
        firm: "Schmidt, Weber & Partner",
        challenge: "Komplexe internationale Mandate mit verzögerten Zahlungszyklen",
        solution: "Implementierung von Yieldlys Deutschland-spezifischen Compliance- und Workflow-Features",
        results: {
          cashFlowImprovement: "58%",
          timeToPayment: "32 Tage Reduktion",
          clientSatisfaction: "93%",
          complianceScore: "100%"
        }
      }
    ]
  },

  // Pricing & Packages
  pricing: {
    currency: 'EUR',
    startingPrice: 399,
    packages: [
      {
        name: 'Deutscher Rechtsanwalt',
        price: 399,
        features: ['BRAO-Konformität', 'Deutsche Rechtsvorlagen', 'Lokaler Support'],
        ideal: '1-5 Rechtsanwälte'
      },
      {
        name: 'Deutsche Kanzlei',
        price: 899,
        features: ['Multi-Standort Support', 'Wirtschaftsrecht Workflows', 'Priority Support'],
        ideal: '6-25 Rechtsanwälte'
      },
      {
        name: 'Deutschland Enterprise',
        price: 1999,
        features: ['Custom BRAO Integration', 'Dedicated Account Manager', 'White-label Optionen'],
        ideal: '26+ Rechtsanwälte'
      }
    ]
  },

  // Local Marketing
  marketing: {
    keywords: {
      primary: ['Deutsche Anwaltssoftware', 'BRAO-konforme Liquidität', 'Berliner Kanzlei-Technologie'],
      secondary: ['München Kanzleiverwaltung', 'Hamburg Rechtsanwalt Software', 'Frankfurt Legal Tech'],
      local: ['Berlin Legal Tech', 'München Anwaltssoftware', 'Hamburg Kanzlei Software']
    },
    
    competitors: {
      local: ['LegalTech Deutschland', 'Kanzlei Solutions GmbH', 'Rechtsanwalt Software AG'],
      international: ['Clio', 'PracticePanther', 'LexisNexis']
    },

    partnerships: {
      potential: ['Bundesrechtsanwaltskammer', 'Deutscher Anwaltverein', 'IHK Deutschland'],
      current: []
    }
  },

  // Technical Integration
  integrations: {
    required: ['BRAK API', 'Deutsche Gerichtsintegration', 'BeA (Besonderes elektronisches Anwaltspostfach)'],
    recommended: ['DATEV', 'Lexware', 'SAP Business One'],
    banking: ['Deutsche Bank', 'Commerzbank', 'Sparkasse', 'Volksbank']
  },

  // Contact Information
  contact: {
    phone: '+49 30 XXXX XXXX',
    email: 'deutschland@yieldlycf.com',
    address: {
      street: 'Unter den Linden XX',
      city: 'Berlin',
      postcode: '10117',
      country: 'Deutschland'
    },
    supportHours: 'Mo-Fr 8:00-18:00 CET',
    languages: ['Deutsch', 'English']
  },

  // SEO & Technical
  seo: {
    metaTitle: 'Deutsche Anwaltskanzlei Liquiditätsverwaltung | Yieldly Deutschland',
    metaDescription: 'KI-gestützte Liquiditätssoftware für deutsche Rechtsanwälte. BRAO-konform, lokaler Support. Reduzieren Sie Zahlungszyklen um 45%.',
    canonicalDomain: 'yieldlycf.com/deutschland',
    hreflangs: [
      { lang: 'de-DE', url: 'https://yieldlycf.com/deutschland' },
      { lang: 'de', url: 'https://yieldlycf.com/deutschland' },
      { lang: 'en', url: 'https://yieldlycf.com/germany' }
    ]
  }
};

export default germanyConfig;