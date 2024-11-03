const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
const productRouter = require("./routers/products.js");
const userRouter = require("./routers/users.js");
const cartRouter = require("./routers/cart.js");

app.use(express.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'product-images')));
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);

app.get("/", function(request, response){
    response.send("Hello World!");
})

app.listen(3000, function() {
    console.log("Started application on port %d", 3000);
});