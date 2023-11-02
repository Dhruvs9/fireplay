import firebase from "firebase";
import React, { useState, useEffect } from 'react';
import './Upload.css'
import 'firebase/auth';
// import { Storage } from firebase;
// import { ref } from './firebase/storage';

function Upload() {
  const [imageName, setImageName] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); 
      } else {

      }
    });
    return () => {
      unsubscribe(); 
    };
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( userId, imageName, imageDescription );
    try {
      // Get a reference to the Firestore database
      const db = firebase.firestore();
      const storage = firebase.storage();

      const imageRef = storage.ref().child(imageFile.name);
      await imageRef.put(imageFile);
      
      const imageUrl = await imageRef.getDownloadURL();
    

      await db.collection("projects").add({
        userId,
        imageName,
        imageDescription,
        imageUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
      console.log('Data saved to Firebase Firestore.');
    } catch (error) {
      console.error('Error saving data to Firebase Firestore: ', error);
    }
  };
  
  // Inside your Upload component
return (
  <div className="upload-container">
    <h2>Image Details Form</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="imageFile"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
      </div>
      <div>
        <label htmlFor="imageName">Image Name</label>
        <input
          type="text"
          id="imageName"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="imageDescription">Image Description</label>
        <textarea
          id="imageDescription"
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
);

  
  
}

export default Upload;
