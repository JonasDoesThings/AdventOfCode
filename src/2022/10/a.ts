import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const peek = (arr: number[]) => arr[arr.length-1];

    const cyclesToSum = [20, 60, 100, 140, 180, 220];
    const states: number[] = [1];

    data.trim().split("\n").forEach((line) => {
        if(line === "noop") {
            states.push(peek(states));
            return;
        }

        states.push(peek(states));
        states.push(peek(states) + parseInt(line.split(" ")[1]));
    });

    const cycleSum = states.reduce((accumulator, value, index) => {
        return cyclesToSum.includes(index) ? accumulator+(states[index-1]*index) : accumulator;
    }, 0);
    console.log(cycleSum);
});
