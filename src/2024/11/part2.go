package main

import (
	"fmt"
	"maps"
	"os"
	"strconv"
	"strings"
	"time"
)

/**
* evolution of my solution:
* 1. stupid slice-loop like in part1.ts (obviously way too slow)
* 2. using a map for caching the calculations/transformations
* 3. chunking the slice and using goroutines for parallel processing (sped-up things, but again still to slow)
* 4. using a linked list instead of a slice (way faster, but still maxed out at higher iterations, used-up my RAM)
* 5. instead of using a list with tons of elements which requires much RAM, use text/scanner for scanning the input string and building a single new string with each iteration by appending to it (even slower than the slices)
* 6. this final solution using a map
 */

func main() {
	file, _ := os.ReadFile("in.txt")
	stones := make(map[string]uint)
	for _, s := range strings.Split(strings.TrimSpace(string(file)), " ") {
		stones[s] = 1
	}

	stonesAfterStep1 := processInput(stones, 25, 0)
	stonesAfterStep1Count := uint(0)
	for num := range maps.Values(stonesAfterStep1) {
		stonesAfterStep1Count += num
	}
	fmt.Println("11/01", stonesAfterStep1Count)
	stonesAfterStep2 := processInput(stonesAfterStep1, 50, 25)
	stonesAfterStep2Count := uint(0)
	for num := range maps.Values(stonesAfterStep2) {
		stonesAfterStep2Count += num
	}
	fmt.Println("11/02", stonesAfterStep2Count)
}

func trimLeftZeroes(s string) string {
	trimmed := strings.TrimLeft(s, "0")
	if len(trimmed) == 0 {
		return "0"
	}
	return trimmed
}

func processInput(stones map[string]uint, blinks uint8, blinkIndexOffsetForPrinting uint8) map[string]uint {
	for blink := range blinks {
		startTime := time.Now()

		var newStones = make(map[string]uint)
		for stone, v := range maps.All(stones) {
			if stone == "0" {
				newStones["1"] += v
				continue
			}

			if len(stone)%2 == 0 {
				newStoneOne := trimLeftZeroes(stone[:len(stone)/2])
				newStoneTwo := trimLeftZeroes(stone[len(stone)/2:])
				newStones[newStoneOne] += v
				newStones[newStoneTwo] += v
				continue
			}

			stoneNum, _ := strconv.Atoi(stone)
			newStones[strconv.Itoa(stoneNum*2024)] += v
		}

		stones = newStones
		fmt.Println("finished iteration", blink+1+blinkIndexOffsetForPrinting, "in", time.Since(startTime))
	}

	return stones
}
