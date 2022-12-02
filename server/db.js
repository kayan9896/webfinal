const mdb = require("mongodb");
require("dotenv").config();

const c = new mdb.MongoClient(process.env.url);
module.exports.connectdb = async () => {
  try {
    await c.connect();
    console.log("connected");
  } catch (e) {
    console.log(e);
  }
};
module.exports.addtodb = async (n1) => {
  try {
    const dat = await c.db("game").collection("mini").insertOne(n1);
    console.log(dat.insertedId);
  } catch (e) {
    console.log(e);
  }
};
module.exports.readdb = async () => {
  try {
    const dat = await c.db("game").collection("mini").find();
    //console.log(dat);
    return dat.toArray();
  } catch (e) {
    console.log(e);
  }
};
module.exports.getone = async (n) => {
  try {
    const dat = await c
      .db("game")
      .collection("mini")
      .findOne({ _id: mdb.ObjectId(n) });
    //console.log(mdb.ObjectId(n));
    return dat;
  } catch (e) {
    console.log(e);
  }
};
module.exports.updatedb = async (gameId, pair) => {
  try {
    const dat = await c
      .db("game")
      .collection("mini")
      .updateMany({ _id: mdb.ObjectId(gameId) }, { $set: pair });
    console.log(`${dat.matchedCount}  matched.`);
    console.log(`${dat.modifiedCount}  updated.`);
  } catch (e) {
    console.log(e);
  }
};
module.exports.deletedb = async (n) => {
  try {
    const dat = await c
      .db("game")
      .collection("mini")
      .deleteOne({ _id: mdb.ObjectId(n) });
    console.log(`${dat.deletedCount}  matched.`);
  } catch (e) {
    console.log(e);
  }
};

module.exports.addcmtodb = async (n1) => {
  try {
    return c.db("game").collection("cm").insertOne(n1);
    // console.log(dat.insertedId);
  } catch (e) {
    console.log(e);
  }
};
module.exports.readcmdb = async () => {
  try {
    const dat = await c.db("game").collection("cm").find();
    //console.log(dat);
    return dat.toArray();
  } catch (e) {
    console.log(e);
  }
};
module.exports.getonecm = async (cId) => {
  try {
    const dat = await c.db("game").collection("cm").findOne({ commentId: cId });
    //console.log(mdb.ObjectId(n));
    return dat;
  } catch (e) {
    console.log(e);
  }
};
module.exports.getusercm = async (usrId) => {
  try {
    const dat = await c.db("game").collection("cm").find({ userId: usrId }).toArray();
    //console.log(mdb.ObjectId(n));
    return dat;
  } catch (e) {
    console.log(e);
  }
};

module.exports.getPostComments = async (n) => {
  try {
    const dat = await c
      .db("game")
      .collection("cm")
      .find({ gameId: n })
      .toArray();
    //console.log(mdb.ObjectId(n));
    return dat;
  } catch (e) {
    console.log(e);
  }
};

module.exports.updatecmdb = async (commentId, pair) => {
  try {
    const dat = await c
      .db("game")
      .collection("cm")
      .updateOne({ commentId }, { $set: pair });
    console.log(`${dat.matchedCount}  matched.`);
    console.log(`${dat.modifiedCount}  updated.`);
  } catch (e) {
    console.log(e);
  }
};
module.exports.deletecmdb = async (cId) => {
  try {
    const dat = await c
      .db("game")
      .collection("cm")
      .deleteOne({ commentId: cId });
    console.log(`${dat.deletedCount}  matched.`);
  } catch (e) {
    console.log(e);
  }
};
