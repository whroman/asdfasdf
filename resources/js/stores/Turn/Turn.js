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
        const remainingPins = [];

        this.pins.forEach(function (pinRemains, pinIndex) {
            if (pinRemains) remainingPins.push(pinIndex);
        });
        return remainingPins;
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
            if (!this.pins[pinId]) console.warn("Pin " + pinId + " is already knocked down.");
            this.pins[pinId] = false;
            score++;
        });

        this.rolls[this.currentRoll] = score;
        this.currentRoll++;

        const isStrike = score === this.pins.length;
        if (isStrike) this.currentRoll++;

        return this;
    }

}

module.exports = Turn;