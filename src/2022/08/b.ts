import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);
    data = data.trim();

    const visibilityGrid: number[][] = Array(data.split("\n").length);
    for(let i = 0; i < visibilityGrid.length; i++) {
        visibilityGrid[i] = Array(data.split("\n")[1].length);
    }

    visibilityGrid.forEach(row => row.fill(0));
    const treeGrid: number[][] = data.split("\n").map(row => row.split("").map(val => parseInt(val)));

    const getRange = (currentTileHeight: number, heightList: number[]) => {
        if(heightList.length === 0) {
            return 0;
        }

        let range = heightList.findIndex((val) => val >= currentTileHeight);
        if(range === -1) {
            return heightList.length;
        }

        return range+1;
    }

    for(let row = 0; row < treeGrid.length; row++) {
        for(let col = 0; col < treeGrid[row].length; col++) {
            const currentTileHeight = treeGrid[row][col];
            const visibilityScore
                = getRange(currentTileHeight, treeGrid[row].slice(0, col).reverse())
                * getRange(currentTileHeight, treeGrid[row].slice(col+1))
                * getRange(currentTileHeight, treeGrid.map(row => row[col]).slice(0, row).reverse()) 
                * getRange(currentTileHeight, treeGrid.map(row => row[col]).slice(row+1));

            visibilityGrid[row][col] = visibilityScore;
        }
    }

    console.log(Math.max(...visibilityGrid.flatMap(val => val)));
});
