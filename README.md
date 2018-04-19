# RunInChrome

Run arbitrary JavaScript file in the Runtime of headless Chrome.

# Installation
```
$ npm install -g runinchrome
```

## Prerequisits
```
 $ sudo apt-get update; \
 $ sudo apt-get upgrade -y ;\
 $ sudo apt-get install chromium-browser -y ;\
 $ sudo npm update -g ;\
 $ sudo npm install -g chrome-launcher  chrome-remote-interface
 ```
 See ```prepare``` target in ```Makefile``` for details.

## Usage
```$ cat something.js```
```
new Date();
```
```$ runInChrome something.js```
```
{ type: 'object',
  subtype: 'date',
  className: 'Date',
  description: 'Thu Apr 19 2018 18:07:57 GMT+0900 (DST)',
  objectId: '{"injectedScriptId":1,"id":1}' }
```
