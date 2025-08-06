import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PerformanceData {
  region: string;
  pageSpeed: number;
  responseTime: number;
  organicTraffic: number;
  conversionRate: number;
  timestamp: string;
}

interface PerformanceDashboardProps {
  data?: PerformanceData[];
  refreshInterval?: number; // in seconds
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  data = [],
  refreshInterval = 300 // 5 minutes default
}) => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>(data);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const regions = [
    'midlands', 'london', 'scotland', 'ireland', 
    'germany', 'france', 'netherlands'
  ];

  // Simulate performance data if none provided
  useEffect(() => {
    if (data.length === 0) {
      generateMockData();
    }
  }, [data]);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const generateMockData = () => {
    const mockData: PerformanceData[] = regions.map(region => ({
      region,
      pageSpeed: Math.floor(Math.random() * 30) + 70, // 70-100
      responseTime: Math.floor(Math.random() * 1000) + 500, // 500-1500ms
      organicTraffic: Math.floor(Math.random() * 1000) + 200,
      conversionRate: (Math.random() * 0.03) + 0.01, // 1-4%
      timestamp: new Date().toISOString()
    }));
    setPerformanceData(mockData);
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would fetch from your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      generateMockData();
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh performance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate averages
  const averages = performanceData.length > 0 ? {
    pageSpeed: performanceData.reduce((sum, item) => sum + item.pageSpeed, 0) / performanceData.length,
    responseTime: performanceData.reduce((sum, item) => sum + item.responseTime, 0) / performanceData.length,
    organicTraffic: performanceData.reduce((sum, item) => sum + item.organicTraffic, 0) / performanceData.length,
    conversionRate: performanceData.reduce((sum, item) => sum + item.conversionRate, 0) / performanceData.length
  } : { pageSpeed: 0, responseTime: 0, organicTraffic: 0, conversionRate: 0 };

  // Chart configurations
  const pageSpeedChartData = {
    labels: performanceData.map(item => item.region.toUpperCase()),
    datasets: [
      {
        label: 'Page Speed Score',
        data: performanceData.map(item => item.pageSpeed),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const responseTimeChartData = {
    labels: performanceData.map(item => item.region.toUpperCase()),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: performanceData.map(item => item.responseTime),
        backgroundColor: performanceData.map(item => 
          item.responseTime < 1000 ? 'rgba(34, 197, 94, 0.8)' : 
          item.responseTime < 1500 ? 'rgba(251, 191, 36, 0.8)' : 'rgba(239, 68, 68, 0.8)'
        ),
        borderColor: performanceData.map(item => 
          item.responseTime < 1000 ? 'rgb(34, 197, 94)' : 
          item.responseTime < 1500 ? 'rgb(251, 191, 36)' : 'rgb(239, 68, 68)'
        ),
        borderWidth: 1
      }
    ]
  };

  const trafficChartData = {
    labels: performanceData.map(item => item.region.toUpperCase()),
    datasets: [
      {
        label: 'Organic Traffic',
        data: performanceData.map(item => item.organicTraffic),
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
        borderColor: 'rgb(147, 51, 234)',
        borderWidth: 1
      }
    ]
  };

  const conversionChartData = {
    labels: performanceData.map(item => item.region.toUpperCase()),
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: performanceData.map(item => item.conversionRate * 100),
        backgroundColor: performanceData.map(item => 
          item.conversionRate > 0.025 ? 'rgba(34, 197, 94, 0.8)' : 
          item.conversionRate > 0.015 ? 'rgba(251, 191, 36, 0.8)' : 'rgba(239, 68, 68, 0.8)'
        ),
        borderColor: performanceData.map(item => 
          item.conversionRate > 0.025 ? 'rgb(34, 197, 94)' : 
          item.conversionRate > 0.015 ? 'rgb(251, 191, 36)' : 'rgb(239, 68, 68)'
        ),
        borderWidth: 1
      }
    ]
  };

  const overallPerformanceData = {
    labels: ['Page Speed', 'Response Time', 'Traffic', 'Conversion'],
    datasets: [
      {
        label: 'Performance Score',
        data: [
          averages.pageSpeed,
          Math.max(0, 100 - (averages.responseTime / 20)), // Convert response time to score
          Math.min(100, (averages.organicTraffic / 10)), // Convert traffic to score
          averages.conversionRate * 1000 // Convert conversion rate to score
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(251, 191, 36, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(147, 51, 234)',
          'rgb(251, 191, 36)'
        ],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Regional Performance Metrics'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Overall Performance Score'
      }
    }
  };

  return (
    <div className="performance-dashboard">
      <div className="dashboard-header">
        <h1>Performance Dashboard</h1>
        <div className="dashboard-controls">
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="refresh-button"
          >
            {isLoading ? '🔄 Loading...' : '🔄 Refresh'}
          </button>
          <span className="last-updated">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="metrics-summary">
        <div className="metric-card">
          <h3>Average Page Speed</h3>
          <div className="metric-value">
            {averages.pageSpeed.toFixed(1)}/100
          </div>
          <div className="metric-status">
            {averages.pageSpeed >= 90 ? '🟢 Excellent' :
             averages.pageSpeed >= 80 ? '🟡 Good' :
             averages.pageSpeed >= 70 ? '🟠 Needs Improvement' : '🔴 Poor'}
          </div>
        </div>

        <div className="metric-card">
          <h3>Average Response Time</h3>
          <div className="metric-value">
            {averages.responseTime.toFixed(0)}ms
          </div>
          <div className="metric-status">
            {averages.responseTime <= 1000 ? '🟢 Fast' :
             averages.responseTime <= 1500 ? '🟡 Moderate' : '🔴 Slow'}
          </div>
        </div>

        <div className="metric-card">
          <h3>Total Organic Traffic</h3>
          <div className="metric-value">
            {averages.organicTraffic.toFixed(0)} visits
          </div>
          <div className="metric-status">
            📈 +12% from last month
          </div>
        </div>

        <div className="metric-card">
          <h3>Average Conversion Rate</h3>
          <div className="metric-value">
            {(averages.conversionRate * 100).toFixed(2)}%
          </div>
          <div className="metric-status">
            {averages.conversionRate >= 0.025 ? '🟢 High' :
             averages.conversionRate >= 0.015 ? '🟡 Medium' : '🔴 Low'}
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Page Speed by Region</h3>
          <Line data={pageSpeedChartData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h3>Response Time by Region</h3>
          <Bar data={responseTimeChartData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h3>Organic Traffic by Region</h3>
          <Bar data={trafficChartData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h3>Conversion Rate by Region</h3>
          <Bar data={conversionChartData} options={chartOptions} />
        </div>

        <div className="chart-container full-width">
          <h3>Overall Performance Overview</h3>
          <Doughnut data={overallPerformanceData} options={doughnutOptions} />
        </div>
      </div>

      <div className="regional-breakdown">
        <h3>Regional Performance Breakdown</h3>
        <div className="regions-grid">
          {performanceData.map((region) => (
            <div key={region.region} className="region-card">
              <h4>{region.region.toUpperCase()}</h4>
              <div className="region-metrics">
                <div className="metric">
                  <span className="label">Page Speed:</span>
                  <span className={`value ${region.pageSpeed >= 80 ? 'good' : region.pageSpeed >= 70 ? 'warning' : 'poor'}`}>
                    {region.pageSpeed}/100
                  </span>
                </div>
                <div className="metric">
                  <span className="label">Response Time:</span>
                  <span className={`value ${region.responseTime <= 1000 ? 'good' : region.responseTime <= 1500 ? 'warning' : 'poor'}`}>
                    {region.responseTime}ms
                  </span>
                </div>
                <div className="metric">
                  <span className="label">Traffic:</span>
                  <span className="value">{region.organicTraffic} visits</span>
                </div>
                <div className="metric">
                  <span className="label">Conversion:</span>
                  <span className={`value ${region.conversionRate >= 0.025 ? 'good' : region.conversionRate >= 0.015 ? 'warning' : 'poor'}`}>
                    {(region.conversionRate * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .performance-dashboard {
          padding: 2rem;
          background: #0f172a;
          color: #ffffff;
          min-height: 100vh;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #334155;
        }

        .dashboard-header h1 {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
        }

        .dashboard-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .refresh-button {
          padding: 0.5rem 1rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .refresh-button:hover {
          background: #2563eb;
        }

        .refresh-button:disabled {
          background: #64748b;
          cursor: not-allowed;
        }

        .last-updated {
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .metrics-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metric-card {
          background: #1e293b;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #334155;
        }

        .metric-card h3 {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .metric-status {
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .chart-container {
          background: #1e293b;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #334155;
        }

        .chart-container.full-width {
          grid-column: 1 / -1;
        }

        .chart-container h3 {
          margin: 0 0 1rem 0;
          font-size: 1.125rem;
          color: #e2e8f0;
        }

        .regional-breakdown {
          background: #1e293b;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #334155;
        }

        .regional-breakdown h3 {
          margin: 0 0 1.5rem 0;
          font-size: 1.25rem;
          color: #e2e8f0;
        }

        .regions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .region-card {
          background: #0f172a;
          padding: 1rem;
          border-radius: 6px;
          border: 1px solid #334155;
        }

        .region-card h4 {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          color: #60a5fa;
        }

        .region-metrics {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .metric {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .label {
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .value {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .value.good {
          color: #22c55e;
        }

        .value.warning {
          color: #fbbf24;
        }

        .value.poor {
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .performance-dashboard {
            padding: 1rem;
          }

          .dashboard-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }

          .metrics-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PerformanceDashboard; 