// France Regional Configuration for Yieldly
export const franceConfig = {
  // Basic Region Information
  region: 'france',
  name: 'France',
  country: 'République française',
  currency: 'EUR',
  timezone: 'Europe/Paris',
  language: 'fr-FR',
  
  // Geographic Targeting
  geo: {
    coordinates: {
      lat: 48.8566,
      lng: 2.3522
    },
    cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Bordeaux'],
    departments: ['Paris (75)', 'Rhône (69)', 'Bouches-du-Rhône (13)', 'Haute-Garonne (31)'],
    regions: ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur', 'Occitanie']
  },

  // Legal & Compliance
  legal: {
    jurisdiction: 'France',
    regulatoryBody: 'Conseil national des barreaux (CNB)',
    complianceFramework: ['Code de déontologie des avocats', 'RGPD', 'Loi informatique et libertés', 'LCB-FT'],
    practiceRules: 'Règlement intérieur national (RIN)',
    qualifications: ['CAPA (Certificat d\'Aptitude à la Profession d\'Avocat)', 'Master en droit', 'Diplôme d\'avocat'],
    barAssociation: 'Ordre des avocats'
  },

  // Business Context
  market: {
    size: 'Large',
    maturity: 'Very Established',
    competition: 'High',
    growthRate: '2.8%',
    averageFirmSize: '12-20 avocats',
    specializations: ['Droit des affaires', 'Droit du travail', 'Droit de la famille', 'Droit pénal', 'Droit fiscal']
  },

  // Localized Content
  content: {
    hero: {
      headline: 'Transformez Votre Cabinet d\'Avocats',
      subheadline: 'Gestion de trésorerie alimentée par l\'IA pour les avocats français. Réduisez les délais de paiement tout en respectant la déontologie.',
      cta: 'Demander une Démo France'
    },
    
    features: {
      primary: [
        {
          title: 'Conformité Déontologique Garantie',
          description: 'Respect automatique du code de déontologie des avocats et des règles de gestion de compte client CARPA.',
          icon: 'shield-check'
        },
        {
          title: 'Intégration Droit Français',
          description: 'Workflows spécialisés pour le droit des sociétés français, droit du travail et gestion contractuelle.',
          icon: 'briefcase'
        },
        {
          title: 'Support Local en France',
          description: 'Support francophone avec bureaux à Paris, Lyon et Marseille.',
          icon: 'map-pin'
        }
      ]
    },

    testimonials: [
      {
        quote: "Yieldly a révolutionné notre cabinet parisien. Nous avons réduit nos cycles de trésorerie de 52% tout en maintenant une conformité déontologique parfaite.",
        author: "Maître Catherine Dubois",
        title: "Associée Gérant",
        firm: "Dubois & Associates, Paris",
        metrics: {
          lockupReduction: "52%",
          savings: "€73,000",
          implementation: "72 heures"
        }
      }
    ],

    caseStudies: [
      {
        title: "Transformation Numérique d'un Cabinet d'Affaires Lyonnais",
        firm: "Martin, Leroy & Associés",
        challenge: "Gestion de mandats internationaux complexes avec cycles de paiement étendus",
        solution: "Implémentation des fonctionnalités de conformité et workflow spécifiques à la France",
        results: {
          cashFlowImprovement: "64%",
          timeToPayment: "38 jours de réduction",
          clientSatisfaction: "95%",
          complianceScore: "100%"
        }
      }
    ]
  },

  // Pricing & Packages
  pricing: {
    currency: 'EUR',
    startingPrice: 379,
    packages: [
      {
        name: 'Avocat Français',
        price: 379,
        features: ['Conformité Déontologique', 'Modèles Droit Français', 'Support Local'],
        ideal: '1-5 avocats'
      },
      {
        name: 'Cabinet Français',
        price: 799,
        features: ['Support Multi-bureaux', 'Workflows Droit des Affaires', 'Support Prioritaire'],
        ideal: '6-20 avocats'
      },
      {
        name: 'France Enterprise',
        price: 1799,
        features: ['Intégration CARPA Personnalisée', 'Account Manager Dédié', 'Options White-label'],
        ideal: '21+ avocats'
      }
    ]
  },

  // Local Marketing
  marketing: {
    keywords: {
      primary: ['logiciel avocat français', 'trésorerie conforme déontologie', 'technologie cabinet parisien'],
      secondary: ['gestion cabinet Lyon', 'logiciel avocat Marseille', 'automatisation droit français'],
      local: ['Legal Tech Paris', 'logiciel avocat Lyon', 'cabinet Marseille technologie']
    },
    
    competitors: {
      local: ['LegalSuite France', 'Cabinet Solutions SA', 'Avocat Tech France'],
      international: ['Clio', 'PracticePanther', 'LexisNexis']
    },

    partnerships: {
      potential: ['Conseil national des barreaux', 'Ordre des avocats de Paris', 'CARPA'],
      current: []
    }
  },

  // Technical Integration
  integrations: {
    required: ['CNB API', 'Intégration Tribunaux Français', 'RPVA (Réseau Privé Virtuel Avocat)'],
    recommended: ['Sage France', 'Cegid', 'EBP Compta'],
    banking: ['BNP Paribas', 'Crédit Agricole', 'Société Générale', 'CARPA']
  },

  // Contact Information
  contact: {
    phone: '+33 1 XX XX XX XX',
    email: 'france@yieldlycf.com',
    address: {
      street: 'XX Avenue des Champs-Élysées',
      city: 'Paris',
      postcode: '75008',
      country: 'France'
    },
    supportHours: 'Lun-Ven 8:00-18:00 CET',
    languages: ['Français', 'English']
  },

  // SEO & Technical
  seo: {
    metaTitle: 'Gestion Trésorerie Cabinet d\'Avocat | Yieldly France',
    metaDescription: 'Logiciel de trésorerie IA pour avocats français. Conforme déontologie, support local. Réduisez les délais de paiement de 52%.',
    canonicalDomain: 'yieldlycf.com/france',
    hreflangs: [
      { lang: 'fr-FR', url: 'https://yieldlycf.com/france' },
      { lang: 'fr', url: 'https://yieldlycf.com/france' },
      { lang: 'en', url: 'https://yieldlycf.com/france-en' }
    ]
  }
};

export default franceConfig;