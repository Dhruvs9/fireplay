import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './Projects.css';

function Projects() {
  const [ProjectList, setImages] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase Firestore
    const db = firebase.firestore();

    const userId = firebase.auth().currentUser.uid;

    const imagesRef = db.collection("projects").where("userId", "==", userId);

    imagesRef.onSnapshot((snapshot) => {
      const ProjectList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        ProjectList.push({
          id: doc.id,
          ...data,
        });
      });

      setImages(ProjectList);
    });
  }, []);

  return (
    <div className="projects-container">
      <h2>Your Projects</h2>
      <ul>
        {ProjectList.map((image) => (
          <li key={image.id} className="project-card">
            <img className="project-image" src={image.imageUrl} alt={image.imageName} />
            <strong className="project-title">{image.imageName}</strong>
            <p className="project-description">{image.imageDescription}</p>
          </li>
        ))}
      </ul>
      {/* Add Guidelines for Game Uploading */}
      <div className="upload-guidelines">
        <h3>Guidelines for Game Uploading</h3>
        <p>1. Ensure your game image is in a supported format (e.g., PNG, JPEG).</p>
        <p>2. Provide a clear and descriptive game name.</p>
        <p>3. Include a short game description to help users understand your game.</p>
        <p>4. Make sure your game content complies with our community guidelines.</p>
        <p>5. Add Firebase SDK to your games.</p>
        <p>6. It takes 15 days for us to review your game.</p>
        <p>7. Firebase analytics key is required for analytics.</p>  
      </div>
    </div>
  );
}

export default Projects;


