const fs = require("fs");
const crawler = require("../utils/spider");
const utils = require("../utils/utils");

class GamesController {
  index(req, res) {
    const db = require("../database/data.json");
    const players = utils.listUniquePlayers(db);
    return res.render("games", { games: db, players });
  }

  async store(req, res) {
    crawler.init(req.body.numberpage).then((games) => {
      games.sort((a, b) => {
        return (
          // b.day.substr(0, 2) +
          //   b.day.substr(3, 2) -
          //   (a.day.substr(0, 2) + a.day.substr(3, 2)) &&
          b.hour.substr(0, 2) +
            b.hour.substr(3, 2) -
            (a.hour.substr(0, 2) + a.hour.substr(3, 2))
        );
      });

      games.sort((a, b) => {
        return (
          b.day.substr(0, 2) +
            b.day.substr(3, 2) -
            (a.day.substr(0, 2) + a.day.substr(3, 2))
          // b.hour.substr(0, 2) +
          //   b.hour.substr(3, 2) -
          //   (a.hour.substr(0, 2) + a.hour.substr(3, 2))
        );
      });
      fs.writeFile(
        "src/app/database/data.json",
        JSON.stringify(games),
        (err) => {
          if (err != null) console.error(err);
        }
      );

      // game = 'B Dortmund (Ishking11)'
      //   let a = game.replace(/\s+/g,"").split(/\w+\u0028(\w+)\u0029/)

      const players = utils.listUniquePlayers(games);
      return res.render("games", { games, players });
    });
  }
}

module.exports = new GamesController();
