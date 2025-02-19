import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Header from "./pages/Header"
import { addAllVideos } from './store/slices/videoSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
// import { setIsLoginUsingToken, setUserName } from './store/slices/authSlice'

function App() {

  const dispatch = useDispatch();

  // const isLogin = useSelector(state => state.auth.isLogin);

  //this will fetch all the videos from db and push it to the redux videos array
  useEffect(() => {

    const fetchAll = async () => {
      try {
        const result = await axios.get("http://localhost:4000/fetchAllVideos");

        console.log("fetched videos:-", result);

        if (result.status === 200) {
          dispatch(addAllVideos(result.data.result));
          return console.log("fetch successful");
        }
      } catch (error) {
        console.log("Error fetching videos--", error);
      }

    };

    fetchAll();
  }, []);


// //to check login status
//   useEffect(() => {
//       const isLoginCheck = async () => {
//         const waitForMe = await axios.get("http://localhost:4000/islogin", {
//           withCredentials: true,
//         });

//         console.log("waitForMe--", waitForMe);

//         if (waitForMe.status === 200) {
//           console.log("user is logged in--", waitForMe);
//           dispatch(setIsLoginUsingToken(waitForMe.data));

//           //setting the username to the top using api & redux
//           const user = await axios.get("http://localhost:4000/getUser", {
//             withCredentials: true,
//           })

//           if(user.status === 200){
//             dispatch(setUserName(user.data.result.username));
//         }

//         console.log("current login status-- ", waitForMe);
//         return;
//       };
//     }

//       isLoginCheck();
//     }, []);


  return (
   <>

      <BrowserRouter>

        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/videopage/:videoId' element={<VideoPage />}/>
          <Route path='/channelpage/:channelId' element={<ChannelPage/>}/>
          {!isLogin &&  <Route path="/login" element={<Auth />}/>}
          <Route path="/createChannel" element={<CreateChannel />}/> */}
        </Routes>
      </BrowserRouter>

   </>
  )
}

export default App;