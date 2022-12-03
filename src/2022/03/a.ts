import * as fs from "fs";

fs.readFile('in.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    const sum = data.split("\n").reduce((previousValue, currentValue) => {
        const firstHalf = currentValue.substring(0, currentValue.length / 2);
        const secondHalf = currentValue.substring(currentValue.length / 2, currentValue.length);

        const overlap = new Set(firstHalf.split("").filter(value => secondHalf.includes(value)));
        return previousValue + [...overlap].reduce((accumulator, char) => accumulator + (char.charCodeAt(0) - (char.charCodeAt(0) <= 90 ? 38 : 96)), 0);
    }, 0);

    console.log("priorities=", sum)
});
