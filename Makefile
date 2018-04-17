.PHONY: screenshot.png all

all: screenshot.png

clean:
	-rm -rf screenshot.png

screenshot.png: index.html index.css index.js
	chromium-browser --headless --screenshot --allow-file-access-from-files index.html

prepare:
	sudo apt-get update; \
  sudo apt-get upgrade -y ;\
	sudo apt-get install chromium-browser -y

