var express = require('express');
var router = express.Router();
const { addtodb,readdb,getone,deletedb,updatedb } = require("../db");
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const dt=await readdb();
    res.render('index',{results:dt})
  }catch(e){
    console.log(e);
  }
});
router.get('/api/listall', async function(req, res, next) {
  try{
    const dt=await readdb();
    //console.log(dt);
    res.json(dt);
    
  }catch(e){
    console.log(e);
  }
});
router.get('/api/:gameId', async function(req, res, next) {
  try{
    const dt=await getone(req.params.gameId);
    //console.log(dt);
    res.render('showone',{info:dt});
    
  }catch(e){
    console.log(e);
  }
});
router.get('/api/delete/:gameId',async function(req,res){
  try{
    await deletedb(req.params.gameId);
    res.redirect('/');
  }catch(e){
    console.log(e)
  }
})
router.get('/api/update/:gameId',async function(req,res){
  try{
    const dt=await getone(req.params.gameId);
    //console.log(dt);
    res.render('update',{info:dt});
  }catch(e){
    console.log(e)
  }
})
router.post('/api/update/:gameId',
  body('Game').isLength({ min: 1 }),
  body('Gamelink').isLength({ min: 1 }),
  body('Description').isLength({ min: 1 }),
  body('Instructions').isLength({ min: 1 }),
  async function(req,res){
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {return res.status(400).json({ errors: errors.array() });}
    try{
      //console.log(req.body)
      await updatedb(req.params.gameId,req.body);
      res.redirect('/api/'+`${req.params.gameId}`);}
    catch(e){
      console.log(e);
    }
})
router.post('/',async function(req,res){
  try{
    //console.log(req.body)
    await addtodb(req.body);
    res.redirect('/');}
  catch(e){
    console.log(e);
  }
})

module.exports = router;
