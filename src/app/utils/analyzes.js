const utils = require("../utils/utils");

class analyzes {
  analysisResult(game) {
    if (game.rslplay1 > game.rslplay2) {
      game.victoryplay1 = true;
      game.victoryplay2 = false;
      game.tied = false;
    }
    if (game.rslplay2 > game.rslplay1) {
      game.victoryplay2 = true;
      game.victoryplay1 = false;
      game.tied = false;
    }
    if (game.rslplay1 == game.rslplay2) {
      game.victoryplay2 = false;
      game.victoryplay1 = false;
      game.tied = true;
    }
    return;
  }

  oneGoalsPositive(game) {
    if (game.rslplay1 > game.rslplay2 && game.rslplay1 >= 1) {
      game.onegoalspositplay1 = true;
      game.onegoalspositplay2 = false;
    }
    if (game.rslplay2 > game.rslplay1 && game.rslplay2 >= 1) {
      game.onegoalspositplay2 = true;
      game.onegoalspositplay1 = false;
    }
    return;
  }

  twoGoalsPositive(game) {
    if (game.rslplay1 > game.rslplay2 && game.rslplay1 >= 2) {
      game.twogoalspositplay1 = true;
      game.twogoalspositplay2 = false;
    }
    if (game.rslplay2 > game.rslplay1 && game.rslplay2 >= 2) {
      game.twogoalspositplay2 = true;
      game.twogoalspositplay1 = false;
    }
    return;
  }

  threeGoalsPositive(game) {
    if (game.rslplay1 > game.rslplay2 && game.rslplay1 >= 3) {
      game.threegoalspositplay1 = true;
      game.threegoalspositplay2 = false;
    }
    if (game.rslplay2 > game.rslplay1 && game.rslplay2 >= 3) {
      game.threegoalspositplay2 = true;
      game.threegoalspositplay1 = false;
    }
    return;
  }

  oneGoalsNegative(game) {
    if (game.rslplay1 < game.rslplay2 && game.rslplay2 >= 1) {
      game.onegoalsnegplay1 = true;
      game.onegoalsnegplay2 = false;
    }
    if (game.rslplay2 < game.rslplay1 && game.rslplay1 >= 1) {
      game.onegoalsnegplay2 = true;
      game.onegoalsnegplay1 = false;
    }
    return;
  }

  twoGoalsNegative(game) {
    if (game.rslplay1 < game.rslplay2 && game.rslplay2 >= 2) {
      game.twogoalsnegplay1 = true;
      game.twogoalsnegplay2 = false;
    }
    if (game.rslplay2 < game.rslplay1 && game.rslplay1 >= 2) {
      game.twogoalsnegplay2 = true;
      game.twogoalsnegplay1 = false;
    }
    return;
  }

  threeGoalsNegative(game) {
    if (game.rslplay1 < game.rslplay2 && game.rslplay2 >= 3) {
      game.threegoalsnegplay1 = true;
      game.threegoalsnegplay2 = false;
    }
    if (game.rslplay2 < game.rslplay1 && game.rslplay1 >= 3) {
      game.threegoalsnegplay2 = true;
      game.threegoalsnegplay1 = false;
    }
    return;
  }

  quantityVictory(play, games) {
    let totVictory = Number(0);

    if (/\u0028(\w+)\u0029/.test(play)) {
      for (const game of games) {
        if (game.play1.trim() == play.trim() && game.victoryplay1 == true)
          totVictory += 1;
        if (game.play2.trim() == play.trim() && game.victoryplay2 == true)
          totVictory += 1;
      }
    } else {
      const condicao = new RegExp(`${play}`);
      for (const game of games) {
        if (
          condicao.test(game.play1.replace(/\s+/g, "")) &&
          game.victoryplay1 == true
        )
          totVictory += 1;
        if (
          condicao.test(game.play2.replace(/\s+/g, "")) &&
          game.victoryplay2 == true
        )
          totVictory += 1;
      }
    }

    return totVictory;
  }

  quantityDefeat(play, games) {
    let totDefeat = Number(0);

    if (/\u0028(\w+)\u0029/.test(play)) {
      for (const game of games) {
        if (
          game.play1.trim() == play.trim() &&
          game.victoryplay1 == false &&
          game.tied == false
        )
          totDefeat += 1;
        if (
          game.play2.trim() == play.trim() &&
          game.victoryplay2 == false &&
          game.tied == false
        )
          totDefeat += 1;
      }
    } else {
      const condicao = new RegExp(`${play}`);
      for (const game of games) {
        if (
          condicao.test(game.play1) &&
          game.victoryplay1 == false &&
          game.tied == false
        )
          totDefeat += 1;
        if (
          condicao.test(game.play2) &&
          game.victoryplay2 == false &&
          game.tied == false
        )
          totDefeat += 1;
      }
    }

    return totDefeat;
  }

  quantityTie(play, games) {
    let totTie = Number(0);

    if (/\u0028(\w+)\u0029/.test(play)) {
      for (const game of games) {
        if (game.play1.trim() == play.trim() && game.tied == true) totTie += 1;
        if (game.play2.trim() == play.trim() && game.tied == true) totTie += 1;
      }
    } else {
      const condicao = new RegExp(`${play}`);
      for (const game of games) {
        if (condicao.test(game.play1) && game.tied == true) totTie += 1;
        if (condicao.test(game.play2) && game.tied == true) totTie += 1;
      }
    }

    return totTie;
  }

  quantityOneGoalsNeg(play, games) {
    let totOneGoalsNeg = Number(0);

    if (/\u0028(\w+)\u0029/.test(play)) {
      for (const game of games) {
        if (game.play1.trim() == play.trim() && game.onegoalsnegplay1 == true)
          totOneGoalsNeg += 1;
        if (game.play2.trim() == play.trim() && game.onegoalsnegplay2 == true)
          totOneGoalsNeg += 1;
      }
    } else {
      const condicao = new RegExp(`${play}`);
      for (const game of games) {
        if (condicao.test(game.play1) && game.onegoalsnegplay1 == true)
          totOneGoalsNeg += 1;
        if (condicao.test(game.play2) && game.onegoalsnegplay2 == true)
          totOneGoalsNeg += 1;
      }
    }

    return totOneGoalsNeg;
  }

  quantityTwoGoalsNeg(play, games) {
    let totTwoGoalsNeg = Number(0);

    if (/\u0028(\w+)\u0029/.test(play)) {
      for (const game of games) {
        if (game.play1.trim() == play.trim() && game.twogoalsnegplay1 == true)
          totTwoGoalsNeg += 1;
        if (game.play2.trim() == play.trim() && game.twogoalsnegplay2 == true)
          totTwoGoalsNeg += 1;
      }
    } else {
      const condicao = new RegExp(`${play}`);
      for (const game of games) {
        if (condicao.test(game.play1) && game.twogoalsnegplay1 == true)
          totTwoGoalsNeg += 1;
        if (condicao.test(game.play2) && game.twogoalsnegplay2 == true)
          totTwoGoalsNeg += 1;
      }
    }

    return totTwoGoalsNeg;
  }

  quantityThreeGoalsNeg(play, games) {
    let totThreeGoalsNeg = Number(0);

    if (/\u0028(\w+)\u0029/.test(play)) {
      for (const game of games) {
        if (game.play1.trim() == play.trim() && game.threegoalsnegplay1 == true)
          totThreeGoalsNeg += 1;
        if (game.play2.trim() == play.trim() && game.threegoalsnegplay2 == true)
          totThreeGoalsNeg += 1;
      }
    } else {
      const condicao = new RegExp(`${play}`);
      for (const game of games) {
        if (condicao.test(game.play1) && game.threegoalsnegplay1 == true)
          totThreeGoalsNeg += 1;
        if (condicao.test(game.play2) && game.threegoalsnegplay2 == true)
          totThreeGoalsNeg += 1;
      }
    }

    return totThreeGoalsNeg;
  }

  quantityOneGoalsPosit(play, games) {
    let totOneGoalsPosit = Number(0);

    if (/\u0028(\w+)\u0029/.test(play)) {
      for (const game of games) {
        if (game.play1.trim() == play.trim() && game.onegoalspositplay1 == true)
          totOneGoalsPosit += 1;
        if (game.play2.trim() == play.trim() && game.onegoalspositplay2 == true)
          totOneGoalsPosit += 1;
      }
    } else {
      const condicao = new RegExp(`${play}`);
      for (const game of games) {
        if (condicao.test(game.play1) && game.onegoalspositplay1 == true)
          totOneGoalsPosit += 1;
        if (condicao.test(game.play2) && game.onegoalspositplay2 == true)
          totOneGoalsPosit += 1;
      }
    }

    return totOneGoalsPosit;
  }

  quantityTwoGoalsPosit(play, games) {
    let totTwoGoalsPosit = Number(0);

    if (/\u0028(\w+)\u0029/.test(play)) {
      for (const game of games) {
        if (game.play1.trim() == play.trim() && game.twogoalspositplay1 == true)
          totTwoGoalsPosit += 1;
        if (game.play2.trim() == play.trim() && game.twogoalspositplay2 == true)
          totTwoGoalsPosit += 1;
      }
    } else {
      const condicao = new RegExp(`${play}`);
      for (const game of games) {
        if (condicao.test(game.play1) && game.twogoalspositplay1 == true)
          totTwoGoalsPosit += 1;
        if (condicao.test(game.play2) && game.twogoalspositplay2 == true)
          totTwoGoalsPosit += 1;
      }
    }

    return totTwoGoalsPosit;
  }

  quantityThreeGoalsPosit(play, games) {
    let totThreeGoalsPosit = Number(0);

    if (/\u0028(\w+)\u0029/.test(play)) {
      for (const game of games) {
        if (
          game.play1.trim() == play.trim() &&
          game.threegoalspositplay1 == true
        )
          totThreeGoalsPosit += 1;
        if (
          game.play2.trim() == play.trim() &&
          game.threegoalspositplay2 == true
        )
          totThreeGoalsPosit += 1;
      }
    } else {
      const condicao = new RegExp(`${play}`);
      for (const game of games) {
        if (condicao.test(game.play1) && game.threegoalspositplay1 == true)
          totThreeGoalsPosit += 1;
        if (condicao.test(game.play2) && game.threegoalspositplay2 == true)
          totThreeGoalsPosit += 1;
      }
    }

    return totThreeGoalsPosit;
  }

  averageGoalsMatch(play, games) {
    let totAverageGoalsMatch = 0;

    if (/\u0028(\w+)\u0029/.test(play)) {
      let gamesfilter = games.filter((game) => {
        return game.play1.trim() == play.trim() || game.play2.trim() == play.trim();
      });


      gamesfilter.forEach((game) => {
        totAverageGoalsMatch += game.rslplay1 + game.rslplay2;
      });

      totAverageGoalsMatch = totAverageGoalsMatch / gamesfilter.length;
      
    } else {

      const condicao = new RegExp(`${play}`);
      let gamesfilter = games.filter((game) => {
        return condicao.test(game.play1) || condicao.test(game.play2);
      });
      gamesfilter.forEach((game) => {
        totAverageGoalsMatch += game.rslplay1 + game.rslplay2;
      });

      totAverageGoalsMatch = totAverageGoalsMatch / gamesfilter.length;
    }

    return totAverageGoalsMatch;
  }

  analyzePercentage(play,quantity,db){
    let porcentage = "";

    if (/\u0028(\w+)\u0029/.test(play)) {
      let gamesfilter = db.filter((game) => {
        return game.play1.trim() == play.trim() || game.play2.trim() == play.trim();
      });

    porcentage = quantity/gamesfilter.length
      
    } else {

      const condicao = new RegExp(`${play}`);
      let gamesfilter = db.filter((game) => {
        return condicao.test(game.play1) || condicao.test(game.play2);
      });
      porcentage = quantity/gamesfilter.length

    }

    return porcentage;
    
  }
}

module.exports = new analyzes();
