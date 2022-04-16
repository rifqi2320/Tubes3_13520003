package hd

func HammingDistance(str1, str2 string) int {
	var distance int
	for i := 0; i < len(str1); i++ {
		if str1[i] != str2[i] {
			distance++
		}
	}
	return distance
}
