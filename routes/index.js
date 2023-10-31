const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

const router = express.Router();

function routerApi(app){
  app.use('/api/v1',router); // crear una ruta global
    //este será /api/v1/products
    router.use(`/products`, productsRouter);
    router.use(`/users`, usersRouter);
    router.use(`/categories`, categoriesRouter);
}

module.exports = routerApi;
