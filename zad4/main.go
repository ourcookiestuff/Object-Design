package main

import (
	"weather-app/config"
	"weather-app/controller"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	config.InitDatabase()

	e := echo.New()
	e.Use(middleware.CORS())
	e.GET("/weather", controller.GetWeather)
	e.Logger.Fatal(e.Start(":8080"))
}
