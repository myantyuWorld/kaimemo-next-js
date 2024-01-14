up:
	docker-compose up -d
# 停止
down:
	docker-compose down
exec-app:
	docker-compose exec app /bin/bash
exec-api:
	docker-compose exec api /bin/bash

