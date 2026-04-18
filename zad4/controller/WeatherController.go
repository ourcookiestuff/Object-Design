package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type WeatherData struct {
	Temperature float64
	Humidity    int
	Description string
}

func GetWeather(c echo.Context) error {
	data := WeatherData{
		Temperature: 13.5,
		Humidity:    60,
		Description: "Słonecznie",
	}
	return c.JSON(http.StatusOK, data)
}
