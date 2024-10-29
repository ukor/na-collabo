
.DEFAULT_GOAL := default

default:
	@echo "Attach a target"


clean:
	pnpm nx reset
	rm -rf node_modules
	find . -name "pnpm-lock.yaml" -delete
	find . -type d -name "node_modules" -exec rm -rf {} +

install:
	pnpm install

build:
	pnpm nx run-many -t build --all

serve:
	pnpm nx run-many -t serve

git-sync:
	git pull origin main

sync: git-sync clean install

start-api-dev:
	pnpm nx run api:serve:development --verbose

start-api-stg:
	pnpm nx run api:serve:staging --verbose

build-api-prd:
	pnpm nx api:build:production

start-client-dev:
	pnpm nx run react_app:serve:development --verbose

start-client-stg:
	pnpm nx run react_app:serve:staging --verbose

build-client-prd:
	pnpm nx react_app:build:production


reset:
	pnpm nx reset

copy-load-balancer-config:
	sudo cp ./nginx/load_balance.nginx.conf /etc/nginx/site-available/
	sudo nginx -t 
	sudo systemctl reload nginx
	
restart-staging:
	git reset --hard
	pnpm nx reset
	pnpm install
	git pull origin main
	pnpm run reload:stg:api_gateway 

build-docs:
	pnpm nx run docs:build

start-docs:
	pnpm nx run docs:start --verbose
