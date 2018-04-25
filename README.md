# RunInChrome

Run arbitrary JavaScript files in the Runtime of headless Chrome.

This package is not well tested in other than my environment.
Please let me know any issues.

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
```$ cat sample/date.js```
```
new Date();
```
```$ runinchrome sample/date.js```
```
{
    "result": {
        "type": "object",
        "subtype": "date",
        "className": "Date",
        "description": "Tue Apr 24 2018 13:58:56 GMT+0900 (DST)",
        "objectId": "{\"injectedScriptId\":1,\"id\":1}"
    },
    "log": []
}
```
`result` shows the value of the expression which is evaluated last.
You can give multiple script files. They are concatenated as the order in the command line.

## Support for console.log
```cat sample/console.js```
```
console.log("sample/console.js\t: hello");
```
```runinchrome sample/console.js```
```
{
    "result": {
        "type": "undefined"
    },
    "log": [
        "sample/console.js\t: hello"
    ]
}
```

## Other example
```$ cat window.js```
```
Object.keys(window).toString();
```
```$ runinchrome sample/window.js```
```
{
    "result": {
        "type": "string",
        "value": "postMessage,blur,focus,close,frames,self,window,parent,opener,top,length,closed,location,document,origin,name,history,locationbar,menubar,personalbar,scrollbars,statusbar,toolbar,status,frameElement,navigator,applicationCache,customElements,external,screen,innerWidth,innerHeight,scrollX,pageXOffset,scrollY,pageYOffset,screenX,screenY,outerWidth,outerHeight,devicePixelRatio,clientInformation,screenLeft,screenTop,defaultStatus,defaultstatus,styleMedia,onanimationend,onanimationiteration,onanimationstart,onsearch,ontransitionend,onwebkitanimationend,onwebkitanimationiteration,onwebkitanimationstart,onwebkittransitionend,isSecureContext,onabort,onblur,oncancel,oncanplay,oncanplaythrough,onchange,onclick,onclose,oncontextmenu,oncuechange,ondblclick,ondrag,ondragend,ondragenter,ondragleave,ondragover,ondragstart,ondrop,ondurationchange,onemptied,onended,onerror,onfocus,oninput,oninvalid,onkeydown,onkeypress,onkeyup,onload,onloadeddata,onloadedmetadata,onloadstart,onmousedown,onmouseenter,onmouseleave,onmousemove,onmouseout,onmouseover,onmouseup,onmousewheel,onpause,onplay,onplaying,onprogress,onratechange,onreset,onresize,onscroll,onseeked,onseeking,onselect,onstalled,onsubmit,onsuspend,ontimeupdate,ontoggle,onvolumechange,onwaiting,onwheel,onauxclick,ongotpointercapture,onlostpointercapture,onpointerdown,onpointermove,onpointerup,onpointercancel,onpointerover,onpointerout,onpointerenter,onpointerleave,onafterprint,onbeforeprint,onbeforeunload,onhashchange,onlanguagechange,onmessage,onmessageerror,onoffline,ononline,onpagehide,onpageshow,onpopstate,onrejectionhandled,onstorage,onunhandledrejection,onunload,performance,stop,open,alert,confirm,prompt,print,requestAnimationFrame,cancelAnimationFrame,requestIdleCallback,cancelIdleCallback,captureEvents,releaseEvents,getComputedStyle,matchMedia,moveTo,moveBy,resizeTo,resizeBy,getSelection,find,webkitRequestAnimationFrame,webkitCancelAnimationFrame,fetch,btoa,atob,setTimeout,clearTimeout,setInterval,clearInterval,createImageBitmap,scroll,scrollTo,scrollBy,onappinstalled,onbeforeinstallprompt,crypto,ondevicemotion,ondeviceorientation,ondeviceorientationabsolute,indexedDB,webkitStorageInfo,sessionStorage,localStorage,visualViewport,speechSynthesis,webkitRequestFileSystem,webkitResolveLocalFileSystemURL,openDatabase"
    },
    "log": []
}
```

## Code

### Source code at GitHub
https://github.com/TakashiSasaki/RunInChrome

### Package at npm
https://www.npmjs.com/package/runinchrome

## Changelog
0.1.2 Support console.log

