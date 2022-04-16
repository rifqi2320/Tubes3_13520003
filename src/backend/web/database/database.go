package database

import (
	"database/sql"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func Connect() *sql.DB {
	db_url := os.Getenv("DB_URL")
	db, err := sql.Open("mysql", db_url)
	if err != nil {
		panic(err)
	}
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
	db.SetConnMaxLifetime(time.Second * 30)


	return db
}