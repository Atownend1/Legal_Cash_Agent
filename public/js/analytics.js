// Enhanced Google Analytics 4 Configuration for Yieldly Multi-Regional Platform
// This script provides advanced tracking for regional performance monitoring

(function() {
    'use strict';

    // Regional configuration mapping
    const regionalConfig = {
        'midlands': {
            region: 'midlands',
            language: 'en-GB',
            currency: 'GBP',
            country: 'UK'
        },
        'london': {
            region: 'london',
            language: 'en-GB',
            currency: 'GBP',
            country: 'UK'
        },
        'scotland': {
            region: 'scotland',
            language: 'en-GB',
            currency: 'GBP',
            country: 'UK'
        },
        'ireland': {
            region: 'ireland',
            language: 'en-IE',
            currency: 'EUR',
            country: 'Ireland'
        },
        'germany': {
            region: 'germany',
            language: 'de-DE',
            currency: 'EUR',
            country: 'Germany'
        },
        'france': {
            region: 'france',
            language: 'fr-FR',
            currency: 'EUR',
            country: 'France'
        },
        'netherlands': {
            region: 'netherlands',
            language: 'nl-NL',
            currency: 'EUR',
            country: 'Netherlands'
        }
    };

    // Detect current region from URL
    function detectRegion() {
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(Boolean);
        
        if (pathParts.length > 0) {
            const potentialRegion = pathParts[0];
            if (regionalConfig[potentialRegion]) {
                return regionalConfig[potentialRegion];
            }
        }
        
        // Default to Midlands if no region detected
        return regionalConfig['midlands'];
    }

    // Enhanced event tracking
    function trackEvent(eventName, parameters = {}) {
        const region = detectRegion();
        
        const enhancedParameters = {
            ...parameters,
            'custom_parameter_1': region.region,
            'custom_parameter_2': window.location.pathname.split('/')[2] || '', // city
            'custom_parameter_3': region.language,
            'custom_parameter_4': region.currency,
            'region': region.region,
            'country': region.country,
            'page_path': window.location.pathname,
            'page_title': document.title
        };

        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, enhancedParameters);
        }
    }

    // Track page views with regional data
    function trackPageView() {
        const region = detectRegion();
        
        gtag('event', 'page_view', {
            'custom_parameter_1': region.region,
            'custom_parameter_2': window.location.pathname.split('/')[2] || '',
            'custom_parameter_3': region.language,
            'custom_parameter_4': region.currency,
            'page_title': document.title,
            'page_location': window.location.href
        });
    }

    // Track demo requests
    function trackDemoRequest(region = null) {
        const currentRegion = region || detectRegion();
        
        trackEvent('demo_request', {
            'event_category': 'conversion',
            'event_label': currentRegion.region,
            'value': 1,
            'currency': currentRegion.currency
        });
    }

    // Track content engagement
    function trackContentEngagement(contentType, contentTitle) {
        trackEvent('content_engagement', {
            'event_category': 'engagement',
            'event_label': contentType,
            'content_title': contentTitle,
            'content_type': contentType
        });
    }

    // Track regional navigation
    function trackRegionalNavigation(fromRegion, toRegion) {
        trackEvent('regional_navigation', {
            'event_category': 'navigation',
            'event_label': `${fromRegion} to ${toRegion}`,
            'from_region': fromRegion,
            'to_region': toRegion
        });
    }

    // Track performance metrics
    function trackPerformanceMetric(metricName, value, region = null) {
        const currentRegion = region || detectRegion();
        
        trackEvent('performance_metric', {
            'event_category': 'performance',
            'event_label': metricName,
            'metric_name': metricName,
            'metric_value': value,
            'region': currentRegion.region
        });
    }

    // Track conversion funnel
    function trackConversionStep(step, value = null) {
        const region = detectRegion();
        
        trackEvent('conversion_step', {
            'event_category': 'conversion',
            'event_label': step,
            'conversion_step': step,
            'value': value,
            'region': region.region
        });
    }

    // Track user behavior
    function trackUserBehavior(action, details = {}) {
        const region = detectRegion();
        
        trackEvent('user_behavior', {
            'event_category': 'engagement',
            'event_label': action,
            'action': action,
            'details': JSON.stringify(details),
            'region': region.region
        });
    }

    // Initialize enhanced tracking
    function initializeEnhancedTracking() {
        // Track initial page view
        trackPageView();

        // Track demo button clicks
        document.addEventListener('click', function(e) {
            if (e.target.matches('[href*="#demo"], [href*="demo"], .demo-button, .cta-button')) {
                trackDemoRequest();
            }
        });

        // Track content engagement
        document.addEventListener('click', function(e) {
            if (e.target.closest('.article-card, .blog-post, .content-card')) {
                const contentElement = e.target.closest('.article-card, .blog-post, .content-card');
                const title = contentElement.querySelector('h3, h2, h1')?.textContent || 'Unknown';
                trackContentEngagement('article_click', title);
            }
        });

        // Track regional navigation
        document.addEventListener('click', function(e) {
            if (e.target.matches('[href*="/midlands"], [href*="/london"], [href*="/scotland"], [href*="/ireland"], [href*="/germany"], [href*="/france"], [href*="/netherlands"]')) {
                const currentRegion = detectRegion().region;
                const href = e.target.getAttribute('href');
                const targetRegion = href.split('/')[1];
                
                if (targetRegion && targetRegion !== currentRegion) {
                    trackRegionalNavigation(currentRegion, targetRegion);
                }
            }
        });

        // Track form submissions
        document.addEventListener('submit', function(e) {
            if (e.target.matches('form')) {
                const formType = e.target.getAttribute('data-form-type') || 'contact';
                trackConversionStep(formType);
            }
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Track scroll milestones
                if (scrollPercent >= 25 && maxScroll < 50) {
                    trackUserBehavior('scroll_25_percent');
                } else if (scrollPercent >= 50 && maxScroll < 75) {
                    trackUserBehavior('scroll_50_percent');
                } else if (scrollPercent >= 75 && maxScroll < 100) {
                    trackUserBehavior('scroll_75_percent');
                } else if (scrollPercent >= 100) {
                    trackUserBehavior('scroll_100_percent');
                }
            }
        });

        // Track time on page
        let startTime = Date.now();
        window.addEventListener('beforeunload', function() {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            trackUserBehavior('time_on_page', { seconds: timeOnPage });
        });

        console.log('Enhanced Google Analytics tracking initialized for region:', detectRegion().region);
    }

    // Expose functions globally for manual tracking
    window.YieldlyAnalytics = {
        trackEvent,
        trackPageView,
        trackDemoRequest,
        trackContentEngagement,
        trackRegionalNavigation,
        trackPerformanceMetric,
        trackConversionStep,
        trackUserBehavior,
        detectRegion,
        initializeEnhancedTracking
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeEnhancedTracking);
    } else {
        initializeEnhancedTracking();
    }

})(); 