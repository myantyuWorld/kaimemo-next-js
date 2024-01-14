# Dockerfile
FROM golang:1.21

# ログに出力する時間をJSTにするため、タイムゾーンを設定
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

ENV ROOT=/go/src/app
WORKDIR ${ROOT}

# ModuleモードをON
ENV GO111MODULE=on

COPY . .
EXPOSE 8080

# Airをインストールし、コンテナ起動時に実行する(Hot loader)
RUN go install github.com/cosmtrek/air@latest
# gorm | https://gorm.io/ | https://zenn.dev/shimpo/articles/go-echo-gorm-rest-api
RUN go get -u gorm.io/gorm && go get -u gorm.io/driver/mysql
# sqlmigrate
RUN go install github.com/rubenv/sql-migrate/...@latest
CMD ["air"]

# TODO: makeでsql-migrate実行したいが、エラーで転けてしまう | Migration failed: dial tcp 192.168.208.5:3306: connect: connection refused
# CMD sh -c "sql-migrate up && go run integration/seed/pets_seed.go && air"