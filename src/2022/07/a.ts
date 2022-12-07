import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const lines = data.trim().split("\n");
    const directoryMetaData: {[key: string]: number} = {};
    const currentDirectory: string[] = [];
    let i = 0;

    while(i < lines.length) {
        if(lines[i].startsWith("$ cd ")) {
            const targetDir = lines[i].substring("$ cd ".length);
            if(targetDir === "..") {
                currentDirectory.pop();
            } else {
                currentDirectory.push(targetDir);
            }

            i++;
        } else if(lines[i].startsWith("$ ls")) {
            i++;
            while(i < lines.length && !lines[i].startsWith("$")) {
                if(!lines[i].startsWith("dir ")) {
                    const fileSize = lines[i].split(" ")[0];
                    let path = "";
                    for (const pathPart of currentDirectory) {
                        path += pathPart + "/";
                        if(!directoryMetaData[path]) {
                            directoryMetaData[path] = 0;
                        }
                        directoryMetaData[path] += parseInt(fileSize);
                    }
                }
                i++;
            }
        }
    }

    const sum = Object.keys(directoryMetaData).reduce((accumulator, key) => {
        if(directoryMetaData[key] < 100000) {
            return accumulator + directoryMetaData[key];
        }
        return accumulator;
    }, 0);

    console.log(sum);
});
