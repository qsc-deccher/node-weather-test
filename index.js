
const { Qrwc } = require('./qrwc');
var WebSocket = require("ws");

try {
  const youCoreIP = "10.126.8.134"
  console.log("hello");
  const socket = new WebSocket(`ws://${youCoreIP}/qrc-public-api/v0`);
  const qrwc = new Qrwc();

  socket.onopen = async () => {
    await qrwc.attachWebSocket(socket)
    await qrwc.start({ componentFilter : (comp) => {
      return comp.Name === "Gain_1" || comp.Name === "Gain_2";
    }});
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

    if(updatedComponent.ID === "Gain_1" || updatedComponent.ID === "Gain_2" ) {
      console.log("gains are updated...");
      if(qrwc.components?.Gain_1?.Controls?.gain && qrwc.components?.Gain_2?.Controls?.gain) {
        const g1 = qrwc.components.Gain_1.Controls.gain.Value;
        const g2 = qrwc.components.Gain_2.Controls.gain.Value;
        const avg =( g1 + g2 ) / 2;
        console.log(`gain1 ${g1} gain2 ${g2} avg ${avg}`)
        if(qrwc.components?.Gain?.Controls?.gain) qrwc.components.Gain.Controls.gain.Value = avg;
      }
    }
    console.log("controlsUpdated", updatedComponent)
  })  
}
catch(e)
{
  console.error("error in script " + e)
}

