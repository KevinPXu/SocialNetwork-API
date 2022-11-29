const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

//port variable containing the port value
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//connects using the connection config file we exported and listens on that port
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});
