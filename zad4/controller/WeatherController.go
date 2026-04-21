package controller

import (
	"net/http"
	"weather-app/config"
	"weather-app/proxy"

	"github.com/labstack/echo/v4"
)

func GetWeather(c echo.Context) error {
	city := c.QueryParam("city")

	var lat, lon float64

	switch city {
	case "Warsaw":
		lat, lon = 52.2297, 21.0122
	case "Cracow":
		lat, lon = 50.0614, 19.9366
	default:
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Unknown city",
		})
	}

	data, err := proxy.GetWeatherData(city, lat, lon)
	if err != nil {
		return c.JSON(http.StatusBadGateway, map[string]string{
			"error": "Failed to fetch weather",
		})
	}

	for _, weather := range data {
		var existingCount int64

		config.DB.Model(&weather).
			Where("city = ? AND day = ?", weather.City, weather.Day).
			Count(&existingCount)

		if existingCount == 0 {
			config.DB.Create(&weather)
		}

	}

	return c.JSON(http.StatusOK, data)
}
