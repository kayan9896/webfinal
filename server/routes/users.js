var express = require('express');
var router = express.Router();

const { addcmtodb,readcmdb,getonecm,deletecmdb,updatecmdb } = require("../db");
const { body, validationResult } = require('express-validator');
const axios = require("axios");

router.get('/listall', async function(req, res, next) {
  try{
    const dt=await readcmdb();
    //console.log(dt);
    res.json(dt);
    
  }catch(e){
    console.log(e);
  }
});
router.get('/:gameId', async function(req, res, next) {
  try{
    const dt=await getonecm(req.params.gameId);
    //console.log(dt);
    res.json(dt);
    
  }catch(e){
    console.log(e);
  }
});

router.get('/delete/:gameId',async function(req,res){
  try{
    await deletecmdb(req.params.gameId);
    res.redirect('/');
  }catch(e){
    console.log(e)
  }
})
router.get('/update/:gameId',async function(req,res){
  try{
    const dt=await getonecm(req.params.gameId);
    //console.log(dt);
    res.json(dt);
  }catch(e){
    console.log(e)
  }
})
router.post('/update/:gameId',
  body('Comment').isLength({ min: 1 }),
  
  async function(req,res){
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {return res.status(400).json({ errors: errors.array() });}
    try{
      //console.log(req.body)
      await updatecmdb(req.params.gameId,req.body);
      res.redirect('/'+`${req.params.gameId}`);}
    catch(e){
      console.log(e);
    }
})
router.post('/',async function(req,res){
  try{
    //console.log(req.body)
    await addcmtodb(req.body);
    res.redirect('/');}
  catch(e){
    console.log(e);
  }
})

module.exports = router;
