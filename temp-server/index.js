const express = require("express");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors("*"));

app.get("/getapps", async (req, res) => {
  try {
    console.log("---Getting App List");
    let appList = fs.readFileSync(path.join(__dirname + "/jsons/v2.json"));
    appList = JSON.parse(appList);
    let list = await Promise.all(
      appList.applist.apps.slice(100, 111).map(async ({ appid }) => {
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
app.get("/game/:sid", async (req, res) => {
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
app.listen(3005, () => console.log("server is run"));
