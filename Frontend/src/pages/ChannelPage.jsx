import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';  // Import axios instance
import VideoCard from '../components/VideoCard'; // Import VideoCard Component

function ChannelPage() {
  const { id } = useParams(); // Channel ID from the route
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchChannelData() {
      try {
        // Fetch channel details
        const channelResponse = await axios.get(`/channels/${id}`);
        setChannel(channelResponse.data);

        // Fetch videos for the channel
        const videosResponse = await axios.get(`/channels/${id}/videos`); // Adjust endpoint if needed
        setVideos(videosResponse.data);
      } catch (error) {
        console.error("Error fetching channel data:", error);
        // Handle error appropriately
      }
    }

    fetchChannelData();
  }, [id]);

  if (!channel) {
    return <div>Loading channel...</div>;  // Or display a loading spinner
  }

  return (
    <div className="container mx-auto mt-8">
      {/* Channel Banner and Details */}
      <div className="relative h-48 bg-gray-200 mb-4 rounded-md overflow-hidden">
        {channel.channelBanner && (
          <img
            src={channel.channelBanner}
            alt="Channel Banner"
            className="absolute w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-gray-900 to-transparent text-white">
          <h1 className="text-2xl font-bold">{channel.channelName}</h1>
          <p className="text-sm">{channel.description}</p>
        </div>
      </div>

      {/* Video List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default ChannelPage;