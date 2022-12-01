import * as fs from "fs";

fs.readFile('in.txt', 'utf-8', (err, data) => {
    if(err) console.log(err);

    const elves: {[key: number]: number} = {0: 0};

    let i = 0;
    for (let line of data.split("\n")) {
        elves[i] = (elves[i] ?? 0) + (parseInt(line) || 0);

        if(line.trim() == '') i++;
    }

    const sortedElves = Object.values(elves).sort((a, b) => a > b ? 1 : -1)
    console.log("solution=", sortedElves.slice(-3).reduce((a, b) => a+b));
});
