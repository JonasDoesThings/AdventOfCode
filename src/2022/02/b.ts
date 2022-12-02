import * as fs from "fs";

/*
    X = 0 = LOSE
    Y = 1 = DRAW
    Z = 2 = WIN
 */

const roundResultPoints = [0, 3, 6];

fs.readFile('in.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    const scoreCombinations: {[key: string]: number} = {}
    'ABC'.split('').forEach((enemyValue, enemyIndex) => {
        'XYZ'.split('').forEach((roundResult, roundResultIndex) => {
            const enemyIndexMinus1 = (enemyIndex - 1 >= 0 ? enemyIndex-1 : 'ABC'.length-1);
            const enemyIndexPlus1 = (enemyIndex + 1 <= 'ABC'.length-1 ? enemyIndex+1 : 0);
            const myPick = (roundResultIndex == 0 ? enemyIndexMinus1 : roundResultIndex == 1 ? enemyIndex : enemyIndexPlus1);
            scoreCombinations[`${enemyValue}${roundResult}`] = roundResultPoints[roundResultIndex] + myPick+1;
        });
    });

    const myScore = data.split("\n").reduce((previousValue, currentValue) => previousValue + (scoreCombinations[currentValue.replace(' ', '')] ?? 0), 0);
    console.log("myScore=", myScore)
});
