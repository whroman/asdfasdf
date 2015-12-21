"use strict";

class InfoView {

    constructor (game) {
        this.game = game;
        this.domPlayers = {};
        this.bindDom();
    }

    bindDom () {
        const domRows = document.querySelectorAll(".scoreboard tr[data-player]");
        let domIndex = 0
        for (domIndex; domIndex < domRows.length; domIndex++) {
            const domRow = domRows[domIndex];
            const playerIndex = domRow.getAttribute("data-player");

            this.domPlayers[playerIndex] = {
                row: domRow,
                turns: domRow.children[1],
                roll1: domRow.children[2],
                roll2: domRow.children[3],
                score: domRow.children[4]
            };
        }
    }

    update () {
        let playerIndex;
        for (playerIndex in this.domPlayers) {
            playerIndex = Number(playerIndex);
            const player = this.game.players[playerIndex];
            const turn = player.getCurrentTurn();

            const domPlayer = this.domPlayers[playerIndex];
            const isCurrent  = playerIndex === this.game.currentPlayer;
            if (domPlayer.row) domPlayer.row.className = isCurrent ? "current" : "";

            if (turn) {
                const roll1 = turn.rolls[0];
                const roll2 = turn.rolls[1];
                const isStrike = roll1 === 10;
                const isSpare = !isStrike && roll1 + roll2 === 10;

                domPlayer.turns.innerText = player.currentTurn + 1 + "/" + player.turns.length;
                domPlayer.roll1.innerText = isStrike ? "X" : roll1 || "-";
                domPlayer.roll2.innerText = isSpare ? "/" : roll2 || "-";
                domPlayer.score.innerText = player.getScore();
            }
        }
    }
}

module.exports = InfoView;