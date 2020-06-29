class utils {
  listUniquePlayersByTeam(games) {
    const list = [];
    games.forEach((game) => {
      if (list.indexOf(game.play1) == -1) {
        list.push(game.play1);
      }
      if (list.indexOf(game.play2) == -1) {
        list.push(game.play2);
      }
    });

    return list;
  }

  listUniquePlayers(games) {
    const playersByTeam = this.listUniquePlayersByTeam(games);
    const players = [];
    playersByTeam.forEach((playerByTeam) => {
      let player = this.formattedPlayerTeamAsPlayer(playerByTeam)
      if (players.indexOf(player) == -1) {
        players.push(player);
      }
    });
    return players;
  }

  filterByPlayer(player, games) {
    const condicao = new RegExp(`${player}`)
    const gamesfilter = games.filter((game) => {
      return condicao.test(game.play1) || condicao.test(game.play2);
    });
    return gamesfilter
  }

  formattedPlayerTeamAsPlayer(PlayerTeam){
    let player = PlayerTeam
        .replace(/\s+/g, "")
        .split(/\w+\u0028(\w+)\u0029/);
    player = player[1];
    return player
  }
}

module.exports = new utils();
