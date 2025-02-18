import { useState, useEffect } from 'react';
import Header from '../components/Header';
import VideoList from '../components/VideoList';

const sampleVideos = [
    { "videoId": "video01", "title": "Learn React in 30 Minutes", "thumbnailUrl":
    "https://i.ytimg.com/vi/Tn6PIQfg3DY/maxresdefault.jpg", "description": "A quick tutorial to get started with React.", "channelId": "channel01", "uploader": "user01", "views": 15200, "likes": 1023,
    "dislikes": 45, "uploadDate": "2024-09-20", "channelName": "FreeCodeCamp", "comments": [ { "commentId": "comment01", "userId":
    "user02", "text": "Great video! Very helpful.", "timestamp": "2024-09-21T08:30:00Z" } ] },
    { "videoId": "video02", "title": "Learn Javascript in 1 Hour", "thumbnailUrl":
    "https://i.ytimg.com/vi/GpAKQno8kec/maxresdefault.jpg", "description": "A quick tutorial to get started with Javascript.", "channelId": "channel02", "uploader": "user02", "views": 15200, "likes": 1023,
    "dislikes": 45, "uploadDate": "2024-09-20", "channelName": "freeCodeCamp.org", "comments": [ { "commentId": "comment02", "userId":
    "user03", "text": "Awesome video! I learned very quickly.", "timestamp": "2024-09-21T08:30:00Z" } ] }
  ];

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Replace with API call to fetch videos from backend
    setVideos(sampleVideos);
  }, []);

  return (
    <div>
      <Header />
      <main className="p-4">
        <VideoList videos={videos} />
      </main>
    </div>
  );
}

export default Home;