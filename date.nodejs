const assert = require("myassert");

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
  assert.equal(result.result.className, "Date");
  console.log("type\t\t= " + result.result.type);
  console.log("subtype\t\t= " + result.result.subtype);
  console.log("className\t= " + result.result.className);
  console.log("description\t= " + result.result.description);
  console.log("objectId\t= " + result.result.objectId);
  chrome.kill();
};

doSomething();

