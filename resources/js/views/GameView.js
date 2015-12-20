"use strict";

var InfoView = require("./InfoView.js");

class GameView {

    constructor (game) {
        this.game = game;
        this.infoView = new InfoView(this.game);

        this.bindDomPins();
        this.bindBowlAction();
        this.bindResetAction();

        this.updateAll();
    }

    updateAll () {
        this.updatePins();

        this.game.players.forEach( () => {
            this.infoView.update();
            this.game.setNextPlayer();
        });
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

    bindResetAction () {
        const id = "action-reset";
        const domReset = document.getElementById(id);
        domReset.addEventListener("click", () =>  {
            this.game.reset();
            this.updateAll();
        });
    }

    bindBowlAction () {
        const id = "action-bowl";
        const domBowl = document.getElementById(id);
        const originalClasses = domBowl.className;
        domBowl.addEventListener("click", () => {
            if (this.game.isOver()) {
                domBowl.className = originalClasses + " disabled";
                return;
            }

            const player = this.game.getCurrentPlayer();
            const turn = player.getCurrentTurn();
            const isOver = turn.isOver();

            let classNames = [originalClasses];

            if (turn.isOver()) {
                /*
                    If the current turn is over, we want to display a fresh
                        set of pins without "rolling".
                */
                player.currentTurn++;
                this.game.setNextPlayer();
                this.updatePins();
                domBowl.innerText = "Roll";

            } else {
                player.randomRoll();

                /*
                    If game is over, we still want to render appropriate buttons,
                        but not allow clicking of "Roll" button any longer.
                */
                if (this.game.isOver()) classNames.push("disabled");

                if (turn.isOver()) {
                    /*
                        If this roll ended the turn, we want to display
                            the state of the turn that just ended.
                    */
                    player.currentTurn--;

                    domBowl.innerText = "Begin Turn"
                    classNames.push("success");
                }

                this.updatePins();
            }

            domBowl.className = classNames.join(" ");
        });
    }

    updatePins () {
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


        this.infoView.update();
    }

}

module.exports = GameView;