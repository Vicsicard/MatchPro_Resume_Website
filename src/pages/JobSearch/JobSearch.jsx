import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './JobSearch.css';
import redis from '../utils/redisClient';

function JobSearch() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [preferences, setPreferences] = useState({
        jobType: '',
        location: '',
        companySize: ''
    });
    const location = useLocation();

    const isDevMode = process.env.NODE_ENV === 'development';

    const fetchJobs = async (page) => {
        if (!isDevMode) {
            const cacheKey = `jobs:page:${page}`;
            const cachedJobs = await redis.get(cacheKey);

            if (cachedJobs) {
                setJobs(JSON.parse(cachedJobs));
                return;
            }
        }

        try {
            const resumeData = JSON.parse(localStorage.getItem('resumeData'));
            if (!resumeData) {
                throw new Error('No resume data found');
            }

            const response = await fetch(`http://localhost:3000/api/match-jobs?page=${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resumeData, preferences }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            setJobs(prevJobs => [...prevJobs, ...data.jobs]);
            setHasMore(data.jobs.length > 0);

            if (!isDevMode) {
                const cacheKey = `jobs:page:${page}`;
                await redis.set(cacheKey, JSON.stringify(data.jobs), 'EX', 3600); // Cache for 1 hour
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePreferenceChange = (e) => {
        const { name, value } = e.target;
        setPreferences(prevPreferences => ({
            ...prevPreferences,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchJobs(page);
    }, [page]);

    const loadMoreJobs = () => {
        if (hasMore && !isLoading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            loadMoreJobs();
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, isLoading]);

    if (isLoading && page === 1) {
        return (
            <div className="job-search-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Finding matching jobs...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="job-search-container">
                <div className="error-message">
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={() => window.history.back()}>Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="job-search-container">
            <h1>Matching Jobs</h1>
            <div className="preferences-container">
                <h2>Set Your Preferences</h2>
                <label>
                    Job Type:
                    <input
                        type="text"
                        name="jobType"
                        value={preferences.jobType}
                        onChange={handlePreferenceChange}
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={preferences.location}
                        onChange={handlePreferenceChange}
                    />
                </label>
                <label>
                    Company Size:
                    <input
                        type="text"
                        name="companySize"
                        value={preferences.companySize}
                        onChange={handlePreferenceChange}
                    />
                </label>
            </div>
            <div className="jobs-list">
                {jobs.map((job, index) => (
                    <div key={index} className="job-card">
                        <div className="job-header">
                            <h2>{job.title}</h2>
                            <span className="match-score">
                                Match: {Math.round(job.matchScore)}%
                            </span>
                        </div>
                        <h3>{job.company}</h3>
                        <p className="location">{job.location}</p>
                        <p className="description">{job.description}</p>
                        <div className="job-footer">
                            <a 
                                href={job.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="apply-button"
                            >
                                View Job
                            </a>
                            <span className="source">Source: {job.source}</span>
                        </div>
                    </div>
                ))}
            </div>
            {isLoading && <p>Loading more jobs...</p>}
        </div>
    );
}

export default JobSearch;
