import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, input) => {
    if (err) console.log(err);

    const grid = input.trim().split("\n").map((row) => row.trim().split("").map(x => parseInt(x)));
    const startingPoints = grid.reduce((acc, row, rowIndex) => ([...acc, ...row.reduce((acc2, point, colIndex) => point === 0 ? [...acc2, [rowIndex, colIndex]] : acc2, [])]), []) as number[][];

    const scores: Record<string, number> = {};
    for (const startingPoint of startingPoints) {
        scores[startingPoint.toString()] = walkPath(grid, startingPoint);
    }

    console.log("10/02:", Object.values(scores).reduce((a, b) => a + b, 0));
});

function walkPath(grid: number[][], startingPoint: number[]): number {
    const [positionY, positionX] = startingPoint;
    const currentLevel = grid[positionY][positionX];
    if(currentLevel === 9) return 1;

    const viableNeighbours = [[positionY-1, positionX], [positionY+1, positionX], [positionY, positionX-1], [positionY, positionX+1]]
        .filter(([yPos, xPos]) => grid[yPos]?.[xPos] === (currentLevel + 1));

    if(viableNeighbours.length === 0) return 0;
    return viableNeighbours.map((pos) => walkPath(grid, pos)).reduce((a, b) => a + b, 0);
}
