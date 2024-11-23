import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import monitoring from '../utils/monitoring';

export function useMonitoring() {
  const location = useLocation();

  // Track page views and load time
  useEffect(() => {
    const trackPageView = async () => {
      const startTime = performance.now();
      
      try {
        await monitoring.trackMetric('page_view', 1, {
          path: location.pathname,
          query: location.search,
        });

        const loadTime = performance.now() - startTime;
        await monitoring.trackMetric('page_load_time', loadTime, {
          path: location.pathname,
        });
      } catch (error) {
        monitoring.logError(error, 'ANALYTICS');
      }
    };

    trackPageView();
  }, [location]);

  return {
    trackError: monitoring.logError.bind(monitoring),
    trackMetric: monitoring.trackMetric.bind(monitoring),
    trackAPIResponse: monitoring.trackAPIResponse.bind(monitoring),
  };
}

export default useMonitoring;
