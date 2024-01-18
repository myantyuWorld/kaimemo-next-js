package persistence

import (
	"backend/pkg/domain/model/db"
	"backend/pkg/domain/model/request"
	"backend/pkg/domain/repository"
	"backend/pkg/infra"
)

type memoPersistence struct{}

// Delete implements repository.MemoRepository.
func (*memoPersistence) Delete(db *infra.RDB, memoId uint64) (int, error) {
	panic("unimplemented")
}

// Post implements repository.MemoRepository.
func (*memoPersistence) Post(db *infra.RDB, memo *request.Memo) (*db.Memos, error) {
	panic("unimplemented")
}

// Get implements repository.MemoRepository.
func (*memoPersistence) Get(db *infra.RDB) ([]*db.Memos, error) {
	panic("unimplemented")
}

func NewMemoPersistence() repository.MemoRepository {
	return &memoPersistence{}
}
