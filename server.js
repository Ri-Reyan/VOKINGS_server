import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import Database from "./src/db/Database.js";

const port = process.env.PORT || 4000;

const server = http.createServer(app);

Database();

server.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});

export default server;
