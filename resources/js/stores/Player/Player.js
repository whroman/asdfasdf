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

    getCurrentTurn () {
        return this.turns[this.currentTurn];
    }

    isDone () {
        return this.currentTurn >= this.turns.length;
    }


    roll (arrayOfPinIds) {
        if (this.isDone()) {
            console.warn("Player " + this.name + " has no moves left");
            return;
        }
        // Roll
        const turn = this.getCurrentTurn();
        turn.roll(arrayOfPinIds);

        // Handle results of Roll
        if (turn.isOver()) this.currentTurn++;

    }

    randomRoll () {
        const pins = this.getCurrentTurn().getRemainingPins();
        let toHit = [];

        pins.forEach((val) => {
            const hit = Math.floor(Math.random() * 2);
            if (hit === 0) {
                toHit.push(val);
            }
        });

        this.roll(toHit);

        return this;
    }

    getScore () {
        let score = 0;
        let lastRoll = 0;
        let lastLastRoll = 0;

        const turns = this.turns.slice(0).reverse();
        turns.forEach((turn) => {
            const roll1 = turn.rolls[0];
            const rawScore = roll1 + turn.rolls[1];
            let fullScore = rawScore

            const isStrike = roll1 === turn.pins.length;
            const isSpare = rawScore === turn.pins.length;

            if (isStrike) {
                fullScore += lastRoll + lastLastRoll;
                lastLastRoll = lastRoll;
                lastRoll = turn.pins.length;
            } else {
                if (isSpare) {
                    fullScore += lastRoll;
                }
                lastLastRoll = lastRoll;
                lastRoll = roll1;
            }

            score += fullScore;
        });

        return score;
    }

}

module.exports = Player;