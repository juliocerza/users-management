require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const privateKey = process.env.SECRET;

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    let token = bearer[1];
    try {
      let decoded = jwt.verify(token, privateKey);
      if (decoded.role == 1) {
        next();
      } else {
        res.status(403).send("You don't permission!");
      }
    } catch (e) {
      res.status(403).send("You don't authenticated!");
    }
  } else {
    res.status(403).send("You don't authenticated!");
  }
};
