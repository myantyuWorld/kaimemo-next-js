
-- +migrate Up
CREATE TABLE IF NOT EXISTS categories (
  category_id int NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(128),
  created_by DATE NOT NULL,
  PRIMARY KEY (category_id)
);

-- SQLは実行できない
-- INSERT categories VALUE (1, "food", NOW());
-- INSERT categories VALUE (2, "necesary", NOW());
-- +migrate Down
DROP TABLE IF EXISTS categories;
