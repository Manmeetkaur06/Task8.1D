import React, { useState } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; 
import './Form.css';

const QuestionForm = () => {
  // State to manage form input values
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newQuestion = {
        title,
        description,
        tags,
        date: new Date().toISOString(),
      };

      // Add new question to Firestore
      await addDoc(collection(firestore, 'questions'), newQuestion);

      // Clear form fields after successful submission
      setTitle('');
      setDescription('');
      setTags('');

      alert('Question posted successfully!');
    } catch (error) {
      console.error('Error posting question:', error);
      alert('Error posting question.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="ui form question-form">
      <Header as="h4" className="form-header">Post a Question</Header>

      <Form.Field>
        <label className="label-title">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title"
        />
      </Form.Field>

      <Form.Field>
        <label className="label-title">Description</label>
        <Form.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your question"
        />
      </Form.Field>

      <Form.Field>
        <label className="label-title">Tags</label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Please add up to 3 tags"
        />
      </Form.Field>

      <div className="submit-button-container">
        <Form.Button type="submit" className="submit-button">Post</Form.Button>
      </div>
    </Form>
  );
};

export default QuestionForm;
