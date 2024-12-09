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

    let fileLength = 0;
    for (let diskIndex = disk.length; diskIndex >= 0; diskIndex--) {
        if(!isNaN(disk[diskIndex])) fileLength++;
        else fileLength = 0;

        if(!isNaN(disk[diskIndex]) && disk[diskIndex-1] !== disk[diskIndex]) {
            const mostLeftFittingFreeSpace = disk.findIndex((_, index, arr) => {
                for (let i = 0; i < fileLength; i++) {
                    if(arr[index+i] !== ".") return false;
                }
                return true;
            });

            if(mostLeftFittingFreeSpace !== -1 && mostLeftFittingFreeSpace < diskIndex) {
                for (let i = 0; i < fileLength; i++) {
                    disk[mostLeftFittingFreeSpace+i] = disk[diskIndex+i];
                    disk[diskIndex+i] = ".";
                }
            }

            fileLength = 0;
        }
    }

    const checksum = disk
        .reduce((acc, val, index) => isNaN(val) ? acc : acc += val * index, 0);

    console.log("09/02", checksum);
});
