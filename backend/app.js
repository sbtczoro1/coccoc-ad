const express = require("express");
const cors = require("cors");
const { PORT } = require("./configs/env");
const authRoute = require("./authen/routes/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => console.log("backend listening on port", PORT));
