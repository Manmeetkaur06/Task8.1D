import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase'; 

// Create the PostContext to share question-related data across components
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]); // State to hold the list of questions
  const [articles, setArticles] = useState([]); // State to hold the list of articles

  // Fetch all questions from Firestore
  const fetchQuestions = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'questions')); // Get all documents in the 'questions' collection
    const fetchedQuestions = querySnapshot.docs.map(doc => ({
      id: doc.id, // Assign document ID to the question
      ...doc.data(), // Spread the document data into the question object
    }));
    setQuestions(fetchedQuestions); // Update the state with the fetched questions
  };

  // Fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Add a new question to Firestore and refresh the question list
  const addQuestion = async (question) => {
    await addDoc(collection(firestore, 'questions'), question); // Add the new question to the Firestore 'questions' collection
    fetchQuestions(); // Re-fetch the questions to reflect the new addition
  };

  // Delete a question from Firestore and refresh the question list
  const deleteQuestionFromFirestore = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'questions', id)); // Delete the document with the specified ID from the 'questions' collection
      fetchQuestions(); // Re-fetch the questions to reflect the deletion
    } catch (error) {
      console.error('Error deleting document:', error); // Log any errors during deletion
    }
  };

  // Function to add article to Firestore and update local state
  const addArticle = async (newArticle) => {
    await addDoc(collection(firestore, 'articles'), newArticle); // Add to Firestore
    setArticles((prevArticles) => [...prevArticles, newArticle]); // Update local state
  };

  return (
    // Provide the questions state, addQuestion, and deleteQuestionFromFirestore functions to child components
    <PostContext.Provider value={{ questions, setQuestions, addQuestion, deleteQuestionFromFirestore, articles, addArticle }}>
      {children}
    </PostContext.Provider>
  );
};

  
