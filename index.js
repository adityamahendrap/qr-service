require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const readQrImageFromUrl = require("./read.js");
const writeQrImageThenUploadToExternalService = require("./write.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/read", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("url query is required");
  const result = await readQrImageFromUrl(url);
  console.log("result: ", result);
  res.status(200).send(result);
  return;
});

app.get("/write", async (req, res) => {
  const string = req.query.string;
  if (!string) return res.status(400).send("string query is required");
  const result = await writeQrImageThenUploadToExternalService(string);
  res.status(200).send(result);
  return;
});

app.listen(5000, () => {
  console.log("Server is running http://localhost:5000");
});