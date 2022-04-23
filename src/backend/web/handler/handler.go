package handler

import (
	"backend/libs"
	"backend/web/database"
	"backend/web/model"
	"database/sql"
	"time"

	"github.com/labstack/echo/v4"
)

var db *sql.DB

func Init() {
	db = database.Connect()
}

func CreatePenyakit(c echo.Context) error {
	res := new(model.Response)
	req := new(model.ReqCreatePenyakit)
	if err := c.Bind(req); err != nil {
		return err
	}
	_, err := db.Exec("INSERT INTO penyakit (nama, dna) VALUES (?, ?)", req.Nama, req.DNA)
	if err != nil {
		return err
	}
	res.Success = true
	res.Message = "Penyakit berhasil ditambahkan"

	return c.JSON(200, res)
}

func GetPenyakit(c echo.Context) (err error) {
	res := new(model.Response)
	listPenyakit := &[]model.Penyakit{}
	result, err := db.Query("SELECT * FROM penyakit")
	if err != nil {
		return err
	}
	for result.Next() {
		var penyakit model.Penyakit
		err = result.Scan(&penyakit.Nama, &penyakit.DNA)
		if err != nil {
			return err
		}
		*listPenyakit = append(*listPenyakit, penyakit)
	}
	res.Success = true
	res.Data = listPenyakit
	err = c.JSON(200, res)
	if err != nil {
		return err
	}
	return nil
}

func GetTest(c echo.Context) (err error) {
	res := new(model.Response)
	listTest := &[]model.Test{}
	result, err := db.Query("SELECT * FROM test")
	if err != nil {
		return err
	}
	for result.Next() {
		var test model.Test
		err = result.Scan(&test.Tanggal, &test.Nama, &test.NamaPenyakit, &test.Kecocokan, &test.Hasil)
		if err != nil {
			return err
		}

		*listTest = append(*listTest, test)
	}
	res.Success = true
	res.Data = listTest
	err = c.JSON(200, res)
	if err != nil {
		return err
	}
	return nil
}

func CreateTest(c echo.Context) (err error) {
	res := new(model.Response)
	req := new(model.ReqCreateTest)
	penyakit := new(model.Penyakit)
	test := new(model.Test)

	if err := c.Bind(req); err != nil {
		return err
	}

	result, err := db.Query("SELECT * FROM penyakit WHERE nama = ?", req.NamaPenyakit)
	if err != nil {
		return err
	}
	result.Next()
	err = result.Scan(&penyakit.Nama, &penyakit.DNA)
	switch err {
	case sql.ErrNoRows:
		res.Success = false
		res.Message = "Penyakit tidak ditemukan"
		return c.JSON(404, res)
	case nil:
		test.Nama = req.Nama
		test.NamaPenyakit = req.NamaPenyakit
		test.Tanggal = time.Now()
		if (req.MatchingMethod == "KMP") {
			test.Kecocokan = libs.KMP(req.DNA,penyakit.DNA)
		} else {
			test.Kecocokan = libs.BoyerMoore(req.DNA,penyakit.DNA)
		}
		test.Hasil = test.Kecocokan > 0.8
	default:
		return err
	}

	

	_, err = db.Exec("INSERT INTO test (tanggal, nama, nama_penyakit, kecocokan, cocok) VALUES (?, ?, ?, ?, ?)", test.Tanggal, test.Nama, test.NamaPenyakit, test.Kecocokan, test.Hasil)

	if err != nil {
		return err
	}

	res.Success = true
	res.Message = "Test berhasil ditambahkan"
	res.Data = test

	return c.JSON(200, res)
}