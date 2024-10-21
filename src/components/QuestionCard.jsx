import React from 'react';
import { Card } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import './QuestionCard.css';  

// Displays an individual question card with title, tags, and optional description
const QuestionCard = ({ question, expanded, onToggleExpand, onDelete }) => {
  return (
    <Card fluid className="question-card" onClick={() => onToggleExpand(question.id)}>
      <Card.Content>
        {/* Display question title and formatted date */}
        <Card.Header>{question.title}</Card.Header>
        <Card.Meta>{new Date(question.date).toLocaleDateString()}</Card.Meta>

        {/* Display question tags */}
        <Card.Description>
          <strong>Tags:</strong>
          <div className="tags-container">
            {question.tags.split(',').map((tag, index) => (
              <span key={index} className="tag-square">
                {tag.trim()}
              </span>
            ))}
          </div>
        </Card.Description>

        {/* Show description if the card is expanded */}
        {expanded && (
          <Card.Description className="extra-details">
            <strong>Description:</strong> {question.description}
          </Card.Description>
        )}
      </Card.Content>

      {/* Extra content with delete icon */}
      <Card.Content extra className="card-extra">
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="delete-icon"
          onClick={(e) => {
            e.stopPropagation();  // Prevents triggering card expansion
            onDelete(question.id);  // Calls delete handler
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default QuestionCard;
