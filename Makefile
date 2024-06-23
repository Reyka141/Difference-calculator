install: 
	npx ci
	
publish: #Публикация пакета
	npm publish --dry-run

lint:	#Проверка линтером
	npx eslint .

link: # Установка пакета
	npm link

test: 
	npm test

test-coverage: 
	npm test -- --coverage --coverageProvider=v8

.PHONY: test