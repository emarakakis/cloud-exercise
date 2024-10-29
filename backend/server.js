const express = require("express");
const app = express()
const cors = require('cors')
const userRouter = require("./routers/users.js");
const productRouter = require("./routers/products.js");

app.use(express.json())
app.use(cors());

app.use('/users', userRouter);
app.use('/products', productRouter);

app.get("/", function(request, response){
    response.send("Hello World!");
})

app.listen(3000, function() {
    console.log("Started application on port %d", 3000);
});