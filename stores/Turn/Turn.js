"use strict";

class Turn {

    constructor (numOfRolls, numOfPins) {
        this.rolls = Array(numOfRolls);

        this.currentRoll = 0;

        this.pins = [
            // (pinIndex: pinRemains)
        ];
        while (numOfPins-- > 0) this.pins.push(true)
    }

    getRemainingPins () {
        const rPins = this.pins.filter(function (pinRemains) {
            return pinRemains
        });
        return rPins;
    }

    roll (arrayOfPinIds) {
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