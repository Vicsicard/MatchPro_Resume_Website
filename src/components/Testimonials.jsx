import React, { useEffect, useState } from 'react';
import { db } from '../lib/supabase';
import './Testimonials.css';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    // Auto-advance carousel every 5 seconds
    const timer = setInterval(() => {
      setActiveIndex((current) => 
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await db
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((current) => 
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  if (loading) {
    return (
      <div className="testimonials-section">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="testimonials-loading">Loading testimonials...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="testimonials-section">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="testimonials-error">
            Unable to load testimonials. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="testimonials-section">
      <div className="container">
        <h2>What Our Users Say</h2>
        
        {testimonials.length > 0 ? (
          <div className="testimonials-carousel">
            <button 
              className="carousel-button prev" 
              onClick={handlePrevious}
              aria-label="Previous testimonial"
            >
              ‹
            </button>

            <div className="testimonials-viewport">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
                  aria-hidden={index !== activeIndex}
                >
                  <div className="testimonial-content">
                    <p className="testimonial-quote">"{testimonial.quote}"</p>
                    <div className="testimonial-author">
                      {testimonial.avatar_url && (
                        <img 
                          src={testimonial.avatar_url} 
                          alt={testimonial.name}
                          className="author-avatar" 
                        />
                      )}
                      <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        {testimonial.position && (
                          <p className="author-position">{testimonial.position}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="carousel-button next" 
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              ›
            </button>

            <div className="carousel-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="testimonials-empty">
            No testimonials available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}

export default Testimonials;
