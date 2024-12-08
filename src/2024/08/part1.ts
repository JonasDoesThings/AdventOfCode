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

    let antinodeCount = 0;
    for (const [antennaKey, antennaPositions] of Object.entries(antennas)) {
        const antennaCombinations = getAllPairs(antennaPositions);
        for (const [[aY, aX], [bY, bX]] of antennaCombinations) {
            const dY = aY - bY;
            const dX = aX - bX;

            const antinode1Y = aY+dY;
            const antinode1X = aX+dX;
            if(antinode1Y >= 0 && antinode1Y < grid.length && antinode1X >= 0 && antinode1X < grid[0].length) {
                if(antinodeGrid[antinode1Y][antinode1X] !== "#") {
                    antinodeGrid[antinode1Y][antinode1X] = "#";
                    antinodeCount++;
                }
            }
            const antinode2Y = bY-dY;
            const antinode2X = bX-dX;
            if(antinode2Y >= 0 && antinode2Y < grid.length && antinode2X >= 0 && antinode2X < grid[0].length) {
                if(antinodeGrid[antinode2Y][antinode2X] !== "#") {
                    antinodeGrid[antinode2Y][antinode2X] = "#";
                    antinodeCount++;
                }
            }
        }
    }
    console.log("08/01:", antinodeCount);
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
