"use strict";

const Player = require("./stores/Player/Player.js");
const players = [new Player("One", 10)];

class GameView {

    constructor () {
        this.bindDomPins();
        this.bindBowlAction();

        this.updatePins();
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

    bindBowlAction () {
        const id = "action-bowl";
        const domBowl = document.getElementById(id);
        domBowl.addEventListener("click", () => {
            const player = players[0];
            if (player.isDone()) return;

            const turn = player.getCurrentTurn();
            const isOver = turn.isOver();

            if (turn.isOver()) {
                /*
                    If the current turn is over, we want to display a fresh
                        set of pins without "rolling".
                */
                player.currentTurn++;
                this.updatePins();
                domBowl.innerText = "Roll";
            } else {
                player.randomRoll();

                if (turn.isOver()) {
                    /*
                        If this roll ended the turn, we want to display
                            the state of the turn that just ended.
                    */
                    player.currentTurn--;
                    this.updatePins();

                    domBowl.innerText = "Begin Turn"
                } else {
                    this.updatePins();
                }
            }
        });
    }

    updateInfo () {
        const domScore = document.querySelectorAll("[data-score]");
        const domRoll1 = document.querySelectorAll("[data-roll-one]");
        const domRoll2 = document.querySelectorAll("[data-roll-two]");
        const domTurns = document.querySelectorAll("[data-turns]");
        const player = players[0];
        const turn = player.getCurrentTurn();

        domScore[0].innerText = player.getScore();
        domRoll1[0].innerText = turn.rolls[0] || "-";
        domRoll2[0].innerText = turn.rolls[1] || "-";
        domTurns[0].innerText = player.currentTurn + 1 + "/" + player.turns.length;
    }

    updatePins () {
        const isUpClass = "is-up"
        const pinsArray = players[0].getCurrentTurn().pins;
        pinsArray.forEach((pinIsUp, pinIndex) => {
            const domPin = this.domPins[pinIndex];
            if (pinIsUp) {
                domPin.classList.add(isUpClass);
            } else {
                domPin.classList.remove(isUpClass);
            }
        });

        this.updateInfo();
    }

}

document.addEventListener("DOMContentLoaded", function () {
    new GameView();
});

