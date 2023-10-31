const boom = require('@hapi/boom');

function validatorHandler(schema,property){
  // clausure = funcion autoejecutable, su patron es parecido a una clase
  return (req,res,next) =>{ // clausure para crear middleware de forma dinámica
    // property == body,params,query
    // de esa manera de trabaja dinamicamente con los parametrops
    const data = req[property];
    // abortEarly: false ; manda todos los errores
    const {error} = schema.validate(data, {abortEarly: false});

    if(error){
      next(boom.badRequest(error));
    }

    next(); // si no hay error sigue tu camino
  }
}

module.exports = validatorHandler;
