const utils = require("../utils/utils");
const analyzes = require("../utils/analyzes");

class RankController {
  index(req, res) {
    const db = require("../database/data.json");
    let listPlayers = ""
    const { order } = req.body;
    const condicao = /team/
    if (condicao.test(order)) {
      listPlayers = utils.listUniquePlayersByTeam(db);
    }else{
      listPlayers = utils.listUniquePlayers(db)
    }
    listPlayers = listPlayers.map((player) => {
      
      const quantityvictory = analyzes.quantityVictory(player, db);
      const percentegevictory = analyzes.analyzePercentage(player,quantityvictory, db);

      const quantitydefeat = analyzes.quantityDefeat(player, db);
      const percentegedefeat = analyzes.analyzePercentage(player,quantitydefeat, db);

      const quantitytie = analyzes.quantityTie(player, db);
      const percentegetie = analyzes.analyzePercentage(player,quantitytie, db);

      const averagegoalsmatch = analyzes.averageGoalsMatch(player, db);

      return {
        name: player,
        quantityvictory,
        quantitydefeat,
        quantitytie,
        averagegoalsmatch,
        percentegevictory,
        percentegedefeat,
        percentegetie,
      };
    });
    

    listPlayers = listPlayers.sort((a, b) => {
      if (/quantityvictory/.test(order)) {
        return b.percentegevictory - a.percentegevictory;
      }
      if (/quantitydefeat/.test(order)) {
        return b.percentegedefeat - a.percentegedefeat;
      }
      if (/quantitytie/.test(order)) {
        return b.percentegetie - a.percentegetie;
      }
      if (/averagegoalsmatch/.test(order)) {
        return b.averagegoalsmatch - a.averagegoalsmatch;
      }
    });

    return res.render("rank", { listPlayers,order});
  }
}

module.exports = new RankController();
