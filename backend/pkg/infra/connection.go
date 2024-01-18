package infra

import (
	"fmt"
	"os"
	"time"

	driver "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type RDB struct {
	*gorm.DB
}

func ConnRDB() (*RDB, error) {
	user := os.Getenv("MYSQL_USER")
	pass := os.Getenv("MYSQL_PASSWORD")
	host := os.Getenv("MYSQL_HOST")
	dbname := os.Getenv("MYSQL_DATABASE")

	cfg := NewMySQLConfig(host, 3306, dbname, user, pass)
	db, err := gorm.Open(cfg.Dialector(), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect rdb: %w", err)
	}

	sql, err := db.DB()
	if err != nil {
		return nil, err
	}

	sql.SetConnMaxIdleTime(cfg.MaxIdleTime())
	sql.SetConnMaxLifetime(cfg.MaxLifetime())
	sql.SetMaxIdleConns(cfg.MaxIdle())
	sql.SetMaxOpenConns(cfg.MaxOpen())

	return &RDB{db}, nil
}

type DBConfig interface {
	Dialector() gorm.Dialector
	MaxIdleTime() time.Duration
	MaxLifetime() time.Duration
	MaxIdle() int
	MaxOpen() int
}

func NewMySQLConfig(host string, port int, database, user, password string) DBConfig {
	return &mySQLConfig{
		Host:     host,
		Port:     port,
		Database: database,
		User:     user,
		Password: password,
	}
}

type mySQLConfig struct {
	Host     string
	Port     int
	Database string
	User     string
	Password string
}

func (cfg *mySQLConfig) Dialector() gorm.Dialector {
	driverConfig := &driver.Config{
		User:                 cfg.User,
		Passwd:               cfg.Password,
		Net:                  "tcp",
		Addr:                 fmt.Sprintf("%s:%d", cfg.Host, cfg.Port),
		DBName:               cfg.Database,
		AllowNativePasswords: true,
		ParseTime:            true,
	}
	return mysql.Open(driverConfig.FormatDSN())
}

func (cfg *mySQLConfig) MaxIdleTime() time.Duration {
	return 0
}

func (cfg *mySQLConfig) MaxLifetime() time.Duration {
	return 0
}

func (cfg *mySQLConfig) MaxIdle() int {
	return 0
}

func (cfg *mySQLConfig) MaxOpen() int {
	return 0
}
