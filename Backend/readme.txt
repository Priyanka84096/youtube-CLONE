Backend is created using MVC architecture,

ROUTES contains only one file user.js which contains all the routes of comment, videos, aunthentication, like-dislike, search videos, youtube api routes and more.

MODEL contains- Channel, Comment, User and Video schemas, which has appropriate relation with each other,

Used grid fs to store the video file in small parts in the database, when uploaded from the channel page.

CONTROLLER- contains all the controller functions of channel, comment, user and video routes.

MIDDLEWARE- contains only one function to protect some specific routes, based on if the user is logged in or not.

Implemendted JWT using auth.js in the SERVICES folder which createsthe jsonwebtoken once the user gets loggedin

INDEX.js file is the main file which initializes the express.js, mongodb, & global middlewares like cookie-parser, express.json(), cors more others, 
which is required for the initialization and processing and uploading videos and images in the backend using database.

