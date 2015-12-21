"use strict";

const Game = require("./stores/Game/Game.js");
const GameView = require("./views/GameView.js");

const game = new Game(10);

document.addEventListener("DOMContentLoaded", function () {
    new GameView(game);
});

