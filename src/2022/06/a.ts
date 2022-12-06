import * as fs from "fs";

fs.readFile(process.argv[2] ?? 'in.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    const splitData = data.replace("\n", "").split("");
    for (let i = 0; i < splitData.length-3; i++) {
        if(new Set([splitData[i], splitData[i+1], splitData[i+2], splitData[i+3]]).size === 4) {
            console.log(i+4);
            break;
        }
    }
});
