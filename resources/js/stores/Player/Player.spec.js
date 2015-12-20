"use strict";

const assert = require("chai").assert;
const Player = require("./Player.js");

describe("Player", () => {
    const frames = 10;
    const half1 = [0,1,2,3,4];
    const half2 = [5,6,7,8,9];
    const all = half1.concat(half2);
    let max = frames;
    let perfectGame = [];
    while (max--) perfectGame.push(all);

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
        addCase(10, [half1, half2]);
        addCase(5, [half1]);

        // Spares
        addCase(25, [half1, half2, half1, half2]);
        addCase(35, [half1, half2, half1, half2, half1, []]);

        // Strikes
        addCase(20, [all, half1, []]);
        addCase(45, [all, all, half1]);
        addCase(75, [all, all, all, half1, []]);

        addCase(10, [all]);
        addCase(30, [all, all]);
        addCase(270, perfectGame);

        it("should tally correct score", () => {
            testCases.forEach((testCase, testIndex) => {
                const player = new Player("Walter", frames);
                testCase.rolls.forEach((roll) => {
                    player.roll(roll);
                });
                assert.equal(testCase.score, player.getScore(), testIndex);
            });
        });

    });

    describe(".isDone()", () => {
        it("should return `false` if no Turns have been taken", () => {
            const player = new Player("a", 10);
            assert.equal(player.isDone(), false);
        });

        it("should return `true` if all Turns have been taken", () => {
            const player = new Player("a", 10);
            perfectGame.forEach((roll) => {
                player.roll(roll);
            });
            assert.equal(player.isDone(), true);
        });
    });

});