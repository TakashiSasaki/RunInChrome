const chromeLauncher = require("chrome-launcher");

chromePathCandidates = [
  "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
];

async function getRemoteDebuggingPort(){
  for(let i in chromePathCandidates) {
    console.log("getRemoteDebuggingPort\t: " + chromePathCandidates[i]);
    try {
      let chrome = await chromeLauncher.launch({
        port: 21212,
        chromeFlags: [
        ],
        chromePath: chromePathCandidates[i],
        userDataDir: false,
        connectionPollInterval : 2,
        maxConnectionRetries: 1,
      });
      console.log("getRemoteDebuggingPort\t: launch() returns " + typeof chrome);
      if(typeof chrome !== "undefined") {
        console.log("getRemoteDebuggingPort\t: port = " + chrome.port);
        console.log("getRemoteDebuggingPort\t: pid = " + chrome.pid);
        return chrome.port;
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
  getRemoteDebuggingPort()
    .then(port => {
      console.log(port);
      process.exit();
    });
}//if

module.exports.getRemoteDebuggingPort = getRemoteDebuggingPort;

