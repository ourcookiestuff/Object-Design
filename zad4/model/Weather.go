package model

import "gorm.io/gorm"

type Weather struct {
	gorm.Model
	Temperature float64
	Humidity    int
	Description string
}
