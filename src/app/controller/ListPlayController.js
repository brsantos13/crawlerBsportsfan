const analyzes = require("../utils/analyzes");
const utils = require('../utils/utils')

class ListPlayController {
  index(req, res) {
    const db = require("../database/data.json");
    let { name } = req.params;
    name = name.trim();

    let gamesfilter = db.filter((game) => {
      if (/\u0028(\w+)\u0029/.test(name)) {
        return (
          game.play1.trim() == name.trim() || game.play2.trim() == name.trim()
        );
      } else {
        const condicao = new RegExp(`${name}`);
        return condicao.test(game.play1) || condicao.test(game.play2);
      }
    });

    gamesfilter = gamesfilter.map((game) => {
      game.play1 = game.play1.trim();
      game.play2 = game.play2.trim();
      game.play1name = utils.formattedPlayerTeamAsPlayer(game.play1)
      game.play2name = utils.formattedPlayerTeamAsPlayer(game.play2)
      return game;
    });

    const totvictory = analyzes.quantityVictory(name, gamesfilter);
    const totdefeat = analyzes.quantityDefeat(name, gamesfilter);
    const tottie = analyzes.quantityTie(name, gamesfilter);
    const totonegoalsposit = analyzes.quantityOneGoalsPosit(name, gamesfilter);
    const tottwogoalsposit = analyzes.quantityTwoGoalsPosit(name, gamesfilter);
    const totthreegoalsposit = analyzes.quantityThreeGoalsPosit(
      name,
      gamesfilter
    );
    const totonegoalsneg = analyzes.quantityOneGoalsNeg(name, gamesfilter);
    const tottwogoalsneg = analyzes.quantityTwoGoalsNeg(name, gamesfilter);
    const totthreegoalsneg = analyzes.quantityThreeGoalsNeg(name, gamesfilter);
    const totaveragegoalsmatch = analyzes.averageGoalsMatch(name, db);

    return res.render("show", {
      games: gamesfilter,
      totvictory: totvictory,
      totdefeat: totdefeat,
      tottie: tottie,
      totonegoalsposit: totonegoalsposit,
      tottwogoalsposit: tottwogoalsposit,
      totthreegoalsposit: totthreegoalsposit,
      totonegoalsneg: totonegoalsneg,
      tottwogoalsneg: tottwogoalsneg,
      totthreegoalsneg: totthreegoalsneg,
      totaveragegoalsmatch: totaveragegoalsmatch,
      name,
    });
  }
}

module.exports = new ListPlayController();
