// VideoPlayer.js
import React from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css"; // Import the default styles
const VideoPlayer = ({ source, image }) => {
  return (
    <Player poster={image}>
      <source src={source} />
    </Player>
  );
};

export default VideoPlayer;
