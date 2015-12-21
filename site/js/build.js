(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Game = require("./stores/Game/Game.js");
var GameView = require("./views/GameView.js");

var game = new Game(10);

document.addEventListener("DOMContentLoaded", function () {
    new GameView(game);
});

},{"./stores/Game/Game.js":2,"./views/GameView.js":5}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = require("./../Player/Player.js");

var Game = (function () {
    function Game(numOfTurns) {
        _classCallCheck(this, Game);

        this.numOfTurns = numOfTurns;
        this.reset();
    }

    _createClass(Game, [{
        key: "getCurrentPlayer",
        value: function getCurrentPlayer() {
            return this.players[this.currentPlayer];
        }
    }, {
        key: "isOver",
        value: function isOver() {
            return this.players[this.players.length - 1].isDone();
        }
    }, {
        key: "setNextPlayer",
        value: function setNextPlayer() {
            this.currentPlayer++;
            if (!this.players[this.currentPlayer]) this.currentPlayer = 0;
        }
    }, {
        key: "reset",
        value: function reset() {
            this.players = [new Player("One", this.numOfTurns), new Player("Two", this.numOfTurns)];
            this.currentPlayer = 0;
        }
    }]);

    return Game;
})();

module.exports = Game;

},{"./../Player/Player.js":3}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Turn = require("./../Turn/Turn.js");

var Player = (function () {
    function Player(name, numOfTurns) {
        _classCallCheck(this, Player);

        this.name = name;

        this.turns = [
            // turnId: Turn
        ];

        this.currentTurn = 0;

        while (numOfTurns-- > 0) {
            var turn = new Turn(2, 10);
            this.turns.push(turn);
        }
    }

    _createClass(Player, [{
        key: "getCurrentTurn",
        value: function getCurrentTurn() {
            return this.turns[this.currentTurn];
        }
    }, {
        key: "isDone",
        value: function isDone() {
            return this.currentTurn >= this.turns.length;
        }
    }, {
        key: "roll",
        value: function roll(arrayOfPinIds) {
            if (this.isDone()) {
                console.warn("Player " + this.name + " has no moves left");
                return;
            }
            // Roll
            var turn = this.getCurrentTurn();
            turn.roll(arrayOfPinIds);

            // Handle results of Roll
            if (turn.isOver()) this.currentTurn++;
        }
    }, {
        key: "randomRoll",
        value: function randomRoll() {
            var pins = this.getCurrentTurn().getRemainingPins();
            var toHit = [];

            pins.forEach(function (val) {
                var hit = Math.floor(Math.random() * 1.1);
                if (hit === 0) {
                    toHit.push(val);
                }
            });

            this.roll(toHit);

            return this;
        }
    }, {
        key: "getScore",
        value: function getScore() {
            var score = 0;
            var lastRoll = 0;
            var lastLastRoll = 0;

            var turns = this.turns.slice(0).reverse();
            turns.forEach(function (turn) {
                var roll1 = turn.rolls[0];
                var rawScore = roll1 + turn.rolls[1];
                var fullScore = rawScore;

                var isStrike = roll1 === turn.pins.length;
                var isSpare = rawScore === turn.pins.length;

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
    }]);

    return Player;
})();

module.exports = Player;

},{"./../Turn/Turn.js":4}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Turn = (function () {
    function Turn(numOfRolls, numOfPins) {
        _classCallCheck(this, Turn);

        this.rolls = [
            // (rollIndex: rollScore)
        ];

        this.pins = [
            // (pinIndex: pinRemains)
        ];

        this.currentRoll = 0;

        while (numOfRolls-- > 0) {
            this.rolls.push(null);
        }while (numOfPins-- > 0) {
            this.pins.push(true);
        }
    }

    _createClass(Turn, [{
        key: "getRemainingPins",
        value: function getRemainingPins() {
            var remainingPins = [];

            this.pins.forEach(function (pinRemains, pinIndex) {
                if (pinRemains) remainingPins.push(pinIndex);
            });
            return remainingPins;
        }
    }, {
        key: "isOver",
        value: function isOver() {
            return this.currentRoll >= this.rolls.length;
        }
    }, {
        key: "roll",
        value: function roll(arrayOfPinIds) {
            var _this = this;

            if (this.rolls[this.currentRoll] === undefined) {
                console.warn("No rolls left in this turn.");
                return this;
            }

            arrayOfPinIds = arrayOfPinIds || [];

            var score = 0;
            arrayOfPinIds.forEach(function (pinId) {
                if (!_this.pins[pinId]) console.warn("Pin " + pinId + " is already knocked down.");
                _this.pins[pinId] = false;
                score++;
            });

            this.rolls[this.currentRoll] = score;
            this.currentRoll++;

            var isStrike = score === this.pins.length;
            if (isStrike) this.currentRoll++;

            return this;
        }
    }]);

    return Turn;
})();

module.exports = Turn;

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfoView = require("./InfoView.js");
var PinsView = require("./PinsView.js");

var GameView = (function () {
    function GameView(game) {
        _classCallCheck(this, GameView);

        this.game = game;
        this.subviews = {
            info: new InfoView(this.game),
            pins: new PinsView(this.game)
        };

        this.bindBowlAction();
        this.bindResetAction();

        this.update();
    }

    _createClass(GameView, [{
        key: "update",
        value: function update() {
            this.subviews.pins.update();
            this.subviews.info.update();
        }
    }, {
        key: "bindResetAction",
        value: function bindResetAction() {
            var _this = this;

            var id = "action-reset";
            var domReset = document.getElementById(id);
            domReset.addEventListener("click", function () {
                _this.resetAction();
            });
        }
    }, {
        key: "resetAction",
        value: function resetAction() {
            this.game.reset();
            this.update();
            this.domBowl.className = this.domBowlClasses;
            this.domBowl.innerText = this.domBowlText;
        }
    }, {
        key: "bindBowlAction",
        value: function bindBowlAction() {
            var _this2 = this;

            var id = "action-bowl";
            this.domBowl = document.getElementById(id);
            this.domBowlClasses = this.domBowl.className;
            this.domBowlText = "Roll";

            this.domBowl.addEventListener("click", function () {
                _this2.bowlAction();
            });
        }
    }, {
        key: "bowlAction",
        value: function bowlAction() {
            if (this.game.isOver()) {
                this.domBowl.className = this.domBowlClasses + " disabled";
                return;
            }

            var player = this.game.getCurrentPlayer();
            var turn = player.getCurrentTurn();
            var isOver = turn.isOver();

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

            var classNames = this.domBowlClasses;
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
    }]);

    return GameView;
})();

module.exports = GameView;

},{"./InfoView.js":6,"./PinsView.js":7}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfoView = (function () {
    function InfoView(game) {
        _classCallCheck(this, InfoView);

        this.game = game;
        this.domPlayers = {};
        this.bindDom();
    }

    _createClass(InfoView, [{
        key: "bindDom",
        value: function bindDom() {
            var domRows = document.querySelectorAll(".scoreboard tr[data-player]");
            var domIndex = 0;
            for (domIndex; domIndex < domRows.length; domIndex++) {
                var domRow = domRows[domIndex];
                var playerIndex = domRow.getAttribute("data-player");

                this.domPlayers[playerIndex] = {
                    row: domRow,
                    turns: domRow.children[1],
                    roll1: domRow.children[2],
                    roll2: domRow.children[3],
                    score: domRow.children[4]
                };
            }
        }
    }, {
        key: "update",
        value: function update() {
            var playerIndex = undefined;
            for (playerIndex in this.domPlayers) {
                playerIndex = Number(playerIndex);
                var player = this.game.players[playerIndex];
                var turn = player.getCurrentTurn();

                var domPlayer = this.domPlayers[playerIndex];
                var isCurrent = playerIndex === this.game.currentPlayer;
                if (domPlayer.row) domPlayer.row.className = isCurrent ? "current" : "";

                if (turn) {
                    var roll1 = turn.rolls[0];
                    var roll2 = turn.rolls[1];
                    var isStrike = roll1 === 10;
                    var isSpare = !isStrike && roll1 + roll2 === 10;

                    domPlayer.turns.innerText = player.currentTurn + 1 + "/" + player.turns.length;
                    domPlayer.roll1.innerText = isStrike ? "X" : roll1 || "-";
                    domPlayer.roll2.innerText = isSpare ? "/" : roll2 || "-";
                    domPlayer.score.innerText = player.getScore();
                }
            }
        }
    }]);

    return InfoView;
})();

module.exports = InfoView;

},{}],7:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PinsView = (function () {
    function PinsView(game) {
        _classCallCheck(this, PinsView);

        this.game = game;

        this.bindDomPins();
    }

    _createClass(PinsView, [{
        key: "bindDomPins",
        value: function bindDomPins() {
            var _this = this;

            var sel = ".pin";
            this.domPins = Array(10);
            var domPins = Array.prototype.slice.call(document.querySelectorAll(sel));
            domPins.forEach(function (domPin) {
                var key = domPin.getAttribute("data-id");
                _this.domPins[key] = domPin;
            });
        }
    }, {
        key: "update",
        value: function update() {
            var _this2 = this;

            var isUpClass = "is-up";
            var turn = this.game.getCurrentPlayer().getCurrentTurn();
            if (!turn) return;
            turn.pins.forEach(function (pinIsUp, pinIndex) {
                var domPin = _this2.domPins[pinIndex];
                if (pinIsUp) {
                    domPin.classList.add(isUpClass);
                } else {
                    domPin.classList.remove(isUpClass);
                }
            });
        }
    }]);

    return PinsView;
})();

module.exports = PinsView;

},{}]},{},[1]);
