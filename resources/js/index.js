"use strict";

const Game = require("./stores/Game/Game.js");
const GameView = require("./views/GameView.js");

const game = new Game(1);

document.addEventListener("DOMContentLoaded", function () {
    new GameView(game);
});

