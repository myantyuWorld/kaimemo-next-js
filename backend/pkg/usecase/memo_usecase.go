package usecase

import (
	"backend/pkg/domain/model/request"
	"backend/pkg/domain/model/response"
	"backend/pkg/domain/repository"
	"backend/pkg/infra"
)

type MemoUsecase interface {
	Get(db *infra.RDB) ([]*response.Memo, error)
	Post(db *infra.RDB, memo *request.Memo) (*response.Memo, error)
	Delete(db *infra.RDB, int uint64) (int, error)
}

type memoUsecase struct {
	memoRepository repository.MemoRepository
}

// Delete implements MemoUsecase.
func (*memoUsecase) Delete(db *infra.RDB, int uint64) (int, error) {
	panic("unimplemented")
}

// Post implements MemoUsecase.
func (*memoUsecase) Post(db *infra.RDB, memo *request.Memo) (*response.Memo, error) {
	panic("unimplemented")
}

// Get implements MemoUsecase.
func (*memoUsecase) Get(db *infra.RDB) ([]*response.Memo, error) {
	panic("unimplemented")
}

func NewMemoUsecase(
	repository repository.MemoRepository,
) MemoUsecase {
	return &memoUsecase{
		memoRepository: repository,
	}
}
