install: #Перовое клонирование репозитория
	npm ci

publish: #Публикация пакета
	npm publish --dry-run

lint:	#Проверка линтером
	npx eslint .

link: # Установка пакета
	npm link