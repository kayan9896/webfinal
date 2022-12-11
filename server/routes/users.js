var express = require("express");
var router = express.Router();
const { uid } = require("uid");

const {
  addcmtodb,
  readcmdb,
  getoneuser,
  registeruser,
  updateuser,
  getonecm,
  deletecmdb,
  updatecmdb,
  getusercm,
  getPostComments,
  buyGame,
} = require("../db");
const { body, validationResult } = require("express-validator");
const axios = require("axios");

router.get("/listall", async function (req, res, next) {
  try {
    const dt = await readcmdb();
    //console.log(dt);
    res.json(dt);
  } catch (e) {
    console.log(e);
  }
});
router.get('/user/:userId', async function(req,res,next){
	try{
		const dt = await getoneuser(req.params.userId);
		res.json(dt);
	}catch (e) {
		console.log(e);
	}
});
router.post('/user/:userId/update', async function(req,res,next){
	try {
		const { userId, username } = req.body;
		try {
		  const insertResult = await updateuser({
			userId,
			username,
		  });
		  updatecmdb(req.params.cId, { nickname: req.body.username });
		  res.status(201).send({ ok: insertResult.acknowledged });
		} catch (error) { }
		// res.redirect("/");
	  } catch (e) {
		console.log(e);
	  }
	});
router.get("/comments/:gameId", async function (req, res, next) {
  try {
    // const dt = await getonecm(req.params.gameId);
    const dt = await getPostComments(req.params.gameId);
    //console.log(dt);
    res.json(dt);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/comments/delete/:cId", async function (req, res) {
  try {
    await deletecmdb(req.params.cId);
    // res.redirect("/");
    res.send({ ok: true });
  } catch (e) {
    console.log(e);
  }
});
router.get("/comments/usercm/:usrId", async function (req, res) {
  try {
    const dt = await getusercm(req.params.usrId);
    console.log(dt);
    res.json(dt);
  } catch (e) {
    console.log(e);
  }
});
router.post(
  "/update/:cId",
  body("Comment").isLength({ min: 1 }),

  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const comment = await getonecm(req.params.cId);
      if (comment.userId !== req.body.userId) {
        return res.status(403);
      }
      //console.log(req.body)
      await updatecmdb(req.params.cId, { Comment: req.body.Comment });
      // res.redirect("/" + `${req.params.gameId}`);
      res.send({ ok: true });
    } catch (e) {
      console.log(e);
    }
  }
);
router.post("/new", async function (req, res) {
  try {
    //console.log(req.body)
    const { Comment, userId, gameId, nickname, gname } = req.body;

    try {
      const insertResult = await addcmtodb({
        Comment,
        userId,
        gameId,
        nickname,
        gname,
        commentId: uid(5),
        createDate: new Date(),
      });
      res.status(201).send({ ok: insertResult.acknowledged });
    } catch (error) { }
    // res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

router.post("/buy", async (req, res) => {
  try {
    const dbr = await buyGame(req.body.gameId, req.body.email);
    res.send({ ok: dbr.acknowledged });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
