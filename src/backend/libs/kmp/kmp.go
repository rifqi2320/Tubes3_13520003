package kmp

import (
	"DNATrain/hd"
	"regexp"
)

func KMP(seq, pattern string) float64 {
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

	// compute fail
	var fail = make([]int, patternLength)
	fail[0] = 0

	for i := 1; i < patternLength; i++ {
		j := fail[i-1]
		for j > 0 && pattern[i] != pattern[j] {
			j = fail[j-1]
		}
		if pattern[i] == pattern[j] {
			j++
		}
		fail[i] = j
	}

	// search
	i := 0 - patternLength + 1 // i start from index so that the first index of seq = last index of pattern
	j := 0
	var similarity float64 = 0
	var matching bool = false
	for i < seqLength {
		if i < 0 {
			// case for matching the prefix of seq to the suffix of pattern, starts with prefix length 1
			tempString := ""
			for k := 0; k < i*-1; k++ {
				tempString += "0"
			}
			tempString += string(seq[:patternLength+i])
			sim := float64(patternLength-hd.HammingDistance(tempString, string(pattern))) / float64(patternLength)
			if sim > similarity {
				similarity = sim
			}
			i++
		} else if i+patternLength > seqLength && !matching {
			// case for matching the suffix of seq to the prefix of pattern, starts with suffix length patternLength - 1
			tempString := seq[i:]
			for len(tempString) < patternLength {
				tempString += "0"
			}
			sim := float64(patternLength-hd.HammingDistance(tempString, string(pattern))) / float64(patternLength)
			if sim > similarity {
				similarity = sim
			}
			i++
		} else {
			// proper matching from the first character of the pattern
			if pattern[j] == seq[i] {
				matching = true
				if j == patternLength-1 {
					return 1
				}
				i++
				j++
			} else {
				matching = false
				// iterate through the rest of pattern to calculate Hamming distance
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
				if j > 0 {
					j = fail[j-1]
				} else {
					i++
				}
			}
		}
	}
	return similarity // similarity
}
