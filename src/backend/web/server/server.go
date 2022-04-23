package server

import (
	"backend/web/model"
	"backend/web/router"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func Init() {
	godotenv.Load(".env")
	
	fmt.Println("Server is running on port " + os.Getenv("PORT"))

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