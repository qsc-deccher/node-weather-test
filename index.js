
const { Qrwc } = require('./qrwc');
var WebSocket = require("ws");

function Wrapper(qrwc) {
  this.qrwc = qrwc;
  Object.defineProperties(this, {
    "gain": { "get": function() { return this.qrwc.components.Gain }},
    "gain1": { "get": function() { return this.qrwc.components.Gain_1 }},
    "gain2": { "get": function() { return this.qrwc.components.Gain_2 }},
  });
}

try {
  const youCoreIP = "127.0.0.1"
  const socket = new WebSocket(`ws://${youCoreIP}/qrc-public-api/v0`);
  const qrwc = new Qrwc();
  isStarted = false;

  const gain = "Gain";
  const gain1 = "Gain_1";
  const gain2 = "Gain_2";

  w = null;

  g = null;

  socket.onopen = async () => {
    await qrwc.attachWebSocket(socket)
    await qrwc.start({ componentFilter : (comp) => {
      return comp.Name === gain || comp.Name == gain1 || comp.Name === gain2;
    }});
    isStarted = true;
    w = new Wrapper(qrwc); 
    console.log(qrwc.components);
  }

  socket.onerror = (error) => {
    console.error("WebSocket error: ", error);

    setTimeout(() => {
      setupConnection();
    }, reconnectDelay);
  }

  console.log(qrwc)

  qrwc.on("controlsUpdated", (updatedComponent) => {
    if(!isStarted) return;
    if(updatedComponent == w.gain1 || updatedComponent == w.gain2 ) {
      console.log("gains are updated...");
      const g1 = w.gain1.Controls.gain.Value;
      const g2 = w.gain2.Controls.gain.Value;
      const avg =( g1 + g2 ) / 2;
      console.log(`gain1 ${g1} gain2 ${g2} avg ${avg}`)
      w.gain.Controls.gain.Value = avg;
    }
    console.log("controlsUpdated", updatedComponent)
  })  
}
catch(e)
{
  console.error("error in script " + e)
}

