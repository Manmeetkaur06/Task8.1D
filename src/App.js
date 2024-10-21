import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PostProvider } from './context/PostContext';
import HomePage from './components/HomePage';
import FindQuestionPage from './components/FindQuestionPage';
import PostPage from './components/PostPage';
import './App.css';

function App() {
  return (
    <PostProvider>
      <Router>
        <div className="App">
          <nav>
            <div className="brand">DEV@Deakin</div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/find-questions">Find Questions</Link></li>
              <li><Link to="/post">Post a Question or Article</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/find-questions" element={<FindQuestionPage />} />
            <Route path="/post" element={<PostPage />} />
          </Routes>
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;
