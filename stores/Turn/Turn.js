"use strict";

class Turn {

    constructor (numOfRolls, numOfPins) {
        this.rolls = [
            // (rollIndex: rollScore)
        ];

        this.pins = [
            // (pinIndex: pinRemains)
        ];

        this.currentRoll = 0;

        while (numOfRolls-- > 0) this.rolls.push(null)
        while (numOfPins-- > 0) this.pins.push(true)
    }

    getRemainingPins () {
        const rPins = this.pins.filter(function (pinRemains) {
            return pinRemains
        });
        return rPins;
    }

    isOver () {
        return this.currentRoll >= this.rolls.length;
    }

    roll (arrayOfPinIds) {
        if (this.rolls[this.currentRoll] === undefined) {
            console.warn("No rolls left in this turn.");
            return this;
        }

        arrayOfPinIds = arrayOfPinIds || [];

        let score = 0;
        arrayOfPinIds.forEach((pinId) => {
            if (this.pins[pinId]) {
                this.pins[pinId] = false;
                score++;
            }
        });

        this.rolls[this.currentRoll] = score;
        this.currentRoll++;

        return this;
    }

}

module.exports = Turn;