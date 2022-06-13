import express from "express";
import fs from "fs";

const UPLOAD_DIR = "./uploads/";

export const readFiles = (req, res) => {
  let folderUploads = fs.readdirSync(UPLOAD_DIR);
  res.send(folderUploads);
};

export const createFile = (req, res) => {
  let body = req.body;

  if (!req.body.name) {
    res.send("te lutem shkruaje nje name per fajllin");
  }
  if (!req.body.ext) {
    res.send("te lutem shkruaje nje extension per fajllin");
  }
  let filename = req.body.name + "." + req.body.ext;

  fs.open(UPLOAD_DIR + filename, "wx", function (err, file) {
    if (err) throw res.send(err);
    res.send("Successful!");
  });
};

export const updateFileName = (req, res) => {
  if (!req.body.name) {
    res.send("te lutem shkruaje emrin e fajllit qe do ta riemrosh");
  }
  if (!req.body.new_name) {
    res.send("te lutem shkruaje emrin e ri te fajllit");
  }
  fs.rename(req.body.name, req.body.new_name, function (err) {
    if (err) throw res.send(err);
    res.send("Successful!");
  });
};

export const deleteFile = (req, res) => {
  // ruajme filename ne nje variabel
  let fileName = req.params.filename;
  // shikojm nese file ne fjale, ekziston
  if (fs.existsSync(fileName)) {
  }
  // nese ekziston, e fshijme
  try {
    fs.unlinkSync(UPLOAD_DIR + fileName);
    res.send(fileName + " u fshi me sukses!");
    //file removed
  } catch (err) {
    res.send("dicka shkoi gabim!");
  }
};
