import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  return (
    <div className="border rounded-md p-2">
      <Link to={`/video/${video.videoId}`}>
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-40 object-cover rounded-md mb-2" />
        <h3 className="text-lg font-semibold">{video.title}</h3>
        <p className="text-gray-600">{video.channelName}</p>
        <p className="text-gray-500">{video.views} views</p>
      </Link>
    </div>
  );
}

export default VideoCard;