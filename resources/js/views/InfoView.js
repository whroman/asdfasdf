"use strict";

class InfoView {

    constructor (game) {
        this.game = game;
    }

    update () {
        const getSel = function (attr) {
            return "[" + attr + "='" + this.game.currentPlayer + "']";
        }.bind(this);

        const domScore = document.querySelectorAll(getSel("data-score"));
        const domRoll1 = document.querySelectorAll(getSel("data-roll-one"));
        const domRoll2 = document.querySelectorAll(getSel("data-roll-two"));
        const domTurns = document.querySelectorAll(getSel("data-turns"));
        const player = this.game.getCurrentPlayer();
        const turn = player.getCurrentTurn();

        const roll1 = turn.rolls[0];
        const roll2 = turn.rolls[1];
        const isStrike = roll1 === 10;
        const isSpare = !isStrike && roll1 + roll2 === 10;

        domScore[0].innerText = player.getScore();
        domRoll1[0].innerText = isStrike ? "X" : roll1 || "-";
        domRoll2[0].innerText = isSpare ? "/" : roll2 || "-";
        domTurns[0].innerText = player.currentTurn + 1 + "/" + player.turns.length;
    }
}

module.exports = InfoView;