export NODE_PATH=/usr/local/lib/node_modules

.PHONY: screenshot.png all date console consoleDate dateConsole

.SUFFIX: .js

vpath %.js sample/

all: date console consoleDate dateConsole window

date: date.js
	node runInChrome.nodejs $< 

console: console.js
	node runInChrome.nodejs $<

dateConsole: date.js console.js
	node runInChrome.nodejs $^

consoleDate: console.js date.js
	node runInChrome.nodejs $^

window: window.js
	node runInChrome.nodejs $^

clean:
	-rm -rf screenshot.png *lighthouse* *.swp

screenshot.png: index.html index.css index.js
	chromium-browser --headless --screenshot --allow-file-access-from-files index.html

prepare:
	sudo apt-get update; \
  sudo apt-get upgrade -y ;\
	sudo apt-get install chromium-browser -y ;\
	sudo npm update -g ;\
	sudo npm install -g chrome-launcher  chrome-remote-interface 


publish:
	npm publish

