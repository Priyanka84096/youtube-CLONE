import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios'; // Import Axios instance
import VideoPlayer from '../components/VideoPlayer';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';

function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchVideo() {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`/videos/${id}`);
        setVideo(response.data);
        setComments(response.data.comments || []); // Initialize comments
      } catch (error) {
        console.error("Error fetching video:", error);
        // Handle error appropriately (e.g., display an error message)
      }
    }

    fetchVideo();
  }, [id]);

  const handleCommentSubmit = async (newCommentText) => {
    try {
      const response = await axios.post(`/comments/video/${id}`, { text: newCommentText });
      const newComment = response.data; // Backend should return the newly created comment
      setComments([...comments, newComment]);
    } catch (error) {
      console.error("Error submitting comment:", error);
      // Handle error
    }
  };

  const handleCommentUpdate = async (commentId, updatedText) => {
    try {
        await axios.put(`/comments/${commentId}`, { text: updatedText });
        // Update the comment in the local state
        setComments(comments.map(comment =>
            comment._id === commentId ? { ...comment, text: updatedText } : comment
        ));
    } catch (error) {
        console.error("Error updating comment:", error);
    }
};

  const handleCommentDelete = async (commentId) => {
    try {
        await axios.delete(`/comments/${commentId}`);
        // Remove the comment from the local state
        setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
};

  if (!video) {
    return <div>Loading...</div>; // Or display a loading spinner
  }

  return (
    <div className="container mx-auto mt-8">
      <VideoPlayer videoUrl={video.videoUrl} title={video.title} />

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
        <p className="text-gray-600">{video.description}</p>
        <p className="text-gray-500 mt-2">Channel: {video.channelName}</p>
      </div>

      {/* Comment Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Comments</h3>
        <CommentForm onSubmit={handleCommentSubmit} />
        {comments.map(comment => (
          <Comment
            key={comment._id}
            comment={comment}
            onUpdate={handleCommentUpdate}
            onDelete={handleCommentDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoPage;