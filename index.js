const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
// Importamos el middleware
const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json()); // Permite leer info enviada por body

// white list
const whiteList = ['http://127.0.0.1:5500'];
const options = {
  origin: (origin,callback)=>{
    if(whiteList.includes(origin) || !origin){
      callback(null,true)
    }else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options)); // habilita a culaquier dominio
app.get('/',(req,res)=>{
  res.send('<h1>Home</h1>')
});

routerApi(app);
// el orden es importante
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=>{
  console.log(' Ejecutando en el puerto', port)
})
