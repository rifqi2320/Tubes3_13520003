package libs

import (
	"errors"
	"regexp"
	"strconv"
	"strings"
)

func indexOf(element string, data []string) (int) {
	for k, v := range data {
			if element == v {
					return k
			}
	}
	return -1
}

func SanitizeDNA(dna string) (error) {
	DNARegex := regexp.MustCompile(`^[ATCG]+$`)
	if !DNARegex.MatchString(dna) {
		return errors.New("invalid DNA format")
	}
	return nil
}


func SplitSearch(q string) (string, string, error) {
	dateRegex := regexp.MustCompile(`(?i)((\d{4})([-/\s])((0?[1-9])|(1[0-2])|(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember))([-/\s])(([0-2]?[0-9]|3[0-1]))|(([0-2]?[0-9]|3[0-1])([-/\s])((0?[1-9])|(1[0-2])|(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember))([-/\s])(\d{4})))`)
	
	months := []string{"januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"}
	dateSeparatorRegex := regexp.MustCompile(`[-/\s]`)
	yearRegex := regexp.MustCompile(`^(?i)(\d{4})$`)
	dateString := dateRegex.FindString(q)
	dateStrings := dateSeparatorRegex.Split(dateString, 3)

	if dateString == "" {
		return "", q, nil
	}

	if len(dateStrings) != 3 {
		return "", "", errors.New("invalid date format")
	}

	i := indexOf(strings.ToLower(dateStrings[1]), months)
	if i != -1 {
		dateStrings[1] = strconv.Itoa(i + 1)
	}

	name := strings.TrimSpace(strings.ReplaceAll(q, dateString, ""))


	if (yearRegex.MatchString(dateStrings[0])) {
		return strings.Join([]string{dateStrings[0], dateStrings[1], dateStrings[2]}, "/"), name, nil;
	} else {
		return strings.Join([]string{dateStrings[2], dateStrings[1], dateStrings[0]}, "/"), name, nil;
	}
}
