import * as fs from "fs";

fs.readFile('in.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    const scoreCombinations: {[key: string]: number} = {}
    'ABC'.split('').forEach((enemyValue, enemyIndex) => {
        'XYZ'.split('').forEach((myValue, myIndex) => {
            const enemyIndexPlus1 = (enemyIndex+1) <= 'ABC'.length-1 ? enemyIndex+1 : 0;
            const didIWin = myIndex == enemyIndexPlus1;

            scoreCombinations[`${enemyValue}${myValue}`] = myIndex+1 + (myIndex == enemyIndex ? 3 : (didIWin ? 6 : 0));
        });
    });

    const myScore = data.split("\n").reduce((previousValue, currentValue) => previousValue + (scoreCombinations[currentValue.replace(' ', '')] ?? 0), 0);
    console.log("myScore=", myScore)
});
