import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './JobSearch.css';

function JobSearch() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const resumeData = JSON.parse(localStorage.getItem('resumeData'));
                if (!resumeData) {
                    throw new Error('No resume data found');
                }

                const response = await fetch('http://localhost:3000/api/match-jobs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ resumeData }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }

                const data = await response.json();
                setJobs(data.jobs);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (isLoading) {
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
        </div>
    );
}

export default JobSearch;
