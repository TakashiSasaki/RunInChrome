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
	console.log("result = " + result.result);
	chrome.kill();
  // ALL FOLLOWING CODE SNIPPETS HERE
})();

console.log(x);

