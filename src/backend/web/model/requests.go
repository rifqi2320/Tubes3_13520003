package model

type ReqCreatePenyakit struct {
	Nama string `json:"nama"`
	DNA  string `json:"dna"`
}

type ReqCreateTest struct {
	Nama         string `json:"nama"`
	NamaPenyakit string `json:"nama_penyakit"`
	DNA          string `json:"dna"`
}