// Performance Monitoring System for Yieldly Multi-Regional SEO Platform
// This script tracks and reports performance metrics across all regional markets

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class PerformanceMonitor {
  constructor() {
    this.regions = [
      'midlands', 'london', 'scotland', 'ireland', 
      'germany', 'france', 'netherlands'
    ];
    
    this.cities = {
      midlands: ['birmingham', 'coventry', 'wolverhampton', 'worcester'],
      london: ['london', 'westminster', 'city-of-london'],
      scotland: ['edinburgh', 'glasgow', 'aberdeen', 'dundee'],
      ireland: ['dublin', 'cork', 'galway', 'limerick'],
      germany: ['berlin', 'munich', 'hamburg', 'cologne'],
      france: ['paris', 'lyon', 'marseille', 'toulouse'],
      netherlands: ['amsterdam', 'rotterdam', 'den-haag', 'utrecht']
    };
    
    this.services = [
      'cash-flow-management',
      'invoice-automation', 
      'payment-tracking',
      'compliance-monitoring',
      'financial-analytics',
      'client-portal',
      'integration-services'
    ];
    
    this.baseUrl = 'https://yieldlycf.com';
    this.results = {};
  }

  // Test page speed using PageSpeed Insights API
  async testPageSpeed(url, region) {
    try {
      const response = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed`, {
        params: {
          url: url,
          key: process.env.PAGESPEED_API_KEY,
          strategy: 'mobile',
          category: 'performance'
        }
      });

      const data = response.data;
      const lighthouseResult = data.lighthouseResult;
      
      return {
        region,
        url,
        timestamp: new Date().toISOString(),
        metrics: {
          firstContentfulPaint: lighthouseResult.audits['first-contentful-paint'].numericValue / 1000,
          largestContentfulPaint: lighthouseResult.audits['largest-contentful-paint'].numericValue / 1000,
          cumulativeLayoutShift: lighthouseResult.audits['cumulative-layout-shift'].numericValue,
          firstInputDelay: lighthouseResult.audits['max-potential-fid'].numericValue,
          performanceScore: lighthouseResult.categories.performance.score * 100,
          mobileScore: lighthouseResult.categories.performance.score * 100,
          accessibilityScore: lighthouseResult.categories.accessibility.score * 100,
          bestPracticesScore: lighthouseResult.categories['best-practices'].score * 100,
          seoScore: lighthouseResult.categories.seo.score * 100
        }
      };
    } catch (error) {
      console.error(`Error testing page speed for ${url}:`, error.message);
      return null;
    }
  }

  // Test server response time
  async testResponseTime(url, region) {
    const start = Date.now();
    try {
      await axios.get(url, { timeout: 10000 });
      const responseTime = Date.now() - start;
      
      return {
        region,
        url,
        timestamp: new Date().toISOString(),
        responseTime: responseTime,
        status: 'success'
      };
    } catch (error) {
      return {
        region,
        url,
        timestamp: new Date().toISOString(),
        responseTime: null,
        status: 'error',
        error: error.message
      };
    }
  }

  // Test SEO health using Google Search Console API
  async testSEOHealth(region) {
    try {
      // This would require Google Search Console API setup
      // For now, we'll simulate the data
      return {
        region,
        timestamp: new Date().toISOString(),
        seoMetrics: {
          pagesIndexed: Math.floor(Math.random() * 50) + 30,
          averageRanking: Math.floor(Math.random() * 20) + 10,
          organicTraffic: Math.floor(Math.random() * 1000) + 500,
          clickThroughRate: (Math.random() * 0.05) + 0.02,
          impressions: Math.floor(Math.random() * 5000) + 2000
        }
      };
    } catch (error) {
      console.error(`Error testing SEO health for ${region}:`, error.message);
      return null;
    }
  }

  // Test regional content performance
  async testContentPerformance(region) {
    const urls = [
      `${this.baseUrl}/${region}`,
      ...this.cities[region]?.map(city => `${this.baseUrl}/${region}/${city}`) || [],
      ...this.services.map(service => `${this.baseUrl}/${region}/${service}`)
    ];

    const results = [];
    
    for (const url of urls) {
      const speedResult = await this.testPageSpeed(url, region);
      const responseResult = await this.testResponseTime(url, region);
      
      if (speedResult && responseResult) {
        results.push({
          url,
          region,
          timestamp: new Date().toISOString(),
          pageSpeed: speedResult.metrics,
          responseTime: responseResult.responseTime,
          status: responseResult.status
        });
      }
    }

    return results;
  }

  // Generate performance report
  generateReport(data) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalRegions: this.regions.length,
        totalPages: this.regions.length * (1 + this.cities.midlands.length + this.services.length),
        averagePageSpeed: 0,
        averageResponseTime: 0,
        regionsWithIssues: []
      },
      regionalPerformance: {},
      recommendations: []
    };

    // Calculate averages and identify issues
    let totalSpeed = 0;
    let totalResponse = 0;
    let speedCount = 0;
    let responseCount = 0;

    this.regions.forEach(region => {
      const regionData = data.filter(item => item.region === region);
      
      if (regionData.length > 0) {
        const avgSpeed = regionData.reduce((sum, item) => {
          if (item.pageSpeed?.performanceScore) {
            totalSpeed += item.pageSpeed.performanceScore;
            speedCount++;
            return sum + item.pageSpeed.performanceScore;
          }
          return sum;
        }, 0) / regionData.length;

        const avgResponse = regionData.reduce((sum, item) => {
          if (item.responseTime) {
            totalResponse += item.responseTime;
            responseCount++;
            return sum + item.responseTime;
          }
          return sum;
        }, 0) / regionData.length;

        report.regionalPerformance[region] = {
          averagePageSpeed: avgSpeed,
          averageResponseTime: avgResponse,
          pagesTested: regionData.length,
          issues: regionData.filter(item => 
            item.pageSpeed?.performanceScore < 70 || 
            item.responseTime > 2000
          ).length
        };

        if (avgSpeed < 70 || avgResponse > 2000) {
          report.summary.regionsWithIssues.push(region);
        }
      }
    });

    report.summary.averagePageSpeed = totalSpeed / speedCount;
    report.summary.averageResponseTime = totalResponse / responseCount;

    // Generate recommendations
    if (report.summary.averagePageSpeed < 80) {
      report.recommendations.push({
        priority: 'high',
        category: 'performance',
        title: 'Optimize Page Speed',
        description: 'Average page speed is below 80. Consider image optimization, code splitting, and CDN implementation.'
      });
    }

    if (report.summary.averageResponseTime > 1500) {
      report.recommendations.push({
        priority: 'high',
        category: 'performance',
        title: 'Improve Server Response Time',
        description: 'Average response time is above 1.5s. Consider server optimization and caching strategies.'
      });
    }

    if (report.summary.regionsWithIssues.length > 0) {
      report.recommendations.push({
        priority: 'medium',
        category: 'regional',
        title: 'Address Regional Performance Issues',
        description: `Performance issues detected in: ${report.summary.regionsWithIssues.join(', ')}`
      });
    }

    return report;
  }

  // Run comprehensive performance test
  async runPerformanceTest() {
    console.log('🚀 Starting comprehensive performance test...');
    
    const allResults = [];
    
    for (const region of this.regions) {
      console.log(`Testing region: ${region}`);
      const regionResults = await this.testContentPerformance(region);
      allResults.push(...regionResults);
      
      // Add SEO health data
      const seoData = await this.testSEOHealth(region);
      if (seoData) {
        allResults.push(seoData);
      }
    }

    const report = this.generateReport(allResults);
    
    // Save results
    const timestamp = new Date().toISOString().split('T')[0];
    const reportPath = path.join(__dirname, `reports/performance-report-${timestamp}.json`);
    
    // Ensure reports directory exists
    const reportsDir = path.join(__dirname, 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Generate summary
    this.generateSummary(report);
    
    return report;
  }

  // Generate human-readable summary
  generateSummary(report) {
    console.log('\n📊 PERFORMANCE TEST SUMMARY');
    console.log('============================');
    console.log(`Test Date: ${new Date().toLocaleDateString()}`);
    console.log(`Total Regions Tested: ${report.summary.totalRegions}`);
    console.log(`Total Pages Tested: ${report.summary.totalPages}`);
    console.log(`Average Page Speed: ${report.summary.averagePageSpeed.toFixed(1)}/100`);
    console.log(`Average Response Time: ${report.summary.averageResponseTime.toFixed(0)}ms`);
    
    if (report.summary.regionsWithIssues.length > 0) {
      console.log(`⚠️  Regions with Issues: ${report.summary.regionsWithIssues.join(', ')}`);
    } else {
      console.log('✅ All regions performing well');
    }
    
    console.log('\n🎯 RECOMMENDATIONS:');
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. [${rec.priority.toUpperCase()}] ${rec.title}`);
      console.log(`   ${rec.description}`);
    });
    
    console.log('\n📈 REGIONAL PERFORMANCE:');
    Object.entries(report.regionalPerformance).forEach(([region, data]) => {
      const status = data.issues > 0 ? '⚠️' : '✅';
      console.log(`${status} ${region.toUpperCase()}: ${data.averagePageSpeed.toFixed(1)}/100 speed, ${data.averageResponseTime.toFixed(0)}ms response`);
    });
  }

  // Schedule regular performance monitoring
  scheduleMonitoring(intervalHours = 24) {
    console.log(`🕐 Scheduling performance monitoring every ${intervalHours} hours`);
    
    setInterval(async () => {
      console.log('🔄 Running scheduled performance test...');
      await this.runPerformanceTest();
    }, intervalHours * 60 * 60 * 1000);
  }
}

// Export for use in other modules
module.exports = PerformanceMonitor;

// Run if called directly
if (require.main === module) {
  const monitor = new PerformanceMonitor();
  
  if (process.argv.includes('--schedule')) {
    const interval = parseInt(process.argv[process.argv.indexOf('--schedule') + 1]) || 24;
    monitor.scheduleMonitoring(interval);
    console.log(`Performance monitoring scheduled every ${interval} hours`);
  } else {
    monitor.runPerformanceTest()
      .then(() => {
        console.log('✅ Performance test completed');
        process.exit(0);
      })
      .catch(error => {
        console.error('❌ Performance test failed:', error);
        process.exit(1);
      });
  }
} 