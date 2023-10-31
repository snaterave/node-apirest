function logErrors(err,req,res,next){
  console.log(' primer middleware')
  console.error(err);
  // como el next tiene como parametro err funciona como middleware de manejo de errores
  // sino funcionaria como un middleware normal
  next(err); // llama al siguiente middleware
}

// detecta un error pero crea un formato de devolución
// asi no se use el next de parametro se debe agregar para
// que se detecte es un middleware de tipo error
function errorHandler(err,req,res,next){
  console.log(' segundo middleware')
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err,req,res,next){
   if(err.isBoom){ // Identifica el error tipo Boom
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
   }
   next(err); // si no es error boom ejecuta el errorHandler
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler
}
