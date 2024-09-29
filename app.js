const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/Users.js')
const childRouter = require('./routes/Child')
const errorHandler = require('./error/ErrorHandlerMiddleware');
//Importing dependency for accessing env variables
require("dotenv").config()
const port = process.env.PORT || 3000


//Connect to Database
mongoose.connect(process.env.DB_CONNECTION_URI);

mongoose.connection.on("error", (error) => {
    console.error("Error connecting to database:", error.message);
});

mongoose.connection.on("connected", () => {
    console.log("DB connection established successfully");
});

//define the routes
app.use(`/${process.env.CONTEXT_PATH}`,userRouter)
app.use(`/${process.env.CONTEXT_PATH}`,childRouter) 


// Error handling middleware
app.use(errorHandler);

app.listen(port,() =>{
    console.log("Auth Server is running on port 3000")
})