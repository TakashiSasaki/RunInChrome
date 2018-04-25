const chromeLauncher = require("chrome-launcher");

async function launchChrome(){
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
    ],
    chromePath: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
  });

}//launchChrome

launchChrome().then(()=>console.log("succeeded."))
.catch((e)=>console.log(e));

