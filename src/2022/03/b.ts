import * as fs from "fs";

fs.readFile('in.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let sum = 0;
    const lines = data.split("\n");
    for (let i = 0; i < lines.length; i += 3) {
        const chunk = lines.slice(i, i+3);
        const overlap = new Set(chunk[0].split("").filter(value => chunk.every(line => line.includes(value))));
        sum += [...overlap].reduce((accumulator, char) => accumulator + (char.charCodeAt(0) - (char.charCodeAt(0) <= 90 ? 38 : 96)), 0);
    }

    console.log("priorities=", sum)
});
