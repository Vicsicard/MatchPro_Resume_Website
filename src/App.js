import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import LandingPage1 from './pages/LandingPage1';
import LandingPage2 from './pages/LandingPage2';
import LandingPage3 from './pages/LandingPage3';
import MainHomepage from './pages/MainHomepage';
import ResumeBuilder from './pages/ResumeBuilder/ResumeBuilder';  
import ResumePreview from './pages/ResumeBuilder/ResumePreview';
import JobSearch from './pages/JobSearch';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

// Layout wrapper
const Layout = ({ children }) => {
  const location = useLocation();
  const isLandingPage = ['/landing1', '/landing2', '/landing3'].includes(location.pathname);
  const isResumePreview = location.pathname === '/resume-preview';

  return (
    <div className="app">
      {!isLandingPage && !isResumePreview && <Header />}
      <main className={`main-content ${isLandingPage ? 'landing-page-content' : ''} ${isResumePreview ? 'preview-page-content' : ''}`}>
        {children}
      </main>
      {!isLandingPage && !isResumePreview && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Landing Pages Flow */}
          <Route path="/" element={<Navigate to="/landing1" replace />} />
          <Route path="/landing1" element={<LandingPage1 />} />
          <Route path="/landing2" element={<LandingPage2 />} />
          <Route path="/landing3" element={<LandingPage3 />} />
          
          {/* Main Application Routes */}
          <Route path="/home" element={<MainHomepage />} />
          <Route path="/matchproresumebuilder" element={<ResumeBuilder />} />
          <Route path="/resume-preview" element={<ResumePreview />} />
          <Route path="/job-search" element={<JobSearch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
