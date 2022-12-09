var express = require("express");
var router = express.Router();
const { addtodb, readdb, getone, deletedb, updatedb } = require("../db");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const dt = await readdb();
    res.render("index", { results: dt });
  } catch (e) {
    console.log(e);
  }
});
router.get("/api/listall", async function (req, res, next) {
  try {
    const dt = await readdb();
    //console.log(dt);
    res.json(dt);
  } catch (e) {
    console.log(e);
  }
});
router.get("/api/json/:gameId", async function (req, res, next) {
  try {
    const dt = await getone(req.params.gameId);
    //console.log(dt);
    res.json(dt);
  } catch (e) {
    console.log(e);
  }
});
router.get("/api/:gameId", async function (req, res, next) {
  try {
    const dt = await getone(req.params.gameId);
    //console.log(dt);
    res.render("showone", { info: dt });
  } catch (e) {
    console.log(e);
  }
});
router.get("/api/delete/:gameId", async function (req, res) {
  try {
    await deletedb(req.params.gameId);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});
router.get("/api/update/:gameId", async function (req, res) {
  try {
    const dt = await getone(req.params.gameId);
    //console.log(dt);
    res.render("update", { info: dt });
  } catch (e) {
    console.log(e);
  }
});
router.post(
  "/api/update/:gameId",
  body("Game").isLength({ min: 1 }),
  body("Gamelink").isLength({ min: 1 }),
  body("Description").isLength({ min: 1 }),
  body("Instructions").isLength({ min: 1 }),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //console.log(req.body)
      await updatedb(req.params.gameId, req.body);
      res.redirect("/api/" + `${req.params.gameId}`);
    } catch (e) {
      console.log(e);
    }
  }
);
router.post("/", async function (req, res) {
  try {
    //console.log(req.body)
    await addtodb(req.body);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

router.get("/getapps", async (req, res) => {
  try {
    console.log("---Getting App List");
    let appList = await axios.get(
      "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json",
      {
        headers: {
          "Accept-Encoding": "application/json",
        },
      }
    );
    // let appList = fs.readFileSync(path.join(__dirname + "/../jsons/v2.json"));
    // appList = JSON.parse(appList);
    // console.log( appList.applist.apps[100]);
    // appList
    //let rd=Math.random() * 100000
    let list = await Promise.all(
      appList.data.applist.apps.slice(10000, 10022).map(async ({ appid }) => {
        let { data } = await axios.get(
          `https://gamewebsite.onrender.com/api/appdetails?appids=${appid}`
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
    console.log(error.message);
    res.send("error");
  }
});
router.get("/game/:sid", async (req, res) => {
  try {
    console.log("---Getting App Details");
    const { sid } = req.params;
    console.log("send detail request");
    let { data } = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${sid}`
    );
    console.log("request answered");
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
          gameId: sid,
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
