package main

import (
	"backend/pkg/infra"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	db, err := infra.ConnRDB()
	if err != nil {
		log.Fatal("DB接続失敗")
		log.Fatal(err)
	}
	log.Print(db)

	e.GET("/", hello)

	e.Logger.Fatal(e.Start(":8080"))
}

func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
