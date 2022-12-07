import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const lines = data.trim().split("\n");
    const fileTree: {[key: string]: any} = {};
    const directoryMetaData: {[key: string]: number} = {};
    const currentDirectory: string[] = [];
    let currentDirectoryRef: any = fileTree;
    let i = 0;
    while(i < lines.length) {
        if(lines[i].startsWith("$ cd ")) {
            const targetDir = lines[i].substring("$ cd ".length);
            if(targetDir === "..") {
                currentDirectory.pop();
                i++;
                continue;
            }

            currentDirectory.push(targetDir);
            let parentElement = fileTree;
            currentDirectory.forEach(pathElement => {
                if(!parentElement[pathElement]) {
                    parentElement[pathElement] = {};
                }
                parentElement = parentElement[pathElement];
                currentDirectoryRef = parentElement;
            });
            i++;
        } else if(lines[i].startsWith("$ ls")) {
            i++;
            while(i < lines.length && !lines[i].startsWith("$")) {
                if(lines[i].startsWith("dir ")) {
                    if(!currentDirectoryRef[lines[i].split(" ")[1]]) {
                        currentDirectoryRef[lines[i].split(" ")[1]] = {};
                    }
                } else {
                    const fileName = lines[i].split(" ")[1];
                    const fileSize = lines[i].split(" ")[0];
                    let path = "";
                    for (const pathPart of currentDirectory) {
                        path += pathPart + "/";
                        if(!directoryMetaData[path]) {
                            directoryMetaData[path] = 0;
                        }
                        directoryMetaData[path] += parseInt(fileSize);
                    }

                    currentDirectoryRef[fileName] = fileSize;
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
