package router

import (
	"backend/web/handler"
	"os"

	"github.com/labstack/echo/v4"
)

func Init(e *echo.Echo)  {
	handler.Init()
	e.GET("/penyakit/get", handler.GetPenyakit)
	e.POST("/penyakit/create", handler.CreatePenyakit)
	e.GET("/test/get", handler.GetTest)
	e.POST("/test/create", handler.CreateTest)
	e.Logger.Fatal(e.Start(os.Getenv("PORT")))
}