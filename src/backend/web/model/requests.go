package model

type ReqCreatePenyakit struct {
	Nama string `json:"nama"`
	DNA  string `json:"dna"`
}

type ReqCreateTest struct {
	Nama           string `json:"nama"`
	MatchingMethod string `json:"matching_method"`
	NamaPenyakit   string `json:"nama_penyakit"`
	DNA            string `json:"dna"`
}

type MatchingMethod string

const (
	BoyerMoore MatchingMethod = "Boyer-Moore"
	KMP        MatchingMethod = "KMP"
)