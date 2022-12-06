import * as fs from "fs";

fs.readFile("in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const stacks: string[][] = [];
    const iter = data.split("\n")[Symbol.iterator]();
    let line: string;
    while((line = iter.next().value) !== undefined) {
        if(line.includes("[")) {
            const cleanedLine = line.replace(/(?<keep>...)( |\n|$)/g, "$<keep>").replace(/\[|\]/g, "").replace(/ {3}/g, "-");
            console.log(cleanedLine);
            for (let i = 0; i < cleanedLine.split("").length; i++) {
                if (cleanedLine[i] !== "-") {
                    if (!stacks[i]) stacks[i] = [];
                    stacks[i].push(cleanedLine[i]);
                }
            }
        } else if(line.startsWith("move")) {
            const [amount, from, to] = line.split(/[a-z]+/g).filter(Boolean).map(value => parseInt(value));
            for (let i = 0; i < amount; i++) {
                stacks[to-1].unshift(stacks[from-1].shift()!);
            }
        }
    }

    console.log(stacks.reduce((s, stack) => {return s + stack[0];}, ""));
});
