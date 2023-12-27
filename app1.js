const express = require('express');
const app = express();
const port = 3000;
const morgon = require('morgan')
const mongoosh = require('mongoose');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

require('dotenv/config');

app.use(cors())
app.options('*',cors())

//routes
const categoryRouter = require('./routers/category')
const productsRouter = require('./routers/products')
const orderRouter = require('./routers/orders')
const userRouter = require('./routers/user')


//Middleware
app.use(express.json());
app.use(morgon('tiny'));
//app.use(authJwt);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler)

//routers
app.use(`/products`,productsRouter)
app.use(`/user`,userRouter)
app.use(`/categories`,categoryRouter)
app.use(`/orders`,orderRouter)


const Product = require('./models/product')
const Category = require('./models/category')
const Orders = require('./models/orders')
const User = require('./models/user')

//database connection
 mongoose.connect(process.env.CS, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//server
app.listen(port,() =>{
    console.log(`app listening on port ${port}`)
})