const express = require('express')
http = require('http') .Server(express);
var port =   5000
io = require( 'socket.io')(http, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  });;
  const app = express();
  var onlineUsers= [];
  io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });
io. on ('connection', function(socket) {
//console. log ('A user connected' );
socket.on("user_connected", (newUserId) => {
    if (!onlineUsers.some((user) => user.userId === newUserId)) {  
      // if user is not added before
      onlineUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("new user is here!", onlineUsers);
    }
    // send all active users to new user
   // console.log(onlineUsers)
  });
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    console.log("user disconnected", onlineUsers);
    // send all online users to all users
 //   console.log(onlineUsers)
  });
  
});
app.listen(port, () => console.log(`Server started on PORT:${PORT}`))
/*http. listen(port,function() {
console. log (`listening on *: PORT:${port}`);
});*/
