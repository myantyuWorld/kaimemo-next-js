
-- +migrate Up
CREATE TABLE IF NOT EXISTS memos (
  memo_id int NOT NULL AUTO_INCREMENT,
  category_id int NOT NULL,
  content VARCHAR(128) NOT NULL,
  deleted int NOT NULL,
  created_at DATE NOT NULL,
  PRIMARY KEY (memo_id),
  FOREIGN KEY category_id_foreign_key (category_id) REFERENCES categories (category_id)
);

-- +migrate Down
DROP TABLE IF EXISTS memos;