var request = require("request");
var cheerio = require("cheerio");
const analyzes = require("./analyzes");

const crawler = {
  gameall: [],
  async init(quantityPage) {
    for (let page = quantityPage; page > 0; page--) {
      let gamespage = await crawler.PromiseRequest(page);

      crawler.gameall.push(...gamespage);
    }
    return this.gameall;
  },

  PromiseRequest(page) {
    return new Promise((resolve, reject) => {
      let games = [];

      try {
        request(
          `https://pt.bsportsfan.com/le/22821/Esoccer-Live-Arena--10-mins-play/p.${page}`,
          function (err, res, body) {
            if (err) console.error(`Error: ${err}`);
            var $ = cheerio.load(body);
            $("tbody tr").each(function () {
              let data = $(this).find("tr td").text();
              data = data.replace(/\s+/g,"")
              let hour = data.substr(5,5)
              let date = data.substr(0,5)
              
              let gamares = data.substr(11, data.length - 14)
              .replace(/\u0029Esportsv|\u0029Esocerv|\u0029Eportsv|\u0029Esoccerv|\u0029v/,"),")
              .replace(/\u0029Esports|\u0029Esocer|\u0029Eports|\u0029Esoccer/,")")
              .split(",")
              let results = data.substr(-3).split("-")
              
              data = {
                day: date,
                hour: hour,
                play1: gamares[0].toLowerCase(),
                play2: gamares[1].toLowerCase(),
                rslplay1: Number(results[0]),
                rslplay2: Number(results[1]),
              };

              analyzes.analysisResult(data);
              analyzes.oneGoalsNegative(data);
              analyzes.oneGoalsPositive(data);
              analyzes.twoGoalsNegative(data);
              analyzes.twoGoalsPositive(data);
              analyzes.threeGoalsNegative(data);
              analyzes.threeGoalsPositive(data);
              games.push(data);
              resolve(games);
            });
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  },
};

module.exports = crawler;
