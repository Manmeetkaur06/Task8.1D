import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { PostContext } from '../context/PostContext';
import QuestionCard from './QuestionCard';
import Searcher from './Searcher';
import './FindQuestionPage.css';

const FindQuestionPage = () => {
  const { questions, deleteQuestionFromFirestore } = useContext(PostContext); // Access questions and delete function from context
  const [filteredQuestions, setFilteredQuestions] = useState(questions); // State for filtered questions
  const [searchQuery, setSearchQuery] = useState(''); // State for search input value
  const [expandedQuestion, setExpandedQuestion] = useState(null); // Track expanded question for details view

  // Update filteredQuestions when questions change
  useEffect(() => {
    setFilteredQuestions(questions);
  }, [questions]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Check if search query is a date
  const isDate = (str) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(str);
  };

  // Filter questions by search query
  const filterQuestions = useCallback(() => {
    let filtered = [...questions];
    if (searchQuery) {
      if (isDate(searchQuery)) {
        filtered = filtered.filter(q => new Date(q.date).toDateString() === new Date(searchQuery).toDateString());
      } else {
        filtered = filtered.filter(q =>
          q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.tags.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }
    setFilteredQuestions(filtered);
  }, [questions, searchQuery]);

  // Apply filters when search query or questions change
  useEffect(() => {
    filterQuestions();
  }, [searchQuery, questions, filterQuestions]);

  // Toggle expanded view for question details
  const toggleExpand = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="find-question-page">
      {/* Search bar */}
      <Segment className="filter-segment">
        <Searcher
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
      </Segment>

      {/* Display filtered questions */}
      {filteredQuestions.length > 0 ? (
        <div className="questions-card-group">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              expanded={expandedQuestion === question.id}
              onToggleExpand={toggleExpand}
              onDelete={() => deleteQuestionFromFirestore(question.id)}
            />
          ))}
        </div>
      ) : (
        // No questions found message
        <Segment placeholder className="no-results-segment">
          <Header icon>
            <Icon name="search" />
            No Questions Found
          </Header>
          <p>Try adjusting the filters</p>
        </Segment>
      )}
    </div>
  );
};

export default FindQuestionPage;
