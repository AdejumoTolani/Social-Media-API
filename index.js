const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const userRoute = require("./Routes/user");
const authRoute = require("./Routes/auth");
const postRoute = require("./Routes/post");
const conversationRoute = require("./Routes/conversation");
const chatMessageRoute = require("./Routes/chatMessage");
const {
  addUser,
  removeUser,
  getUser,
  getUsers,
} = require("./middleware/socketMiddleware");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const allowedOrigins = ["http://localhost:4200"];
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
  },
});

dotenv.config();

const connectDB = async () => {
  try {
    //
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("connected!");
  } catch (err) {
    console.log(err.message);
  }
};
app.use(cookieParser());
connectDB();
const PORT = process.env.PORT || 5000;

// Use the cors middleware with specific origin configuration
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json());
app.use(helmet());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", chatMessageRoute);

io.on("connection", (socket) => {
  socket.on('login', (user)=>{
    addUser(user, socket.id)
  })


  socket.on("message", (data) => {
    const user = getUser(data.recipient)
    const recipientUser = getUser(data.sender);

    io.to(user.socketId).emit("getMessage", {
      sender:data.sender,
      message:data.message,
    });    

    io.to(recipientUser.socketId).emit("getMessage", {
      sender:data.sender,
      message:data.message,
    });

  });



  socket.on("disconnect", () => {
    console.log("User diconnected", socket.id);
    removeUser(socket.id);
  });
});



server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(getUsers());
});
