package boyermoore

import (
	"DNATrain/hd"
	"regexp"
)

func BoyerMoore(seq, pattern string) float64 {
	// check if seq and pattern are valid DNA sequences
	// possible return values: float between 0-1, -1 if error in regex, -2 if DNA is invalid
	regex, errRegex := regexp.Compile(`[^ACGT]`)

	if errRegex != nil {
		return -1 // invalid regex
	}

	seqChecked := regex.MatchString(seq)
	patternChecked := regex.MatchString(pattern)
	if seqChecked && patternChecked {
		return -2 // invalid DNA sequence
	}

	seqLength := len(seq)
	patternLength := len(pattern)

	// compute last occurrences of characters in pattern
	var last = make([]int, 128)
	for i := 0; i < 128; i++ {
		last[i] = -1
	}

	for i := 0; i < len(pattern); i++ {
		last[pattern[i]] = i
	}

	// search
	i := 0 // i start from index so that the first index of seq = last index of pattern
	if i > seqLength-1 {
		return -1
	}

	j := patternLength - 1
	var similarity float64 = 0
	var matching bool = false
	for next := true; next; next = i < seqLength {
		if i < patternLength-1 && !matching {
			// case for matching the prefix of seq to the suffix of pattern, starts with seq prefix length 1
			tempString := ""
			for k := 0; k < patternLength-i-1; k++ {
				tempString += "0"
			}
			tempString += string(seq[:i+1])
			sim := float64(patternLength-hd.HammingDistance(tempString, string(pattern))) / float64(patternLength)
			if sim > similarity {
				similarity = sim
			}
			i++
		} else if i > seqLength-1 {
			// case for matching the suffix of seq to the prefix of pattern, starts with seq suffix length patternLength - 1
			tempString := seq[i-patternLength+1:]
			for len(tempString) < patternLength {
				tempString += "0"
			}
			sim := float64(patternLength-hd.HammingDistance(tempString, string(pattern))) / float64(patternLength)
			if sim > similarity {
				similarity = sim
			}
			i++
		} else {
			if seq[i] == pattern[j] {
				matching = true
				if j == 0 {
					return 1
				}
				i--
				j--
			} else {
				// iterate through the rest of pattern to calculate Hamming distance
				matching = false
				tempString := seq[i-j : i]
				k1 := i
				k2 := j
				for k2 < patternLength {
					if pattern[k2] == seq[k1] {
						tempString += string(seq[k1])
					} else {
						tempString += "0"
					}
					k1++
					k2++
				}
				sim := float64(patternLength-hd.HammingDistance(tempString, string(pattern))) / float64(patternLength)
				if sim > similarity {
					similarity = sim
				}
				lo := last[seq[i]]
				var increase int
				if j > lo+1 {
					increase = lo + 1
				} else {
					increase = j
				}
				i += patternLength - increase
				j = patternLength - 1
			}
		}
	}
	return similarity
}
