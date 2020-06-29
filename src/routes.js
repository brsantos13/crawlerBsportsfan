const { Router } = require("express");
const ListPlayController = require("./app/controller/ListPlayController");
const RankController = require("./app/controller/RankController");
const GamesController = require("./app/controller/GamesController");
const SearchController = require("./app/controller/SearchController");

const routes = new Router();

routes.get("/", (req, res) => {
  res.render("index");
});

routes.get("/list/games", GamesController.index);

routes.post("/list/create", GamesController.store);

routes.get("/show/:name", ListPlayController.index);

routes.get("/rank", (req, res) => {
  return res.render("rank");
});

routes.post("/rank/order", RankController.index);

routes.get('/search',SearchController.index)

module.exports = routes;
