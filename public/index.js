var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var readline = require("readline-sync");
const analyzes = require("./analyzes");

const spider = {
  init() {
    
    const games = [];
    var quantityPage =  document.querySelector(".numberPage"); //Number(readline.question("Digite a quantidade de paginas que quer pegar: "))
    fs.unlink(`./results.txt`, (err) => {
      if (err) {
        console.log("Houve algum erro!", err);
      } else {
        console.log("Arquivo removido!");
      }
    });

    for (let page = quantityPage; page > 0; page--) {
      request(
        `https://pt.bsportsfan.com/le/22821/Esoccer-Live-Arena--10-mins-play/p.${page}`,
        function (err, res, body) {
          if (err) console.error(`Error: ${err}`);
          var $ = cheerio.load(body);
          $("tbody tr").each(function () {
            var date = $(this).find("tr .dt_n ").text().trim();
            if (date == "") date = "--/-- --:--";
            date = date.replace(" ", ",");
            var game = $(this).find("tr td a").text();
            game = game
              .replace("Esports", ",")
              .replace("Esports", ",")
              .replace("          ", "")
              .replace("-", ",")
              .replace("        ", "");
            let data = `${date},${game}`;
            data = data.split(",");
            data = {
              day: data[0],
              hour: data[1],
              play1: data[2],
              play2: data[3],
              rslplay1: Number(data[4]),
              rslplay2: Number(data[5]),
            };
            analyzes.analysisResult(data);
            analyzes.oneGoalsNegative(data);
            analyzes.oneGoalsPositive(data);
            analyzes.twoGoalsNegative(data);
            analyzes.twoGoalsPositive(data);
            analyzes.threeGoalsNegative(data);
            analyzes.twoGoalsPositive(data);
            games.push(data);

            fs.appendFile(
              "results.txt",
              `${data.day},${data.hour},${data.play1},${data.play2},${
                data.rslplay1
              },${data.rslplay2},${data.victoryplay1 || false},${
                data.victoryplay2 || false
              },${data.tied || false},${data.onegoalspositplay1 || false},${
                data.onegoalspositplay2 || false
              },${data.twogoalspositplay1 || false},${
                data.twogoalspositplay2 || false
              },${data.threegoalspositplay1 || false},${
                data.threegoalspositplay2 || false
              },${data.onegoalsnegplay1 || false},${
                data.onegoalsnegplay2 || false
              },${data.twogoalsnegplay1 || false},${
                data.twogoalsnegplay2 || false
              },${data.threegoalsnegplay1 || false},${
                data.threegoalsnegplay2 || false
              },\n`,
              function (err) {
                if (err) console.error(err);
                // if no error
                console.log("Data adicionado com sucesso!");
              }
            );
          });
        }
      );
    }
  },
};
