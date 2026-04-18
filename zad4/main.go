package main

import (
	"weather-app/controller"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/weather", controller.GetWeather)
	e.Logger.Fatal(e.Start(":8080"))
}
