// ImageList.js
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './ProjectList.css';
import { Link } from 'react-router-dom';

function ProjectList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase Firestore
    const db = firebase.firestore();

    // Assuming you have a collection named "images"
    const imagesRef = db.collection('projects');

    imagesRef.onSnapshot((snapshot) => {
      const imageList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        imageList.push({
          id: doc.id,
          ...data,
        });
      });

      setImages(imageList);
    });
  }, []);

  return (
    <div>
      <ul className='projects home_row'>
        {images.map((image) => (
          <li className='project' key={image.id}>
            <Link to={`/game?game_id=${image.id}`}>
              <img src={image.imageUrl} alt={image.imageName} />
            </Link>
            <strong>{image.imageName}</strong>
            <div>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
            </div>
            <p className='project_info'>{image.imageDescription}</p>

          </li>
        ))}
      </ul>
    </div>

  );
}

export default ProjectList;
