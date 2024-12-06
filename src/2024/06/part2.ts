import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const grid = data.trim().split("\n").map(line => line.trim().split("").map(s => s === "." ? [] : s));

    const guardStartPosY = grid.findIndex(row => row.includes("^"));
    const guardStartPos = [guardStartPosY, grid[guardStartPosY].findIndex(col => col === "^")];

    grid[guardStartPosY][guardStartPos[1]] = [];

    const vecAdd = (a: number[], b: number[]) => {
        return [a[0] + b[0], a[1] + b[1]];
    };

    let possibilities = 0;
    for (let i = 0; i < data.trim().split("").filter(s => s !== "\n").length; i++) {
        const tryY = Math.floor(i / grid[0].length);
        const tryX = i % grid[0].length;

        // dont place tmp-obstacle on # or ^
        if(!Array.isArray(grid[tryY][tryX])) continue;

        // deep copy
        const tmpGrid = [...grid.map(arr => arr.slice().map(x => Array.isArray(x) ? x.slice() : x))] as any[][];
        tmpGrid[tryY][tryX] = "O";

        let guardPos = [...guardStartPos];
        let guardVec = [-1, 0]; // (y,x)

        while (true) {
            let newPos = vecAdd(guardPos, guardVec);
            if(tmpGrid[newPos[0]]?.[newPos[1]] == undefined) {
                break;
            }

            let tile = tmpGrid[newPos[0]][newPos[1]];
            while(tile === "#" || tile === "O") {
                // roate vec2 by 90° around (0,0)
                guardVec = [guardVec[1], -guardVec[0]];
                newPos = vecAdd(guardPos, guardVec);
                tile = tmpGrid[newPos[0]][newPos[1]];
            }

            if(tile.includes(guardVec.toString())) {
                possibilities++;
                break;
            }

            // save dir-vec for loop detection
            tmpGrid[newPos[0]][newPos[1]].push(guardVec.toString());
            guardPos = newPos;
        }
    }

    console.log("06/02:", possibilities);
});
