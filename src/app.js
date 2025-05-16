const express = require("express");
const routes = require("./routes/routes");

const app = express();
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 81;
app.listen(port, () => {
  console.log(`Firebase Server is running on port ${port}`);
});