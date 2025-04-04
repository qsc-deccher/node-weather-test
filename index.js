
const { Qrwc } = require('./qrwc');
var WebSocket = require("ws");

(async ()=>{
  const youCoreIP = "10.126.8.134"
  console.log("hello");
  const socket = new WebSocket(`ws://${youCoreIP}/qrc-public-api/v0`);
  const qrwc = new Qrwc();

  socket.onopen = async () => {
    await qrwc.attachWebSocket(socket)
    await qrwc.start();
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
    console.log("controlsUpdated", updatedComponent)
    // console.log("controlsUpdated", qrwc.components) // another option
  
    // This is when you application should update
  })  

})().catch(e=>{
  console.error("error in script " + e)
})
