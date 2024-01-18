up:
	docker-compose up -d
# 停止
down:
	docker-compose down
ex-app:
	docker-compose exec app /bin/bash
ex-api:
	docker-compose exec backend /bin/bash
ex-db:
	docker-compose exec db /bin/bash

