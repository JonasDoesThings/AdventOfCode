import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, input) => {
    if (err) console.log(err);

    const grid = input.trim().split("\n").map((row) => row.trim().split("").map(x => parseInt(x)));
    const startingPoints = grid.reduce((acc, row, rowIndex) => ([...acc, ...row.reduce((acc2, point, colIndex) => point === 0 ? [...acc2, [rowIndex, colIndex]] : acc2, [])]), []) as number[][];

    const scores: Record<string, Set<string>> = {};
    for (const startingPoint of startingPoints) {
        if(!scores[startingPoint.toString()]) scores[startingPoint.toString()] = new Set();
        for (const foundPeak of walkPath(grid, startingPoint)) {
            scores[startingPoint.toString()].add(foundPeak.toString());
        }
    }

    console.log("10/01:", Object.values(scores).reduce((a, b) => a + b.size, 0));
});

function walkPath(grid: number[][], startingPoint: number[]): number[][] {
    const [positionY, positionX] = startingPoint;
    const currentLevel = grid[positionY][positionX];
    if(currentLevel === 9) return [startingPoint];

    const viableNeighbours = [[positionY-1, positionX], [positionY+1, positionX], [positionY, positionX-1], [positionY, positionX+1]]
        .filter(([yPos, xPos]) => grid[yPos]?.[xPos] === (currentLevel + 1));

    if(viableNeighbours.length === 0) return [];
    return viableNeighbours.flatMap((pos) => walkPath(grid, pos));
}
