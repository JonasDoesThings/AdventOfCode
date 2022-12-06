package main

import (
	"os"
	"strings"
)

func main() {
	file, _ := os.ReadFile("in.txt")
	splitInput := strings.Split(string(file), "")
	for i := range splitInput {
		set := map[string]bool{}
		for j := i; j < i+14; j++ {
			set[splitInput[j]] = true
		}
		if len(set) == 14 {
			println(i+14)
			break
		}
	}

}
