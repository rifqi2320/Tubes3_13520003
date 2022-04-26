package server

import (
	"backend/web/model"
	"backend/web/router"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Init() {
	godotenv.Load(".env")
	
	fmt.Println("Server is running on port " + os.Getenv("PORT"))

	e := echo.New()
	e.HTTPErrorHandler = httpErrorHandler
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		}))

	router.Init(e)
}

func httpErrorHandler(err error, c echo.Context){
	
	res := new(model.Response)
	res.Success = false
	res.Message = ParseError(err)

	c.JSON(500, res)
}