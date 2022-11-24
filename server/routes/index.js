var express = require('express');
var router = express.Router();
const { addtodb,readdb,getone,deletedb,updatedb } = require("../db");
const { body, validationResult } = require('express-validator');
const axios = require("axios");
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

router.get("/getapps", async (req, res) => {
  try {
    console.log("---Getting App List");
    let appList = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json');
    console.log(appList.data);
    
    let rd=Math.random() * 10000
    let list = await Promise.all(
      appList.data.applist.apps.slice(rd, rd+20).map(async ({ appid }) => {
        let { data } = await axios.get(
          `https://store.steampowered.com/api/appdetails?appids=${appid}`
        );
        if (data[`${appid}`].success) {
          const { name, steam_appid, header_image } = data[`${appid}`].data;
          return { name, steam_appid, header_image };
        }
      })
    );
    list = list.filter(Boolean);
    res.send({ ok: true, list });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});
router.get("/game/:sid", async (req, res) => {
  try {
    console.log("---Getting App Details");
    const { sid } = req.params;
    let { data } = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${sid}`
    );
    if (data[`${sid}`].success) {
      const {
        name,
        is_free,
        header_image,
        detailed_description,
        pc_requirements,
        price_overview,
        genres,
        categories,
        release_date,
        screenshots,
      } = data[`${sid}`].data;

      res.send({
        ok: true,
        details: {
          name,
          is_free,
          header_image,
          detailed_description,
          pc_requirements,
          price_overview,
          genres,
          categories,
          release_date,
          screenshots,
        },
      });
    }
  } catch (error) {
    res.statusCode(500);
  }
});
module.exports = router;
