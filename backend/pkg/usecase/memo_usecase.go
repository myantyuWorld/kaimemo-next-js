package usecase

import (
	"backend/pkg/domain/model/response"
	"backend/pkg/domain/repository"
	"backend/pkg/infra"
)

type MemoUsecase interface {
	Get(db *infra.RDB) ([]*response.Memo, error)
}

type memoUsecase struct {
	memoRepository repository.MemoRepository
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
