install: 
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
lint-frontend:
	make -C frontend lint

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build
