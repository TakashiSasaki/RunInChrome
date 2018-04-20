export NODE_PATH=/usr/local/lib/node_modules

.PHONY: screenshot.png all date console consoleDate dateConsole

all: date console consoleDate dateConsole window

date:
	node runInChrome.nodejs date.js

console:
	node runInChrome.nodejs console.js

dateConsole:
	node runInChrome.nodejs date.js console.js

consoleDate:
	node runInChrome.nodejs console.js date.js

window:
	node runInChrome.nodejs window.js

clean:
	-rm -rf screenshot.png *lighthouse*

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

