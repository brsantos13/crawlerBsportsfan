const utils = require('../utils/utils')

class SearchController {
  index(req, res) {
    const db = require('../database/data.json')
    const { player } = req.query
    const players = utils.listUniquePlayers(db)
    
    const games = utils.filterByPlayer(player,db)
    
    return res.render('games',{players, games,playerselected:player})
  }
}

module.exports = new SearchController();
