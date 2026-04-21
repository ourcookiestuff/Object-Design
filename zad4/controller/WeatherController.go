package controller

import (
	"net/http"
	"weather-app/model"

	"github.com/labstack/echo/v4"
)

func GetWeather(c echo.Context) error {
	data := model.Weather{
		Temperature: 13.5,
		Humidity:    60,
		Description: "Słonecznie",
	}
	return c.JSON(http.StatusOK, data)
}
