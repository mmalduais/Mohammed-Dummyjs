import express from 'express';
import fetch from 'node-fetch';
const server = express();

const PORT = process.env.PORT || 5000;
server.set('view engine', 'ejs');
server.use(express.static('Assets'));
server.set('views', 'View');

server.listen(PORT, console.log(`Server started on port ${PORT}`));


server.get("/", (req, res) => {
    res.render('index');
})

server.get("/home", (req, res) => {
    res.render('index');
    
})

server.get('/cart',(req,response)=>{
    fetch('https://dummyjson.com/carts/2')
.then(res => res.json())
.then(res => response.render('cart', { Carts: res.products }))
})


server.get('/product',(res,response)=>{
  
    fetch('https://dummyjson.com/products')
.then(res => res.json())
// .then(console.log);
.then(res => response.render('product', { Products: res.products }))


})


server.get("/products?:p_id", (req, response) => {
    if (!req.query.p_id) {
        fetch('https://dummyjson.com/products?select=title,price,rating,discountPercentage,thumbnail')
            .then(res => res.json())
            .then(res => response.render('product', { Products: res.products }))
    } else {

        fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price,rating,discountPercentage,thumbnail')
            .then(res => res.json())
            .then(r => {
                fetch('https://dummyjson.com/products/' + req.query.p_id)
                    .then(res => res.json())
                    .then(res => response.render('product-details', { Product: res, Products: r.products }))
            })

    }
})



server.get("/product", (req, res) => {
    res.render('product');
})
server.get("/product-details", (req, res) => {
    res.render('product-details');
})

server.get("/cart", (req, res) => {
    res.render('cart');
})

server.get("/contact", (req, res) => {
    res.render('contact');
})