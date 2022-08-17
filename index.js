const express = require("express");
const app = express();
const port = 3000;
require("./database/database.js");
const cors = require("cors");
const userRoutes = require("./routers/users");
const matchesRoutes = require("./routers/matches");
const footballTeamRoutes = require("./routers/footballTeam");
const matchesActionsRoutes = require("./routers/matchesActions");
const playerMatchesRoutes = require("./routers/playerMatches");
const playersRoutes = require("./routers/players");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/matches", matchesRoutes);

app.use("/api/footballTeam", footballTeamRoutes);

app.use("/api/matchesActions", matchesActionsRoutes);

app.use("/api/playerMatches", playerMatchesRoutes);

app.use("/api/players", playersRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
