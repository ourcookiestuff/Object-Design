package config

import (
	"log"
	"weather-app/model"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDatabase() {
	var err error
	DB, err = gorm.Open(sqlite.Open("weather.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Błąd połączenia z bazą:", err)
	}

	if err := DB.AutoMigrate(&model.Weather{}); err != nil {
		log.Fatal("Błąd migracji:", err)
	}
}
