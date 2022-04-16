package server

import (
	"github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
)

func ParseError(err error) string {
	he, ok := err.(*echo.HTTPError)
	if ok {
		return he.Message.(string)
	}


	me, ok := err.(*mysql.MySQLError)
	if ok {
		return me.Error()
	}

	return err.Error()
}