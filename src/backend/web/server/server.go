package server

import (
	"backend/web/model"
	"backend/web/router"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func Init() {
	err := godotenv.Load(".env")
	if err != nil {
		panic(err)
	}

	e := echo.New()
	e.HTTPErrorHandler = httpErrorHandler
	router.Init(e)
}

func httpErrorHandler(err error, c echo.Context){
	
	res := new(model.Response)
	res.Success = false
	res.Message = ParseError(err)

	c.JSON(500, res)
}