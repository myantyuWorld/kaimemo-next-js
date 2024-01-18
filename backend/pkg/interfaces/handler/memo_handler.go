package handler

import (
	"backend/pkg/infra"
	"backend/pkg/usecase"
	"net/http"

	"github.com/labstack/echo/v4"
)

type MemoHandler interface {
	HandlerGet() echo.HandlerFunc
	HandlerPost() echo.HandlerFunc
	HandleDelete() echo.HandlerFunc
}

type memoHandler struct {
	memoUsecase usecase.MemoUsecase
	db          infra.RDB
}

// HandleDelete implements MemoHandler.
func (*memoHandler) HandleDelete() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.String(http.StatusOK, "delete memo")
	}
}

// HandlerGet implements MemoHandler.
func (*memoHandler) HandlerGet() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.String(http.StatusOK, "get memo")
	}
}

// HandlerPost implements MemoHandler.
func (*memoHandler) HandlerPost() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.String(http.StatusOK, "post memo")
	}
}

func NewHandler(memoUsecase usecase.MemoUsecase, db infra.RDB) MemoHandler {
	return &memoHandler{
		memoUsecase: memoUsecase,
		db:          db,
	}
}