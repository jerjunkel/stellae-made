import config from "./config/index.js";
import express from "express";

const app = new express();

app.get("/", (_, res) => {
  res.send("Hello from pic server");
});

app.listen(config.PORT, () => {
  console.log(`Server started running on Port: ${config.PORT}`);
});
