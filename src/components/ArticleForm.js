import React, { useState, useContext } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { PostContext } from '../context/PostContext';
import { firestore, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './Form.css';

const ArticleForm = () => {
  const { addArticle } = useContext(PostContext); // Use PostContext to add a new article
  // State to manage form fields and image
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  // Handle image upload to Firebase storage
  const handleImageUpload = async () => {
    if (!image) return null; // Return if no image is uploaded

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Handle the image upload process
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Error uploading image:', error);
          reject(error); // Handle upload errors
        },
        async () => {
          // Get the download URL after successful upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL); // Resolve the promise with the image URL
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation for required fields
    if (!title || !abstract || !articleText) {
      alert('Please fill in all required fields.');
      return;
    }
  
    try {
      const imageUrl = await handleImageUpload() || null; // Handle image upload, allow null if no image
  
      const newArticle = {
        title,
        abstract,
        articleText,
        tags,
        imageUrl,  // Include image URL, even if null
        date: new Date().toISOString(),
      };
  
      // Add the article to Firestore
      await addDoc(collection(firestore, 'articles'), newArticle);
      addArticle(newArticle); // Update context
  
      // Clear form fields
      setTitle('');
      setImage(null);
      setAbstract('');
      setArticleText('');
      setTags('');
      
  
      alert('Article posted successfully!');
    } catch (error) {
      console.error('Error posting article:', error.message);  // Log more specific error message
      alert(`Error posting article: ${error.message}`);  // Show a more detailed error alert
    }
  };
  

  return (
    <Form onSubmit={handleSubmit} className="article-form">
      <Header as="h4" className="form-header">Post an Article</Header>

      {/* Title field */}
      <Form.Field>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title"
        />
      </Form.Field>

      {/* Image upload field */}
      <Form.Field>
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Field>

      {/* Abstract field */}
      <Form.Field>
        <label>Abstract</label>
        <Form.TextArea
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="Enter a 1-paragraph abstract"
        />
      </Form.Field>

      {/* Article text field */}
      <Form.Field>
        <label>Article Text</label>
        <Form.TextArea
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          placeholder="Write your article text here..."
        />
      </Form.Field>

      {/* Tags field */}
      <Form.Field>
        <label>Tags</label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Add tags (e.g., Java, React)"
        />
      </Form.Field>

      {/* Submit button */}
      <div className="submit-button-container">
        <Form.Button type="submit" className="submit-button">Post</Form.Button>
      </div>
    </Form>
  );
};

export default ArticleForm;
