const express = require("express");
const mongodb = require("mongodb").MongoClient;
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

const connectionStringURI = `mongodb://localhost:27017/userDB`;

let db;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  }
);
