import config from "./config/index.js";
import express from "express";
import routes from "./routes/index.js";
const app = new express();

app.use(routes);

app.get("/", (_, res) => {
  res.send("Hello from pic server");
});

app.listen(config.PORT, () => {
  console.log(`Server started running on Port: ${config.PORT}`);
});
