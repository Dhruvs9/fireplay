/* eslint-disable jsx-a11y/anchor-is-valid */
// GameDetails.js
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './GameDetails.css';
import { useLocation } from 'react-router-dom';


function GameDetails() {
  const [project, setProject] = useState(null); // Use a single project, not an array
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const game_id = searchParams.get('game_id');

  useEffect(() => {
    if (game_id) {
      const db = firebase.firestore();
      const imagesRef = db.collection("projects").doc(game_id);

      imagesRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setProject({
            id: doc.id,
            ...data,
          });
        } else {
          // Handle the case where the document doesn't exist
        }
      });
    }
  }, [game_id]);

  return (
    <div className="game-details">
      {project && (
        <>
        <div className="product-card">
          <img className="product-image" src={project.imageUrl} alt={project.imageName} />
          <div className="product-details">
            <h2 className="product-title">{project.imageName}</h2>
            <p className="product-description">{project.imageDescription}</p>
          </div>
        </div>
        <a href=''><button className="product-button">Download</button></a>
        </>
      )}
    </div>
  );
}

export default GameDetails;

