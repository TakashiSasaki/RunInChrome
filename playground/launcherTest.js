const chromeLauncher = require("chrome-launcher");

chromePathCandidates = [
  "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
];

async function launchChrome(){
  var chrome;
  for(let i in chromePathCandidates) {
    console.log(chromePathCandidates[i]);
    try {
      chrome = await chromeLauncher.launch({
        port: 21212,
        chromeFlags: [
        ],
        chromePath: chromePathCandidates[i],
        userDataDir: false,
        connectionPollInterval : 2,
        maxConnectionRetries: 1,
      });
      console.log(typeof chrome);
      if(typeof chrome !== "undefined") return chrome;
    }catch(e){
      console.log(e);
    }//try
  }//for

}//launchChrome

launchChrome()
  .then(chrome => {
    console.log("succeeded.");
    console.log("chrome.port = " + chrome.port);
    console.log("chrome.pid = " + chrome.pid);
  })
.then(()=>console.log("exiting."))
.then(()=>process.exit());

