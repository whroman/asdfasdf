"use strict";

const assert = require("chai").assert;
const Turn = require("./Turn.js");

describe("Turn", () => {
    describe(".getRemainingPins()", () => {
        const testCases = [1,10,100];

        it("should return all pins immediately after init", () => {
            testCases.forEach((numOfPins) => {
                const turn = new Turn(2, numOfPins);
                const remainingPins = turn.getRemainingPins();
                assert.equal(remainingPins.length, numOfPins);
            });
        });


        it("should return no pins if all are knocked down", () => {
            testCases.forEach((numOfPins) => {
                const turn = new Turn(2, numOfPins);
                let key;
                turn.pins = turn.pins.map(() => {
                    return false;
                });
                const remainingPins = turn.getRemainingPins();
                assert.equal(remainingPins.length, 0);
            });
        });
    });

    describe(".roll()", () => {
        const testCases = [];

        const addCase = function (pinsToAffect, numOfPins) {
            testCases.push({
                pinsToAffect: pinsToAffect,
                numOfPins: numOfPins
            });
        };

        addCase([1,2,3], 10);
        addCase([1,2,3,6,7], 100);

        it("should knock down all given pins by ID", () => {
            testCases.forEach((testCase) => {
                const turn = new Turn(2, testCase.numOfPins);
                turn.roll(testCase.pinsToAffect);
                assert.equal(
                    turn.getRemainingPins().length,
                    testCase.numOfPins - testCase.pinsToAffect.length
                );

            });
        });


        it("should tally score of one roll correctly", () => {
            testCases.forEach((testCase) => {
                const turn = new Turn(2, testCase.numOfPins);
                turn.roll(testCase.pinsToAffect);
                assert.equal(
                    turn.rolls[0],
                    testCase.pinsToAffect.length
                );
            });
        });

        it("should not execute if Turn has no rolls are left", () => {
            const numOfPins = 10;
            const turn = new Turn(2, numOfPins);

            turn.roll();
            turn.roll();
            turn.roll([0]);

            assert.equal(turn.getRemainingPins().length, numOfPins);
        });
    });

    describe("isOver()", () => {
        const testCases = [2,5,10];

        it("should return `false` is no rolls of Turn have been used", () => {
            const turn = new Turn(1, 10);
            assert.equal(turn.isOver(), false);
        });

        it("should return `false` is not all rolls of Turn have been used", () => {
            testCases.forEach((testCase) => {
                const turn = new Turn(testCase + 1, 10);
                while (testCase--) turn.roll();
                assert.equal(turn.isOver(), false);
            });
        });


        it("should return `true` is a strike is rolled", () => {
            const turn = new Turn(2, 5);
            turn.roll([0,1,2,3,4]);
            assert.equal(turn.isOver(), true);
        });

        it("should return `true` is all rolls of Turn have been used", () => {
            testCases.forEach((testCase) => {
                const turn = new Turn(testCase, 10);
                while (testCase--) turn.roll();
                assert.equal(turn.isOver(), true);
            });
        });

    });
});