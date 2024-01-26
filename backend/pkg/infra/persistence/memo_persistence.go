package persistence

import (
	dbmodel "backend/pkg/domain/model/db"
	"backend/pkg/domain/repository"
	"backend/pkg/infra"
	"errors"
	"log"
)

type memoPersistence struct{}

// Post implements repository.MemoRepository.
func (*memoPersistence) Post(db *infra.RDB, memo *dbmodel.Memos) (*dbmodel.Memos, error) {
	result := db.Create(memo)
	if result.Error != nil {
		return nil, errors.New("メモを追加できませんでした。")
	}
	return memo, nil
}

// Delete implements repository.MemoRepository.
func (*memoPersistence) Delete(db *infra.RDB, memoId uint64) (int, error) {
	panic("unimplemented")
}

// Get implements repository.MemoRepository.
func (*memoPersistence) Get(db *infra.RDB) ([]*dbmodel.Memos, error) {
	var memos []*dbmodel.Memos
	result := db.Find(&memos)
	if result.RowsAffected == 0 {
		log.Print("data not found!")
	}

	return memos, nil
}

func NewMemoPersistence() repository.MemoRepository {
	return &memoPersistence{}
}
