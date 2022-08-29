require("dotenv").config();
const http = require("http");
const { createApp } = require("./app");

const app = createApp();
const server = http.createServer(app);

const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database initiate fail");
  });

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

server.listen(10010, () => {
  console.log(`server start : http://localhost:10010`);
});
