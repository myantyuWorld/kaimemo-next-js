package usecase

import (
	"backend/pkg/domain/model/request"
	"backend/pkg/domain/model/response"
	"backend/pkg/domain/repository"
	"backend/pkg/infra"
	"log"
)

type MemoUsecase interface {
	Get(db *infra.RDB) (*response.MemoList, error)
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
func (usecase *memoUsecase) Post(db *infra.RDB, memo *request.Memo) (*response.Memo, error) {
	panic("unimplemented")
}

// Get implements MemoUsecase.
func (usecase *memoUsecase) Get(db *infra.RDB) (*response.MemoList, error) {
	memos, err := usecase.memoRepository.Get(db)
	if err != nil {
		log.Print(err)
		return nil, err
	}
	// convert
	var memoList response.MemoList
	for _, v := range memos {
		item := response.Memo{
			MemoId:       v.MemoId,
			CategoryId:   v.CategoryId,
			CategoryName: "", // TODO : カテゴリのIDで、解決する処理（ロジックでもいい？）
			Content:      v.Content,
			Deleted:      v.Deleted,
		}
		memoList = append(memoList, &item)

	}
	return &memoList, nil
}

func NewMemoUsecase(
	repository repository.MemoRepository,
) MemoUsecase {
	return &memoUsecase{
		memoRepository: repository,
	}
}
