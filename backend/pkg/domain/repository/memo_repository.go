package repository

import (
	dbmodel "backend/pkg/domain/model/db"
	"backend/pkg/infra"
)

type MemoRepository interface {
	Get(db *infra.RDB) ([]*dbmodel.Memos, error)
	Post(db *infra.RDB, memo *dbmodel.Memos) (*dbmodel.Memos, error)
	Delete(db *infra.RDB, memoId uint64) (int, error)
}
