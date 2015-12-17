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
                numOfPins: numOfPins,
                expect: numOfPins - pinsToAffect.length
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
    });
});