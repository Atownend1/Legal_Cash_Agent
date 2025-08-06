// Master configuration for Yieldly Regional SEO Platform
module.exports = {
  // Global settings
  global: {
    brand: {
      name: 'Yieldly',
      tagline: 'AI-Powered Cash Flow Solutions for Legal Firms',
      domain: 'yieldlycf.com',
      primaryColor: '#60a5fa',
      secondaryColor: '#3b82f6'
    },
    
    // Default region (Midlands)
    defaultRegion: 'midlands',
    
    // Supported regions
    regions: {
      midlands: {
        name: 'Midlands',
        code: 'midlands',
        country: 'UK',
        currency: 'GBP',
        language: 'en-GB',
        timezone: 'Europe/London',
        phoneCode: '+44',
        isActive: true,
        isPrimary: true
      },
      london: {
        name: 'London',
        code: 'london', 
        country: 'UK',
        currency: 'GBP',
        language: 'en-GB',
        timezone: 'Europe/London',
        phoneCode: '+44',
        isActive: true,
        isPrimary: false
      },
      scotland: {
        name: 'Scotland',
        code: 'scotland',
        country: 'UK', 
        currency: 'GBP',
        language: 'en-GB',
        timezone: 'Europe/London',
        phoneCode: '+44',
        isActive: false,
        isPrimary: false
      },
      ireland: {
        name: 'Ireland',
        code: 'ireland',
        country: 'IE',
        currency: 'EUR',
        language: 'en-IE',
        timezone: 'Europe/Dublin',
        phoneCode: '+353',
        isActive: false,
        isPrimary: false
      },
      germany: {
        name: 'Germany',
        code: 'germany',
        country: 'DE',
        currency: 'EUR',
        language: 'de-DE',
        timezone: 'Europe/Berlin',
        phoneCode: '+49',
        isActive: false,
        isPrimary: false
      },
      france: {
        name: 'France',
        code: 'france',
        country: 'FR',
        currency: 'EUR',
        language: 'fr-FR',
        timezone: 'Europe/Paris',
        phoneCode: '+33',
        isActive: false,
        isPrimary: false
      },
      netherlands: {
        name: 'Netherlands',
        code: 'netherlands',
        country: 'NL',
        currency: 'EUR',
        language: 'nl-NL',
        timezone: 'Europe/Amsterdam',
        phoneCode: '+31',
        isActive: false,
        isPrimary: false
      }
    },
    
    // SEO settings
    seo: {
      defaultTitle: 'Yieldly - AI Cash Flow Solutions for Legal Firms',
      defaultDescription: 'Transform your legal practice with AI-powered cash flow analysis and automation. Get personalised insights and improve your financial performance.',
      defaultKeywords: 'legal cash flow, AI legal finance, legal practice management, cash flow automation, legal accounting',
      ogImage: '/images/og-yieldly.png',
      twitterCard: 'summary_large_image'
    },
    
    // Analytics
    analytics: {
      googleAnalyticsId: 'G-XXXXXXXXXX', // Replace with actual GA4 ID
      googleTagManagerId: 'GTM-XXXXXXX', // Replace with actual GTM ID
      facebookPixelId: 'XXXXXXXXXX', // Replace with actual FB Pixel ID
      linkedinInsightId: 'XXXXXXXXXX' // Replace with actual LinkedIn Insight ID
    },
    
    // Contact information
    contact: {
      email: 'hello@yieldly.ai',
      phone: '+44 800 123 4567',
      address: {
        street: '123 Innovation Street',
        city: 'Birmingham',
        postcode: 'B1 1AA',
        country: 'United Kingdom'
      }
    },
    
    // Social media
    social: {
      linkedin: 'https://linkedin.com/company/yieldly',
      twitter: 'https://twitter.com/yieldlyai',
      facebook: 'https://facebook.com/yieldlyai'
    }
  },
  
  // Environment-specific settings
  environments: {
    development: {
      apiUrl: 'http://localhost:3000',
      cdnUrl: 'http://localhost:3000',
      debug: true
    },
    staging: {
      apiUrl: 'https://staging.yieldlycf.com',
      cdnUrl: 'https://staging-cdn.yieldlycf.com',
      debug: false
    },
    production: {
      apiUrl: 'https://api.yieldlycf.com',
      cdnUrl: 'https://cdn.yieldlycf.com',
      debug: false
    }
  },
  
  // Feature flags
  features: {
    regionalContent: true,
    geoTargeting: true,
    localisedPricing: true,
    multiLanguage: false, // Will be enabled for EU expansion
    advancedAnalytics: true,
    aBTesting: false
  }
}; 