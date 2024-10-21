import React, { useState } from 'react';
import { Header } from 'semantic-ui-react';
import PostTypeSelector from './PostTypeSelector';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import './PostPage.css'; 

const PostPage = () => {
  const [postType, setPostType] = useState(''); 

  return (
    <div className="post-page-container">
      <Header as="h2" className="post-page-header">New Post</Header>

      {/* Post type selector */}
      <PostTypeSelector postType={postType} setPostType={setPostType} />

      {/* Conditionally render the form based on the post type selected */}
      {postType === 'question' && <QuestionForm />}
      {postType === 'article' && <ArticleForm />}
    </div>
  );
};

export default PostPage;


