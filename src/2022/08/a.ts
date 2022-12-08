import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);
    data = data.trim();

    const visibilityGrid: Boolean[][] = Array(data.split("\n").length);
    for(let i = 0; i < visibilityGrid.length; i++) {
        visibilityGrid[i] = Array(data.split("\n")[1].length);
    }

    visibilityGrid.forEach(row => row.fill(false));
    const treeGrid: number[][] = data.split("\n").map(row => row.split("").map(val => parseInt(val)));

    for(let row = 0; row < treeGrid.length; row++) {
        for(let col = 0; col < treeGrid[row].length; col++) {
            if(treeGrid[row][col] > Math.max(...treeGrid[row].slice(0, col)) || treeGrid[row][col] > Math.max(...treeGrid[row].slice(col+1))) {
                visibilityGrid[row][col] = true;
            } else if(treeGrid[row][col] > Math.max(...(treeGrid.map(row => row[col]).slice(0, row))) || treeGrid[row][col] > Math.max(...(treeGrid.map(row => row[col]).slice(row+1)))) {
                visibilityGrid[row][col] = true;
            } else if(col === 0 || col === treeGrid[row].length-1 || row === 0 || row === treeGrid.length-1) {
                visibilityGrid[row][col] = true;
            }
        }
    }

    console.log(visibilityGrid.reduce((accumulator, row) => accumulator+row.filter(Boolean).length, 0));
});
