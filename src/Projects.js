

// ProjectList.js
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './Projects.css'


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
    </div>
    
  );
}

export default Projects;
