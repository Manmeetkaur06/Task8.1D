import React from 'react';
import { Form } from 'semantic-ui-react';
import './PostTypeSelector.css'; 

const PostTypeSelector = ({ postType, setPostType }) => {
  return (
    <div className="post-type-selector-container">
      <label className="post-type-label">Select Post Type:</label>
      <div className="radio-buttons-container">
        <div className="radio-option">
          <Form.Field>
            <Form.Radio
              label="Question"
              value="question"
              checked={postType === 'question'}
              onChange={() => setPostType('question')}
            />
          </Form.Field>
        </div>
        <div className="radio-option">
          <Form.Field>
            <Form.Radio
              label="Article"
              value="article"
              checked={postType === 'article'}
              onChange={() => setPostType('article')}
            />
          </Form.Field>
        </div>
      </div>
    </div>
  );
};

export default PostTypeSelector;
