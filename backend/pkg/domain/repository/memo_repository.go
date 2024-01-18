package repository

import (
	"backend/pkg/domain/model/db"
	"backend/pkg/infra"
)

type MemoRepository interface {
	Get(db *infra.RDB) ([]*db.Memos, error)
}
