const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.urlencoded({extended:true}));
    this.server.use(express.static("public"));
    this.server.set("view engine", "njk");
    nunjucks.configure("src/app/views", {
      express: this.server,
      autoescape: false,
      noCache: true,
    });
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
