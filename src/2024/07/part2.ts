import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, fileContent) => {
    if (err) console.log(err);

    const data = fileContent.trim().split("\n").map((line) => line.replace(":", "").split(" ").map(str => parseInt(str)));

    let sum = 0;
    for (const [wantedResult, ...numbers] of data) {
        const permutations = generatePermutationsWithRepetitions([add, mult, conc], numbers.length-1);
        for (const permutation of permutations) {
            let acc = numbers[0];
            for (let i = 0; i < permutation.length; i++) {
                acc = permutation[i](acc, numbers[i+1]);
            }

            if(acc === wantedResult) {
                sum += acc;
                break;
            }
        }
    }

    console.log("07/02:", sum);
});

function add(a: number, b: number) {
    return a+b;
}
function mult(a: number, b: number) {
    return a*b;
}
function conc(a: number, b: number) {
    return parseInt(a.toString() + b.toString());
}

function generatePermutationsWithRepetitions<T>(elements: T[], length: number): T[][] {
    const result: T[][] = [];

    function backtrack(current: T[]) {
        if (current.length === length) {
            result.push([...current]);
            return;
        }

        for (const el of elements) {
            current.push(el);
            backtrack(current);
            current.pop();
        }
    }

    backtrack([]);
    return result;
}




