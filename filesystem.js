("use strict");

import express from "express";
const app = express();
const port = 5200;
import fs from "fs";
import {
  createFile,
  deleteFile,
  readFiles,
  updateFileName,
} from "./fileSystemController.js";

app.use(express.json());

app.get("/folder/uploads", readFiles);

app.post("/file", createFile);

app.put("/file/rename", updateFileName);

app.delete("/file/:filename", deleteFile);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
