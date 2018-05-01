const chromeLauncher = require("chrome-launcher");
const CDP = require("chrome-remote-interface");

const paths = [
  "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];

function launch(path, port){
  return new Promise((resolve, reject) => {
    console.log("tryPort\t: " + path);
    chromeLauncher.launch({
      port: port,
      chromeFlags: [
      ],
      chromePath: path,
      userDataDir: false,
      connectionPollInterval : 2,
      maxConnectionRetries: 1,
    }).then(chrome => {
      console.log("tryPort\t: launch() succeeded.");
      console.log("tryPort\t: port = " + chrome.port);
      console.log("tryPort\t: pid = " + chrome.pid);
      resolve(chrome);
    }).catch(e => {
      console.log("tryPort\t: launch() failed.");
      if(e.errno === "ECONNREFUSED") {
        reject(e);
      }//if
    });
  });
}//launch

function ChromeDebuggerPort(){

  if(typeof ChromeDebuggerPort.promise === "undefined") {
    ChromeDebuggerPort.promise = (async ()=> {
      for(let i in paths) {
        let chrome = await launch(paths[i], 22322);
        if(typeof chrome !== "undefined") {
          return chrome;
        }//if
      }//for
      throw "ChromeDebuggerPort\t: failed to invoke chrome.";
    })();
  } else {
    console.log("ChromeDebuggerPortPort\t: instance already exists.");
  }//if

  this.getChrome = ()=> {
    return ChromeDebuggerPort.promise;
  }//getChrome

  this.getPort = async ()=> {
    const chrome = await this.getChrome();
    return chrome.port;
  }//getPort

  this.listAllTargets = async (resolve, reject)=>{
    const port = await this.getPort();
    console.log("listAllTargets\t: port = " + port);
    return new Promise((resolve, reject) => {
      CDP.List({port:port}, (e, targets) => {
        if(e) {
          console.log("listAllTargets\t: "  + e);
          reject(e);
        } else {
          console.log("listAllTargets\t: " + targets);
          resolve(targets);
        }//if
      })//CDP.List
    })//Promise
  }//listAllTargets

  this.closeAllTabs = async () => {
    const targets = await this.listAllTargets();
    console.log("closeAllTabs\t: targets = " + targets);
    for(var i=0; i<targets.length; ++i) {
      const target = targets[i];
      console.log("closeAllTabs\t: target.id = " + target.id);
      await CDP.Close({port: await this.getPort(), id: target.id});
    }//for
  }//closeAllTabs

  this.getDevTools = async() =>{
    const port = await this.getPort();
    return new Promise((resolve, reject) => {
      CDP({port: port}, devtools => {
        resolve(devtools);
      }).on("error", e=> reject(e));
    });
  }//getDevTools

  this.navigate = async(url) => {
    const devTools = await this.getDevTools();
    const chrome = await this.getChrome();
    await devTools.Page.enable();
    await devTools.Runtime.enable();
    await devTools.Page.navigate({url: url}); 
    return new Promise((resolve, reject)=>{
      devTools.Page.loadEventFired(()=> {
        resolve({chrome: chrome, devtools: devTools});
      });
    });//Promise
  }//navigate

}//ChromeDebuggerPort

if(module.parent === null) {
  const x = new ChromeDebuggerPort();
  x.getPort()
    .then(port => console.log("ChromeDebuggerPort.js\t: port = " + port))
    .catch(e => console.log(e));
  x.navigate("http://www.yahoo.co.jp")
    .then(x=>console.log(x))
    .catch(e=>console.log(e));
  //x.closeAllTabs()
  //  .then(x=>console.log(x))
  //  .catch(e=>console.log(e));
}//if

module.exports = ChromeDebuggerPort;

