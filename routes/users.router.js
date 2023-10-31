const express = require('express');
const router = express.Router();

// /users?limit=valor&offset=valor
router.get('/',(req,res)=>{
  const { limit, offset } = req.query;

  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else{
    res.send(' no existen los parámetros ...')
  }

});

module.exports = router;
