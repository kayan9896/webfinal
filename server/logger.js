let version = 2.6;

function log() {
  console.log("logged");
}
// console.log(module)
module.exports = {
  logFunction: log,
  versionVar: version,
};