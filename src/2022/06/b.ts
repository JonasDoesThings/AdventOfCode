import * as fs from "fs";

fs.readFile(process.argv[2] ?? 'in.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    const splitData = data.replace("\n", "").split("");
    for (let i = 0; i < splitData.length-3; i++) {
        if(new Set([...splitData.slice(i, i+14)]).size === 14) {
            console.log(i+14);
            break;
        }
    }
});
