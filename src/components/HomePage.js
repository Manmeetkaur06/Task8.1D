import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to DEV@Deakin</h1>
          <p>Your hub for sharing knowledge, asking questions, and posting articles.</p>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-block">
          <h2>Ask Questions</h2>
          <p>Get answers from fellow developers and enhance your knowledge by posting and browsing questions.</p>
        </div>
        <div className="info-block">
          <h2>Post Articles</h2>
          <p>Share your thoughts and insights by writing articles about the latest trends in development.</p>
        </div>
        <div className="info-block">
          <h2>Engage with the Community</h2>
          <p>Connect with developers, share your experiences, and grow your network within the DEV@Deakin platform.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
