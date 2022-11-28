const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("<h1>List of all tasks </h1>");
});

router.get("/:taskId", function (req, res) {
  console.log(req.params);
  // res.send(`You are viewing task with id ${req.params.taskId}`);
  res.render('task', {id:req.params.taskId })
});

router.get("/:taskId/users/:userId", function (req, res) {
  console.log(req.params);
  res.send(`You are viewing task with id ${req.params.taskId}`);
});

module.exports = router;

