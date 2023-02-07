const express = require('express');
const { adminRoutes, orderRoutes, productRoutes, userRoutes, verificationRoutes } = require('./routes');
const mongoose = require('mongoose');
const { auth, admin, verified } = require('./middlewares');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }))


app.use('/products', productRoutes);
app.use('/orders', auth,  orderRoutes);
app.use('/user', userRoutes);
app.use('/verify', verificationRoutes);
app.use('/admin', auth, admin, verified, adminRoutes);

const dbUrl = process.env.DB_CONNECTION;
console.log(dbUrl);
mongoose.connect(dbUrl)
    .then((result) => { 
        console.log('connected')
        app.listen(5001, () => console.log('listening') );
    })
    .catch((error) => { console.log(error) })


