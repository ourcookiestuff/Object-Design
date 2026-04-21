package controller

import (
	"net/http"
	"weather-app/config"
	"weather-app/proxy"

	"github.com/labstack/echo/v4"
)

func GetWeather(c echo.Context) error {
	data, err := proxy.GetWeatherData("Warsaw", 52.2297, 21.0122)
	if err != nil {
		return c.JSON(http.StatusBadGateway, map[string]string{"error": "Failed to fetch weather data"})
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
