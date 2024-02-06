require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const router = require("./routes/routes");
const PORT = process.env.PORT || 8686;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
