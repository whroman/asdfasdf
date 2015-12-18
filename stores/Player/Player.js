"use strict";
var Turn = require("./../Turn/Turn.js");

class Player {

    constructor (name, numOfTurns) {
        this.name = name;

        this.turns = [
            // turnId: Turn
        ];

        this.currentTurn = 0;

        while (numOfTurns-- > 0) {
            const turn = new Turn(2, 10);
            this.turns.push(turn);
        }

    }

    roll (arrayOfPinIds) {
        const turn = this.turns[this.currentTurn]
        turn.roll(arrayOfPinIds);
        if (turn.isOver()) this.currentTurn++;
    }

    getScore () {
        let score = 0;

        this.turns.forEach((turn) => {
            turn.rolls.forEach((rollScore) => {
                score += rollScore;
            });
        });

        return score;
    }

}

module.exports = Player;