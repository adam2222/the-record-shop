import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer'

export default function (props) {

  const album = props.selectedAlbum

  return (
    <div>
      <div className="album-header">
        <div className="album-logos">
          <img className="image-responsive" src={album.image_front}/>
          <img className="image-responsive" src={album.image_back}/>
        </div>
        <h4>{album.title} <em>({album.release_year})</em></h4>
        <h5>{album.artist}</h5>
      </div>
      <div className="album-body">
        <div className="desc">
          {album.description}
        </div>
        {/* Add add to cart button, cost, album reviews, rating, quantity available */}
      </div>
    </div>
  )
}

// <div>
//   <div className="album-header">
//     <h1>An Album Title</h1>
//     <h2>A Band Name</h2>
//   </div>
//   <div className="album-body">
//     <div className="song-list">
//       <ul>
//         <li></li>
//       </ul>
//     </div>
