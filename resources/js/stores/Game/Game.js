"use strict";

const Player = require("./../Player/Player.js");

class Game {
    constructor (numOfTurns) {
        this.numOfTurns = numOfTurns;
        this.reset();
    }

    getCurrentPlayer () {
        return this.players[this.currentPlayer];
    }

    isOver () {
        return this.players[this.players.length - 1].isDone();
    }

    setNextPlayer () {
        this.currentPlayer++;
        if (!this.players[this.currentPlayer]) this.currentPlayer = 0;
    }

    reset () {
        this.players = [
            new Player("One", this.numOfTurns),
            new Player("Two", this.numOfTurns)
        ];
        this.currentPlayer = 0;
    }
}

module.exports = Game;