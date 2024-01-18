package db

import "time"

type Memos struct {
	MemoId     uint64
	CategoryId uint64
	Content    string
	Deleted    uint64
	CreatedAt  time.Time
}
