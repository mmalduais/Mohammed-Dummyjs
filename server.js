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



server.get("/product/:p_id?", (req, response) => {
    if (req.params.p_id) {
        console.log("Start  With Params "+req.params.p_id);
        fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price,rating,discountPercentage,thumbnail')
            .then(res1 => res1.json())
            .then(r1 => {
                fetch('https://dummyjson.com/products/categories')
                    .then(r2 => r2.json())
                    .then(r2 => {

                        fetch('https://dummyjson.com/products/' + req.params.p_id)
                            .then(res2 => res2.json())
                            .then(r3 => response.render('product-detail', { Product: r3, Categories: r2 }))
                    })
            });

            console.log("End  With Params ");

    }
    else{
        console.log("Start  Without Params ");
        fetch('https://dummyjson.com/products/categories')
        .then(r2 => r2.json())
        .then(r2 => {
            fetch('https://dummyjson.com/products?select=title,price,rating,discountPercentage,thumbnail')
                .then(res => res.json())
                .then(res => response.render('product', { Products: res.products, Categories: r2.splice(0,8) }))
        });
    }

})




server.get("/cart", (req, res) => {
    res.render('cart');
})

server.get("/contact", (req, res) => {
    res.render('contact');
})