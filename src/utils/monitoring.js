import supabase from '../lib/supabaseClient';

// Error types for categorization
export const ERROR_TYPES = {
  AUTH: 'authentication',
  DATABASE: 'database',
  STORAGE: 'storage',
  NETWORK: 'network',
  CLIENT: 'client',
};

// Severity levels
export const SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

// Log error to Supabase and console
export const logError = async (error, type = ERROR_TYPES.CLIENT, severity = SEVERITY.MEDIUM) => {
  console.error(`[${severity.toUpperCase()}] ${type}:`, error);

  try {
    if (supabase) {
      await supabase.from('error_logs').insert([
        {
          error_message: error.message || String(error),
          error_type: type,
          severity,
          stack_trace: error.stack,
          timestamp: new Date().toISOString(),
          user_id: (await supabase.auth.getUser())?.data?.user?.id || null,
          url: window.location.href,
          user_agent: navigator.userAgent,
        },
      ]);
    }
  } catch (loggingError) {
    console.error('Failed to log error:', loggingError);
  }
};

// Track metrics
export const trackMetric = async (name, value, metadata = {}) => {
  console.log(`[METRIC] ${name}:`, value, metadata);

  try {
    if (supabase) {
      await supabase.from('metrics').insert([
        {
          name,
          value,
          metadata,
          timestamp: new Date().toISOString(),
          user_id: (await supabase.auth.getUser())?.data?.user?.id || null,
        },
      ]);
    }
  } catch (error) {
    console.error('Failed to track metric:', error);
  }
};

// Custom hook for monitoring
export const useMonitoring = () => {
  return {
    trackError: logError,
    trackMetric,
  };
};

// Global error handler
window.onerror = (message, source, lineno, colno, error) => {
  logError(error || new Error(message), ERROR_TYPES.CLIENT);
};

// Unhandled promise rejection handler
window.onunhandledrejection = (event) => {
  logError(event.reason, ERROR_TYPES.CLIENT);
};

export default { logError, trackMetric, useMonitoring };
