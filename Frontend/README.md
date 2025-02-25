This is a youtube clone project- 

I have implemented all the pages and component inside of the pages folder 

added redux for global state management,
lucid react for icons 
react toastify to add toast notification.

on the first render the videos from youtube gets fetched and pushed to database which takes some time,
to load the home page, once the home page is loaded all the videos gets displayed on the screen.

In the Header there is a youtube logo which works as a home button, a search bar which works only on the home page 
& a sign in button which changes to user button, when the user gets logged in.

In the sign in page we can create a new account and login once the account is created.

on clicking the user button in the header we get the channel name if available otherwise we get the create channel button
which opens the create channel page, in which user can add their channel

on clicking any video on the home page, we get redirected to the video page and which has a video player,
where user can add, edit and delete comment from a particular video, also user can like and dislike the video.

