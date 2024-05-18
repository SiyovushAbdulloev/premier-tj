DC := docker compose exec
FPM := $(DC) php-fpm
NODE := $(DC) node
ARTISAN := $(FPM) php artisan

build:
	@docker compose build --no-cache

start:
	@docker compose up -d

stop:
	@docker compose stop

restart: stop start

setup: start composer-install migrate seed

run-test:
	@$(FPM) ./vendor/bin/pest

create-test:
	@$(FPM) php artisan make:test --pest

composer-install:
	@$(FPM) composer install

composer-dumpautoload:
	@$(FPM) composer dumpautoload

keygen:
	@$(ARTISAN) key:generate

clear:
	@$(ARTISAN) optimize:clear

cache-clear:
	@$(ARTISAN) cache:clear

fresh:
	@$(ARTISAN) migrate:fresh

migrate:
	@$(ARTISAN) migrate

rollback:
	@$(ARTISAN) migrate:rollback

seed:
	@$(ARTISAN) db:seed

bash:
	@$(FPM) bash

test:
	@$(ARTISAN) test
