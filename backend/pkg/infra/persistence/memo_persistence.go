package persistence

import (
	"backend/pkg/domain/model/db"
	"backend/pkg/domain/repository"
	"backend/pkg/infra"
)

type memoPersistence struct{}

// Get implements repository.MemoRepository.
func (*memoPersistence) Get(db *infra.RDB) ([]*db.Memos, error) {
	panic("unimplemented")
}

func NewMemoPersistence() repository.MemoRepository {
	return &memoPersistence{}
}
