package main

import (
	"weather-app/config"
	"weather-app/controller"

	"github.com/labstack/echo/v4"
)

func main() {
	config.InitDatabase()

	e := echo.New()
	e.GET("/weather", controller.GetWeather)
	e.Logger.Fatal(e.Start(":8080"))
}
