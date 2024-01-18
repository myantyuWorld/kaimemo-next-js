package repository

import (
	"backend/pkg/domain/model/db"
	"backend/pkg/domain/model/request"
	"backend/pkg/infra"
)

type MemoRepository interface {
	Get(db *infra.RDB) ([]*db.Memos, error)
	Post(db *infra.RDB, memo *request.Memo) (*db.Memos, error)
	Delete(db *infra.RDB, memoId uint64) (int, error)
}
