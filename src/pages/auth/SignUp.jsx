import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../lib/supabase';
import { useMonitoring } from '../../hooks/useMonitoring';
import './Auth.css';

function SignUp() {
  const navigate = useNavigate();
  const { trackError, trackMetric } = useMonitoring();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const startTime = performance.now();

    try {
      setLoading(true);
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const { error: signUpError } = await auth.signUp({
        email,
        password,
        options: {
          data: {
            joined_at: new Date().toISOString(),
          },
        },
      });

      if (signUpError) throw signUpError;

      // Track successful signup
      trackMetric('signup_success', 1, { method: 'email' });
      trackMetric('auth_response_time', performance.now() - startTime, { action: 'signup' });
      
      navigate('/auth/verify-email', { 
        state: { email } 
      });
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
          <h1>Create Account</h1>
          <p className="auth-subtitle">Join MatchPro Resume to start your journey</p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="auth-form">
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
                placeholder="Create a password"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-large btn-block"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/auth/login" className="auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
