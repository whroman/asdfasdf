"use strict";

const assert = require("chai").assert;
const Player = require("./Player.js");

describe("Player", () => {
    describe(".getScore()", () => {
        const testCases = [];
        const addCase = function (score, rolls) {
            testCases.push({
                score: score,
                rolls: rolls
            });
        };

        addCase(0, [ [], [] ]);
        addCase(1, [ [1], [] ]);
        addCase(2, [ [1], [0] ]);
        addCase(10, [
            [0,1,2,3,4,5],
            [6,7,8,9]
        ]);


        it("should tally correct score", () => {
            testCases.forEach((testCase) => {
                const player = new Player("Walter", 3);
                testCase.rolls.forEach((roll) => {
                    player.roll(roll);
                });
                player.getScore(testCase.score);
            });
        });
    });

});