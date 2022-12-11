import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const peek = (arr: number[]) => arr[arr.length-1];

    const states: number[] = [1];

    data.trim().split("\n").forEach((line) => {
        if(line === "noop") {
            states.push(peek(states));
            return;
        }

        states.push(peek(states));
        states.push(peek(states) + parseInt(line.split(" ")[1]));
    });

    const lines: string[] = new Array(Math.ceil(states.length/40)).fill("");
    for (let cycle = 0; cycle < states.length; cycle++) {
        if([states[cycle]-1, states[cycle], states[cycle]+1].includes(cycle % 40)) {
            lines[Math.floor(cycle/40)] += "#";
        } else {
            lines[Math.floor(cycle/40)] += ".";
        }
    }

    console.log(lines.join("\n"));
});
