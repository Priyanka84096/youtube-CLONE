import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Authentication'
import Home from './pages/Home'
import Header from "./pages/Header"
import ChannelPage from './pages/ChannelPage'
import VideoPage from './pages/VideoPage'
import CreateChannel from "./pages/CreateChannel"
import { addAllVideos } from './store/slices/videoSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setIsLoginUsingToken, setUserName } from './store/slices/authSlice'

function App() {

  const dispatch = useDispatch();

  const isLogin = useSelector(state => state.auth.isLogin);

  //this will fetch all the videos from db and push it to the redux videos array
  useEffect(() => {

    const fetchAll = async () => {

      try {

        const videoResult = await axios.get("http://localhost:4000/fetchAllVideos");

        console.log("fetched videos:-", videoResult);

          if (videoResult.status === 200) {

            if(videoResult.data.result.length === 0){

                try{
                      const result = await axios.get("http://localhost:4000/fetchAndPushVideos");
          
                      if(result.status === 200){

                          console.log("videos fetched and pushed to db-- ", result)

                          const fetchingAfterPush = await axios.get("http://localhost:4000/fetchAllVideos");

                          if(fetchingAfterPush.status === 200){
                              dispatch(addAllVideos(fetchingAfterPush.data.result));
                              return console.log("fetch successful");
                          }
                      }

                }catch(error){
                      return console.log("Error fetching and pushing data-- ", error);
                }
            }
            else{
                console.log("video Result--- ", videoResult.data.result)
      
                dispatch(addAllVideos(videoResult.data.result));
                return console.log("fetch successful");
            }
          }
      } catch (error) {
        console.log("Error fetching videos--", error);
      }

    };

    fetchAll();
  }, []);


// to check login status and to set the username in header
  useEffect(() => {
      const isLoginCheck = async () => {
        const loggedInOrNot = await axios.get("http://localhost:4000/islogin", {
          withCredentials: true,
        });

        console.log("loggedInOrNot--", loggedInOrNot);

        if (loggedInOrNot.status === 200) {
          console.log("user is logged in--", loggedInOrNot);
          dispatch(setIsLoginUsingToken(loggedInOrNot.data));

          //setting the username to the top using api & redux
          const user = await axios.get("http://localhost:4000/getUser", {
            withCredentials: true,
          })

          if(user.status === 200){
            dispatch(setUserName(user.data.result.username));
        }

        console.log("current login status-- ", loggedInOrNot);
        return;
      };
    }

      isLoginCheck();
}, []);


return (
   <>

      <BrowserRouter>

        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/videopage/:videoId' element={<VideoPage />}/>
          <Route path='/channelpage/:channelId' element={<ChannelPage/>}/>
          {!isLogin &&  <Route path="/login" element={<Auth />}/>}
          <Route path="/createChannel" element={<CreateChannel />}/>
        </Routes>
      </BrowserRouter>

   </>
  )
}

export default App;