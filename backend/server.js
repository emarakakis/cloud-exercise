const express = require("express");
const app = express()
const userRouter = require("./routers/users.js");

//app.use(express.json())

app.use('/users', userRouter);

app.get("/", function(request, response){
    response.send("Hello World!");
})

app.listen(3000, function() {
    console.log("Started application on port %d", 3000);
});