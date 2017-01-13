import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer'

export default function (props) {


  const album = props.selectedAlbum


  return (
    <div>
      <div className="album-header">
        <h4>{album.artist}</h4>
        <h5>{album.title}</h5>
      </div>
      <div className="album-body">
        <ul className="song-list">
          {
            album.songs && album.songs.map(song => (
              <li>{song}</li>
            ))
          }
        </ul>
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
