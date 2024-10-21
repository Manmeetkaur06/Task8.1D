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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await handleImageUpload(); // Upload image and get URL

      // Create a new article object
      const newArticle = {
        title,
        abstract,
        articleText,
        tags,
        imageUrl, // Include image URL in the article data
        date: new Date().toISOString(), // Add the current date
      };

      // Add the article to the Firestore 'articles' collection
      await addDoc(collection(firestore, 'articles'), newArticle);
      addArticle(newArticle); // Add article to the context

      // Clear form fields after submission
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags('');
      setImage(null);

      alert('Article posted successfully!');
    } catch (error) {
      console.error('Error posting article:', error);
      alert('Error posting article.');
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
