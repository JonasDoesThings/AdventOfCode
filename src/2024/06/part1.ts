import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const grid = data.trim().split("\n").map(line => line.trim().split(""));

    const guardStartPosY = grid.findIndex(row => row.includes("^"));
    const guardStartPos = [guardStartPosY, grid[guardStartPosY].findIndex(col => col === "^")];
    let guardPos = guardStartPos;
    let guardVec = [-1, 0]; // (y,x)

    const vecAdd = (a: number[], b: number[]) => {
        return [a[0] + b[0], a[1] + b[1]];
    };

    while (true) {
        let newPos = vecAdd(guardPos, guardVec);
        if(grid[newPos[0]]?.[newPos[1]] == undefined) {
            break;
        }

        if(grid[newPos[0]][newPos[1]] === "#") {
            // roate vec2 by 90° around (0,0)
            guardVec = [guardVec[1], -guardVec[0]];
            newPos = vecAdd(guardPos, guardVec);
        }

        grid[newPos[0]][newPos[1]] = "X"; // X for visited
        guardPos = newPos;
    }

    console.log("06/01:", grid.map(row => row.filter(s => s === "X" || s === "^").length).reduce((a, b) => a + b));
});
