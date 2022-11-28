// const fs = require("fs");

// fs.writeFile("message.txt", "Hello!", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     fs.readFile("message.txt", { encoding: "utf-8" }, function (err, data) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//       }
//     });
//   }
// });

// const logger = require('./logger.js');
// // console.log(logger)
// logger.logFunction();
// console.log(logger.versionVar)
const express = require("express");
const router = require('./routes/tasks');

const app = express();
const port = 3000;
app.set("views", "views");
app.set("view engine", "pug")
app.use(express.static('public'));
app.use('/api/tasks', router)

app.get("/", function (req, res) {
  res.send("hello world");
});


app.listen(port, () => {
  console.log(`application is listening on port ${port}`);
});