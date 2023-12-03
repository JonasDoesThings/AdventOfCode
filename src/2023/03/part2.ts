import * as fs from "fs";

fs.readFile("in.txt", "utf-8", (err, data) => {
    if(err) console.log(err);

    const lines = data.split("\n");

    const findNumbersInRow = (row?: string) => {
        if(!row) return [];

        const numbers: {num: number, pos: number[]}[] = [];
        let currentNumber = "";
        for (let i = 0; i < row.length; i++) {
            if(!isNaN((+(row.at(i)! ?? null)))) {
                currentNumber += row.at(i);

                if(i === row.length-1) {
                    numbers.push({
                        num: parseInt(currentNumber),
                        pos: Array.from({length: currentNumber.length},(_, j) => (i - currentNumber.length) + j)
                    });
                }
            } else if(currentNumber !== "") {
                numbers.push({
                    num: parseInt(currentNumber),
                    pos: Array.from({length: currentNumber.length},(_, j) => (i - currentNumber.length) + j)
                });

                currentNumber = "";
            }
        }

        return numbers;
    };

    const findNeighbouringNumbers = (row: number, col: number) => {
        const prevLineNumbers = findNumbersInRow(lines[row-1]);
        const nextLineNumbers = findNumbersInRow(lines[row+1]);
        const currentLineNumbers = findNumbersInRow(lines[row]);

        const nums: number[] = [];
        prevLineNumbers.forEach(num => {
            for (const posCol of num.pos) {
                if(areCoordinatesNeighbours(row, col, row-1, posCol)) {
                    nums.push(num.num);
                    break;
                }
            }
        });
        nextLineNumbers.forEach(num => {
            for (const posCol of num.pos) {
                if(areCoordinatesNeighbours(row, col, row+1, posCol)) {
                    nums.push(num.num);
                    break;
                }
            }
        });
        currentLineNumbers.forEach(num => {
            if(num.pos[num.pos.length-1]+1 == col || num.pos[0]-1 == col) {
                nums.push(num.num);
            }
        });

        if(nums.length == 2) {
            return nums.reduce((previousValue, currentValue) => previousValue * currentValue, 1);
        }

        return 0;
    };

    const areCoordinatesNeighbours = (row1: number, col1: number, row2: number, col2: number) => {
        return Math.abs(row1-row2) <= 1 && Math.abs(col1-col2) <= 1;
    };

    let sum = 0;
    for (let row = 0; row < lines.length; row++) {
        const line = lines[row];

        if(line.trim() === "") continue;

        line.split("").forEach((c, col) => {
            if(c === "*") {
                sum += findNeighbouringNumbers(row, col);
            }
        });
    }

    console.log("3/2:");
    console.log(sum);
});
