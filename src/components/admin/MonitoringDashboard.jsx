import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import './MonitoringDashboard.css';

function MonitoringDashboard() {
  const [metrics, setMetrics] = useState({
    pageViews: [],
    errors: [],
    loadTimes: [],
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    fetchMetrics();
  }, [timeRange]);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      // Fetch page views
      const { data: pageViews } = await supabase
        .from('application_metrics')
        .select('*')
        .eq('metric_name', 'page_view')
        .order('timestamp', { ascending: false })
        .limit(100);

      // Fetch errors
      const { data: errors } = await supabase
        .from('error_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      // Fetch load times
      const { data: loadTimes } = await supabase
        .from('application_metrics')
        .select('*')
        .eq('metric_name', 'page_load_time')
        .order('timestamp', { ascending: false })
        .limit(100);

      setMetrics({
        pageViews: pageViews || [],
        errors: errors || [],
        loadTimes: loadTimes || [],
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageLoadTime = () => {
    if (!metrics.loadTimes.length) return 0;
    const sum = metrics.loadTimes.reduce((acc, curr) => acc + curr.value, 0);
    return (sum / metrics.loadTimes.length).toFixed(2);
  };

  const getErrorsByType = () => {
    const errorTypes = {};
    metrics.errors.forEach(error => {
      errorTypes[error.error_type] = (errorTypes[error.error_type] || 0) + 1;
    });
    return errorTypes;
  };

  if (loading) {
    return <div className="loading">Loading metrics...</div>;
  }

  return (
    <div className="monitoring-dashboard">
      <header className="dashboard-header">
        <h1>Application Monitoring</h1>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <h2>Page Views</h2>
          <div className="metric-value">{metrics.pageViews.length}</div>
          <div className="metric-subtitle">Total Views</div>
        </div>

        <div className="metric-card">
          <h2>Average Load Time</h2>
          <div className="metric-value">{calculateAverageLoadTime()}ms</div>
          <div className="metric-subtitle">Past {timeRange}</div>
        </div>

        <div className="metric-card">
          <h2>Error Rate</h2>
          <div className="metric-value">
            {((metrics.errors.length / Math.max(metrics.pageViews.length, 1)) * 100).toFixed(2)}%
          </div>
          <div className="metric-subtitle">Errors/Views</div>
        </div>
      </div>

      <div className="metrics-details">
        <div className="errors-section">
          <h2>Recent Errors</h2>
          <div className="error-list">
            {metrics.errors.slice(0, 5).map((error, index) => (
              <div key={index} className="error-item">
                <div className="error-severity" data-severity={error.severity}>
                  {error.severity}
                </div>
                <div className="error-message">{error.error_message}</div>
                <div className="error-time">
                  {new Date(error.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="error-types">
          <h2>Errors by Type</h2>
          <div className="error-type-list">
            {Object.entries(getErrorsByType()).map(([type, count]) => (
              <div key={type} className="error-type-item">
                <span className="error-type">{type}</span>
                <span className="error-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        className="refresh-button"
        onClick={fetchMetrics}
      >
        Refresh Metrics
      </button>
    </div>
  );
}

export default MonitoringDashboard;
