const chromeLauncher = require("chrome-launcher");

const paths = [
  "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
];

let port;

function ChromeDebuggerPort(){
  if(typeof ChromeDebuggerPort.promise === "undefined") {
    ChromeDebuggerPort.promise = new Promise((resolve, reject)=>{
      for(let i in paths) {
        console.log("ChromeDebuggerPort\t: " + paths[i]);
        chromeLauncher.launch({
          port: 21212,
          chromeFlags: [
          ],
          chromePath: paths[i],
          userDataDir: false,
          connectionPollInterval : 2,
          maxConnectionRetries: 1,
        }).then(chrome => {
          console.log("ChromeDebuggerPort\t: launch() succeeded.");
          resolve(chrome.port);
        }).catch(e => {
          console.log("ChromeDebuggerPort\t: launch() failed.");
          if(e.errno === "ECONNREFUSED") reject(e);
        });
      }//for
    });
  }//if

  this.getPort = ()=> {
    return ChromeDebuggerPort.promise;
  }//getPort

}//ChromeDebuggerPort

async function getRemoteDebuggingPort(){
  for(let i in paths) {
    console.log("getRemoteDebuggingPort\t: " + paths[i]);
    try {
      let chrome = await chromeLauncher.launch({
        port: 21212,
        chromeFlags: [
        ],
        chromePath: paths[i],
        userDataDir: false,
        connectionPollInterval : 2,
        maxConnectionRetries: 1,
      });
      console.log("getRemoteDebuggingPort\t: launch() returns " + typeof chrome);
      if(typeof chrome !== "undefined") {
        console.log("getRemoteDebuggingPort\t: port = " + chrome.port);
        console.log("getRemoteDebuggingPort\t: pid = " + chrome.pid);
        port = chrome.port;
        return port;
      } else {
        throw ("getRemoteDebuggingPort\t: launch() returned 'undefined'.");
      }
    }catch(e){
      console.log("getRemoteDebuggingPort\t: launch() throws " + e);
      if(e.errno === "ECONNREFUSED") {
        console.log("getRemoteDebuggingPort\t: Chrome is already running.");
        throw e;
      }
    }//try
  }//for

}//getRemoteDebuggingPort

if(module.parent === null) {
  const x = new ChromeDebuggerPort();
  x.getPort().then(port => console.log(port))
    .catch(e => console.log(e));
}//if

module.exports = ChromeDebuggerPort;

