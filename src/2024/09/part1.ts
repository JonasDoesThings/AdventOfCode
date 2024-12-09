import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, input) => {
    if (err) console.log(err);

    const data = input.trim().split("");
    const disk = [];
    for (let i = 0; i < data.length; i += 2) {
        const fileSize = parseInt(data[i]);
        const freeSpace = parseInt(data[i+1]);
        for (let j = 0; j < fileSize; j++) {
            disk.push(Math.floor(i/2));
        }
        for (let j = 0; j < freeSpace; j++) {
            disk.push(".");
        }
    }

    let lastMostRightFileChunkIndex = disk.length-1;
    while(true) {
        const mostLeftFreeSpace = disk.indexOf(".");
        for (let j = lastMostRightFileChunkIndex; j > 0; j--) {
            if(isNaN(disk[j])) continue;
            // store last pos overarching iterations
            // to reduce unnecessary iterations in the following loop
            lastMostRightFileChunkIndex = j;
            break;
        }

        if(lastMostRightFileChunkIndex+1 == mostLeftFreeSpace) break;

        disk[mostLeftFreeSpace] = disk[lastMostRightFileChunkIndex];
        disk[lastMostRightFileChunkIndex] = ".";
    }

    const checksum = disk.slice(0, disk.indexOf("."))
        .reduce((acc, val, index) => acc += val * index);

    console.log("09/01", checksum);
});
