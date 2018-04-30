const getRemoteDebuggingPort = require("./getRemoteDebuggingPort.js").getRemoteDebuggingPort;

const CDP = require("chrome-remote-interface");

async function getDevTools(){
  const port = await getRemoteDebuggingPort();
  return new Promise((resolve, reject) =>{
    CDP({port:port}, devtools => resolve(devtools))
      .on("error", e => reject(e));
  });
}//getDevTools

async function closeAllTabs(){
  const port = await getRemoteDebuggingPort();
  CDP.List({port:port}, (e, targets) => {
    if(e) throw (e);
    targets.forEach( target => {
      CDP.Close({port: port, id: target.id});
    });
  });
}//closeAllTabs

if(module.parent === null) {
  getDevTools()
    .then(x => console.log(typeof x))
    .catch(e => console.log(typeof e));
  closeAllTabs()
    .then(x => console.log(typeof x))
    .catch(e => console.log(typeof e));
}

