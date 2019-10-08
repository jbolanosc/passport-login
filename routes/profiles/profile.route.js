const router = require('express').Router();

const authCheck = (req, res, next)  => {
   if(!req.user){
      res.send('user not logged');
   }
   else{
      next();
   }

}

router.get('/', (req, res) =>{
   res.send('You are logged as ' + req.user.username); 
})

module.exports = router;