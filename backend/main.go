package main

import (
	"backend/pkg/infra"
	"backend/pkg/infra/persistence"
	"backend/pkg/interfaces/handler"
	"backend/pkg/usecase"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	db, err := infra.ConnRDB()
	if err != nil {
		log.Fatal("DB接続失敗")
		log.Fatal(err)
	}
	log.Print(db)

	memoUsecase := usecase.NewMemoUsecase(
		persistence.NewMemoPersistence(),
	)
	memoHandler := handler.NewHandler(memoUsecase, *db)

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.GET("/", hello)
	// memo画面
	e.GET("/memo", memoHandler.HandlerGet())
	e.POST("/memo", memoHandler.HandlerGet())
	e.DELETE("/memo", memoHandler.HandlerGet())
	// 家計簿画面
	// TBD

	e.Logger.Fatal(e.Start(":8080"))
}

func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
