import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const grid = data.trim().split("\n").map(line => line.trim().split(""));
    const antinodeGrid = [...grid.map(row => row.slice())];

    const antennas: Record<string, number[][]> = {};
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const tile = grid[row][col];
            if(tile !== "." && tile !== "#") {
                antennas[tile] = [...(antennas[tile] ?? []), [row, col]];
            }
        }
    }

    const isInGrid = (y: number, x: number) => {
        return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
    };

    let antinodeCount = 0;
    for (const [antennaKey, antennaPositions] of Object.entries(antennas)) {
        const antennaCombinations = getAllPairs(antennaPositions);
        for (const [[aY, aX], [bY, bX]] of antennaCombinations) {
            const dY = aY - bY;
            const dX = aX - bX;

            const antinodes = [];

            // walk into all 4 directions
            let antinodeY = aY+dY;
            let antinodeX = aX+dX;
            while(isInGrid(antinodeY, antinodeX)) {
                antinodes.push([antinodeY, antinodeX]);
                antinodeY += dY;
                antinodeX += dX;
            }
            antinodeY = aY-dY;
            antinodeX = aX-dX;
            while(isInGrid(antinodeY, antinodeX)) {
                antinodes.push([antinodeY, antinodeX]);
                antinodeY -= dY;
                antinodeX -= dX;
            }
            antinodeY = bY+dY;
            antinodeX = bX+dX;
            while(isInGrid(antinodeY, antinodeX)) {
                antinodes.push([antinodeY, antinodeX]);
                antinodeY += dY;
                antinodeX += dX;
            }
            antinodeY = bY-dY;
            antinodeX = bX-dX;
            while(isInGrid(antinodeY, antinodeX)) {
                antinodes.push([antinodeY, antinodeX]);
                antinodeY -= dY;
                antinodeX -= dX;
            }

            for (const [antinode1Y, antinode1X] of antinodes) {
                if(antinodeGrid[antinode1Y][antinode1X] !== "#") {
                    antinodeGrid[antinode1Y][antinode1X] = "#";
                    antinodeCount++;
                }
            }
        }
    }
    console.log("08/02:", antinodeCount);
});

function getAllPairs<T>(arr: T[]): [T, T][] {
    const pairs: [T, T][] = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            pairs.push([arr[i], arr[j]]);
        }
    }
    return pairs;
}
