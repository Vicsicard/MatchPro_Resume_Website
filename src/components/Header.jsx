import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/supabase';
import './Header.css';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current auth state
    auth.getUser().then(({ user: currentUser }) => {
      setUser(currentUser);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <header className="header">
      <div className="header-container container">
        <Link to="/" className="logo">
          MatchPro Resume
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/how-it-works" className="nav-link">How It Works</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/testimonials" className="nav-link">Testimonials</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          <div className="auth-buttons">
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-outline">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </nav>

        <button className="mobile-menu-btn">
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
