"use strict";

var InfoView = require("./InfoView.js");
var PinsView = require("./PinsView.js");

class GameView {

    constructor (game) {
        this.game = game;
        this.subviews ={
            info: new InfoView(this.game),
            pins: new PinsView(this.game)
        };

        this.bindBowlAction();
        this.bindResetAction();

        this.update();
    }

    update () {
        this.subviews.pins.update();
        this.subviews.info.update();
    }

    bindResetAction () {
        const id = "action-reset";
        const domReset = document.getElementById(id);
        domReset.addEventListener("click", () =>  {
            this.resetAction();
        });
    }

    resetAction () {
        this.game.reset();
        this.update();
        this.domBowl.className = this.domBowlClasses;
        this.domBowl.innerText = this.domBowlText;
    }

    bindBowlAction () {
        const id = "action-bowl";
        this.domBowl = document.getElementById(id);
        this.domBowlClasses = this.domBowl.className;
        this.domBowlText = "Roll";

        this.domBowl.addEventListener("click", () => {
            this.bowlAction();
        });
    }

    bowlAction () {
        if (this.game.isOver()) {
            this.domBowl.className = this.domBowlClasses + " disabled";
            return;
        }

        const player = this.game.getCurrentPlayer();
        const turn = player.getCurrentTurn();
        const isOver = turn.isOver();

        // Only "roll" is the current turn is not over
        if (turn.isOver()) {
            /*
                If the current turn is over, we want to:
                    1) Not "roll".
                    2) Display a fresh set of pins.
            */
            player.currentTurn++;
            this.game.setNextPlayer();
            this.update();
            this.domBowl.innerText = this.domBowlText;
            return;
        }

        let classNames = this.domBowlClasses;
        player.randomRoll();

        /*
            If game is over, we still want to render appropriate buttons,
                but not allow "Roll" button to be clicked.
        */
        if (this.game.isOver()) classNames += " disabled";

        /*
            If this roll ended the turn, we want to display
                the pins in the state of the turn that just ended.
        */
        if (turn.isOver()) {
            player.currentTurn--;
            this.domBowl.innerText = "Begin Turn";
            classNames += " success";
        }

        this.domBowl.className = classNames;
        this.update();
    }

}

module.exports = GameView;