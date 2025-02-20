import React, { useRef } from "react";
import { CircleUserRound } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const channelNameRef = useRef();
  const descRef = useRef();
  const navigate = useNavigate();

  //creating a new channel
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("files value---", e.target[0].files);

    const base64 = await convertToBase64(e.target[0].files[0]);

    console.log("base64---",base64);

    const addChannel = await axios.post("http://localhost:4000/createChannel", {
      channelId: Math.floor(Math.random() * 1000000000),
      channelName: channelNameRef.current.value,
      channelBanner: base64,
      description: descRef.current.value,
      subscribers: 0,
    }, {
      withCredentials: true
    });

    console.log("addChannel result--", addChannel);

    if(addChannel.status === 200){
      console.log("channel created successfully");
      navigate("/");
      channelNameRef.current.value = "";
      descRef.current.value = "";
    }
  };

  return (
    <>
      <div className="p-20 screen-max-7:pt-44 top-16 left-0 w-full h-full flex justify-center bg-gradient-to-br from-gray-900 to-gray-800">
  <div className="flex flex-col w-full items-center justify-center h-screen px-4">
    
    <div className="w-full max-w-2xl screen-max-7:w-full screen-max-7:px-4 screen-max-7:py-6 bg-gray-850 rounded-xl shadow-2xl p-8 border border-gray-750">
      <h2 className="text-2xl screen-max-7:text-xl screen-max-4:text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-6 text-center">
        Create Your Channel
      </h2>

     
      <form
        className="flex flex-col space-y-6"
        onSubmit={handleSubmit}
      >
    
      <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 screen-max-7:w-24 screen-max-7:h-24 rounded-full bg-gray-750 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-600 hover:border-purple-400 transition-all duration-300">
            <CircleUserRound className="text-gray-400 h-20 w-20 screen-max-7:h-16 screen-max-7:w-16" />
            <input
              id="picture"
              type="file"
              accept="image/*"
              className="absolute text-gray-500 inset-0 w-full h-full opacity-0 cursor-pointer"
              required
            />
          </div>
          <label
            htmlFor="picture"
            className="mt-3 text-sm screen-max-7:text-xs text-gray-400 hover:text-purple-400 cursor-pointer transition-all duration-300"
          >
            Upload Profile Picture
          </label>
        </div>

       
        <div className="flex flex-col space-y-2">
          <label className="text-sm screen-max-7:text-xs font-medium text-gray-400">Channel Name</label>
          <input
            placeholder="Enter your channel name"
            className="bg-gray-750 text-gray-500 rounded-lg p-3 screen-max-7:p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            type="text"
            ref={channelNameRef}
            required
          />
        </div>

       
        <div className="flex flex-col space-y-2">
          <label className="text-sm screen-max-7:text-xs font-medium text-gray-400">About Channel</label>
          <textarea
            placeholder="Describe your channel"
            className="bg-gray-750 text-gray-500 rounded-lg p-3 screen-max-7:p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            rows="4"
            ref={descRef}
          ></textarea>
        </div>
    
        <button
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 screen-max-7:py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
          type="submit"
        >
          Create Channel
        </button>
      </form>
    </div>
  </div>
</div>
    </>
  );
};

export default CreateChannel;

//saving the image in base64 format
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}