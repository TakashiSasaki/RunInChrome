# RunInChrome

Run arbitrary JavaScript files in the Runtime of headless Chrome.

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
```$ runinchrome something.js```
```
{ type: 'object',
  subtype: 'date',
  className: 'Date',
  description: 'Thu Apr 19 2018 18:07:57 GMT+0900 (DST)',
  objectId: '{"injectedScriptId":1,"id":1}' }
```
You can give multiple script files. They are concatenated as the order in the command line.

## Other example
```$ cat something.js```
```
Object.keys(window).toString();
```
```$ runinchrome something.js```
```
{ type: 'string',
  value: 'postMessage,blur,focus,close,frames,self,window,parent,opener,top,length,closed,location,document,origin,name,history,locationbar,menubar,personalbar,scrollbars,statusbar,toolbar,status,frameElement,navigator,applicationCache,customElements,external,screen,innerWidth,innerHeight,scrollX,pageXOffset,scrollY,pageYOffset,screenX,screenY,outerWidth,outerHeight,devicePixelRatio,clientInformation,screenLeft,screenTop,defaultStatus,defaultstatus,styleMedia,onanimationend,onanimationiteration,onanimationstart,onsearch,ontransitionend,onwebkitanimationend,onwebkitanimationiteration,onwebkitanimationstart,onwebkittransitionend,isSecureContext,onabort,onblur,oncancel,oncanplay,oncanplaythrough,onchange,onclick,onclose,oncontextmenu,oncuechange,ondblclick,ondrag,ondragend,ondragenter,ondragleave,ondragover,ondragstart,ondrop,ondurationchange,onemptied,onended,onerror,onfocus,oninput,oninvalid,onkeydown,onkeypress,onkeyup,onload,onloadeddata,onloadedmetadata,onloadstart,onmousedown,onmouseenter,onmouseleave,onmousemove,onmouseout,onmouseover,onmouseup,onmousewheel,onpause,onplay,onplaying,onprogress,onratechange,onreset,onresize,onscroll,onseeked,onseeking,onselect,onstalled,onsubmit,onsuspend,ontimeupdate,ontoggle,onvolumechange,onwaiting,onwheel,onauxclick,ongotpointercapture,onlostpointercapture,onpointerdown,onpointermove,onpointerup,onpointercancel,onpointerover,onpointerout,onpointerenter,onpointerleave,onafterprint,onbeforeprint,onbeforeunload,onhashchange,onlanguagechange,onmessage,onmessageerror,onoffline,ononline,onpagehide,onpageshow,onpopstate,onrejectionhandled,onstorage,onunhandledrejection,onunload,performance,stop,open,alert,confirm,prompt,print,requestAnimationFrame,cancelAnimationFrame,requestIdleCallback,cancelIdleCallback,captureEvents,releaseEvents,getComputedStyle,matchMedia,moveTo,moveBy,resizeTo,resizeBy,getSelection,find,webkitRequestAnimationFrame,webkitCancelAnimationFrame,fetch,btoa,atob,setTimeout,clearTimeout,setInterval,clearInterval,createImageBitmap,scroll,scrollTo,scrollBy,onappinstalled,onbeforeinstallprompt,crypto,ondevicemotion,ondeviceorientation,ondeviceorientationabsolute,indexedDB,webkitStorageInfo,sessionStorage,localStorage,visualViewport,speechSynthesis,webkitRequestFileSystem,webkitResolveLocalFileSystemURL,openDatabase' }
 ```

