import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../lib/supabase';
import { useMonitoring } from '../../hooks/useMonitoring';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { trackError, trackMetric } = useMonitoring();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const startTime = performance.now();
    
    try {
      setLoading(true);
      setError(null);

      const { error: signInError } = await auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Track successful login
      trackMetric('login_success', 1, { method: 'email' });
      trackMetric('auth_response_time', performance.now() - startTime, { action: 'login' });
      
      // Successful login
      navigate('/dashboard');
    } catch (err) {
      trackError(err, 'AUTH_ERROR', 'high');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to MatchPro Resume</p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-group">
              <Link to="/auth/reset-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-large btn-block"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/auth/signup" className="auth-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
