const chromeLauncher = require("chrome-launcher");
const CDP = require("chrome-remote-interface");

async function doSomething() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      "--headless"
    ],
    chromePath: "chromium-browser"
  });

  console.log(Object.prototype.toString.apply(chrome));
  console.log(chrome);
  const protocol = await CDP({
    port: chrome.port
  });

  console.log(Object.prototype.toString.apply(protocol));
  console.log(JSON.stringify(Object.keys(protocol)));
  protocol.Runtime.enable();

  const result = await protocol.Runtime.evaluate({
    expression: "new Date();"
  });
  console.log(Object.keys(result.result));
  console.log(result.result.className);
  console.log(result.result.description);
  chrome.kill();

  // ALL FOLLOWING CODE SNIPPETS HERE
};

doSomething();

