import * as fs from "fs";

fs.readFile("in.txt", "utf-8", (err, data) => {
    if(err) console.log(err);

    const elves: {[key: number]: number} = {0: 0};

    let i = 0;
    for (const line of data.split("\n")) {
        elves[i] = (elves[i] ?? 0) + (parseInt(line) || 0);

        if(line.trim() == "") i++;
    }

    const maxCalories = Object.values(elves).reduce((a, b) => a > b ? a : b);
    console.log("solution=", maxCalories);
});
