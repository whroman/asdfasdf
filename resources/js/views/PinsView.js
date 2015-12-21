"use strict";

class PinsView {

    constructor (game) {
        this.game = game;

        this.bindDomPins();
    }

    bindDomPins () {
        const sel = ".pin";
        this.domPins = Array(10);
        const domPins = Array.prototype.slice.call(document.querySelectorAll(sel));
        domPins.forEach((domPin) => {
            const key = domPin.getAttribute("data-id");
            this.domPins[key] = domPin;
        });
    }

    update () {
        const isUpClass = "is-up"
        const turn = this.game.getCurrentPlayer().getCurrentTurn();
        if (!turn) return;
        turn.pins.forEach((pinIsUp, pinIndex) => {
            const domPin = this.domPins[pinIndex];
            if (pinIsUp) {
                domPin.classList.add(isUpClass);
            } else {
                domPin.classList.remove(isUpClass);
            }
        });
    }

}

module.exports = PinsView;