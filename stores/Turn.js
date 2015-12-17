"use strict";

class Turn {

    constructor (numOfRolls, numOfPins) {
        this.rolls = Array(numOfRolls);

        this.pins = {};

        for (numOfPins; numOfPins > 0; numOfPins--) {
            this.pins[numOfPins - 1] = false;
        }
    }

    getRemainingPins () {
        const rPins = [];
        let key;
        for (key in this.pins) {
            const pinRemains = this.pins[key];
            if (!pinRemains) rPins.push(key);
        }
        return rPins;
    }

    roll (arrayOfPinIds) {
        arrayOfPinIds.forEach((pinId) => {
            this.pins[pinId] = true
        });

        return this;
    }

}

module.exports = Turn;