package model

import (
	"time"
)

type Penyakit struct {
	Nama string  `json:"nama"`
	DNA string `json:"dna"`
}


type Test struct {
	Tanggal time.Time `json:"tanggal"`
	Nama string `json:"nama"`
	NamaPenyakit string `json:"nama_penyakit"`
	Kecocokan float64 `json:"kecocokan"`
	Hasil bool `json:"hasil"`
}


