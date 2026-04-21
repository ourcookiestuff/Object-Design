package proxy

import (
	"encoding/json"
	"fmt"
	"math"
	"net/http"
	"time"
	"weather-app/model"
)

type ApiResponse struct {
	Hourly struct {
		Time        []string  `json:"time"`
		Temperature []float64 `json:"temperature_2m"`
		WeatherCode []int     `json:"weather_code"`
	} `json:"hourly"`
}

func processDay(data ApiResponse, startIdx int, city string) model.Weather {
	maxTemp := -100.0
	minTemp := 100.0
	conditionCode := -1

	for i := startIdx; i < startIdx+24; i++ {
		t := data.Hourly.Temperature[i]
		if t > maxTemp {
			maxTemp = t
		}
		if t < minTemp {
			minTemp = t
		}
		c := data.Hourly.WeatherCode[i]
		if c > conditionCode {
			conditionCode = c
		}
	}

	dayTime, _ := time.Parse("2006-01-02T15:04", data.Hourly.Time[startIdx])

	return model.Weather{
		City:           city,
		Day:            dayTime,
		Conditions:     codeToDescription(conditionCode),
		TemperatureMax: int(math.Round(maxTemp)),
		TemperatureMin: int(math.Round(minTemp)),
	}
}

func GetWeatherData(city string, lat, lon float64) ([]model.Weather, error) {
	url := fmt.Sprintf(
		"https://api.open-meteo.com/v1/forecast?latitude=%f&longitude=%f&hourly=temperature_2m,weather_code&past_days=0&forecast_days=1",
		lat, lon,
	)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var apiData ApiResponse
	if err := json.NewDecoder(resp.Body).Decode(&apiData); err != nil {
		return nil, err
	}

	today := processDay(apiData, 0, city)

	return []model.Weather{today}, nil
}

func codeToDescription(code int) string {
	switch {
	case code == 0:
		return "Bezchmurnie"
	case code <= 2:
		return "Przeważnie słonecznie"
	case code == 3:
		return "Zachmurzenie"
	case code <= 49:
		return "Mgła"
	case code <= 59:
		return "Mżawka"
	case code <= 69:
		return "Deszcz"
	case code <= 79:
		return "Śnieg"
	case code <= 84:
		return "Przelotne opady"
	case code <= 99:
		return "Burza"
	default:
		return "Nieznane"
	}
}
