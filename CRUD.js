("use strict");
const { query } = require("express");
const express = require("express");
const { process_params } = require("express/lib/router");
const app = express();
const port = 5200;
const fs = require("fs");
app.use(express.json());

// get all users
app.get("/users", (req, res) => {
  let data = fs.readFileSync("./data.json");
  data = JSON.parse(data);
  res.send(data);
});

//get user by id
app.get("/users/:id", (req, res) => {
  let data = fs.readFileSync("./data.json");
  data = JSON.parse(data);
  result = data.filter((a) => a.id == req.params.id);
  res.send(result);
});

// create user and save to file

app.post("/users", (req, res) => {
  // lexojme inputin nga body
  let inputParams = req.body;
  // i marrim te gjitha te dhenat nga fajlli
  let data = fs.readFileSync("./data.json");
  data = JSON.parse(data);
  // i shtojme te dhenave te lexuara elementin e ri
  data.push(inputParams);
  // i kthejme perseri ne string
  data = JSON.stringify(data);
  // i ruajme ne file te gjitha te dhenat duke mbishkruar fajllin
  fs.writeFileSync("./data.json", data);
  // i kthejme pergjigje userit qe te dhenat jane ruajtur me sukses
  res.send("Te dhenat u ruajten me sukses");
});

// update user and save to file
app.put("/users/:id", (req, res) => {
  // id e userit qe do ta ndryshojme
  id = req.params.id;
  // lexojme fajllin dhe identifikojme userin ne baze te id-se
  let users = fs.readFileSync("./data.json");
  users = JSON.parse(users);
  users.forEach((user) => {
    if (user.id == id) {
      user.age = req.body.age;
    }
  });
  // i kthejme perseri ne string
  users = JSON.stringify(users);
  // i ruajme ne file te gjitha te dhenat duke mbishkruar fajllin
  fs.writeFileSync("./data.json", users);
  // i kthejme pergjigje userit qe te dhenat jane ruajtur me sukses
  res.send("Te dhenat u ruajten me sukses");
});

// delete user by id from file

app.delete("/users/:id", (req, res) => {
  // id e userit qe do ta ndryshojme
  id = req.params.id;
  // lexojme fajllin dhe identifikojme userin ne baze te id-se
  let users = fs.readFileSync("./data.json");
  users = JSON.parse(users);
  // users.forEach((user) => {
  //   if (user.id == id) {
  //     user.age = req.body.age;
  //   }
  users = users.filter((a) => a.id != id);
  users = JSON.stringify(users);
  // i ruajme ne file te gjitha te dhenat duke mbishkruar fajllin
  fs.writeFileSync("./data.json", users);
  // i kthejme pergjigje userit qe te dhenat jane ruajtur me sukses
  res.send("Te dhenat u ruajten me sukses");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});