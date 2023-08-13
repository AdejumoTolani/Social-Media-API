const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const userRoute = require('./Routes/user');
const authRoute = require('./Routes/auth');
const postRoute = require('./Routes/post')



dotenv.config();

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL);
}
connectDB();
const  PORT = process.env.PORT || 5000;
//middleware
app.use(express.json());
app.use(helmet());

app.use('/api/users', userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
