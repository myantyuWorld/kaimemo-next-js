package response

type Memo struct {
	MemoId       uint64
	CategoryId   uint64
	CategoryName string
	Content      string
	Deleted      uint64
}
type MemoList []*Memo
