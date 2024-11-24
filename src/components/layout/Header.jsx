import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../lib/supabase';
import './Header.css';

const Header = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Get current user
    auth.getUser().then(({ user: currentUser }) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <header className="main-header">
      <div className="container">
        <div className="header-spacer"></div>
        <h1>Welcome to MatchPro Resume</h1>
        {!user && (
          <div className="header-buttons">
            <Link to="/login" className="header-button">Login</Link>
            <Link to="/signup" className="header-button primary">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
