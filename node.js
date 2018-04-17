const chromeLauncher = require("chrome-launcher");
const CDP = require("chrome-remote-interface");

var x = (async function() {
  async function launchChrome() {
    return await chromeLauncher.launch({
      chromeFlags: [
        "--headless"
      ],
      chromePath: "chromium-browser"
    });
  }//launchChrome

  const chrome = await launchChrome();
  const protocol = await CDP({
    port: chrome.port
  });

  console.log(JSON.stringify(Object.keys(protocol)));
  chrome.kill();
  // ALL FOLLOWING CODE SNIPPETS HERE
})();

console.log(x);

