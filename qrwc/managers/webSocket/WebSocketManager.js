"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
class WebSocketManager {
    constructor(socket, eventManager) {
        this.socket = null;
        this.send = (data) => {
            if (this.socket !== null && this.isOpen()) {
                this.socket.send(JSON.stringify(data));
            }
            else {
                this.eventManager.emit(constants_1.qrwcEvents.error, 'WebSocket is not open or not initialized.');
            }
        };
        this.socket = socket;
        // main dependencies
        this.eventManager = eventManager;
        // binding websocket methods
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onClose.bind(this);
    }
    onMessage(event) {
        const message = JSON.parse(event.data);
        this.eventManager.emit(constants_1.qrwcEvents.message, message);
    }
    onError(error) {
        this.eventManager.emit(constants_1.qrwcEvents.error, error);
    }
    onClose(event) {
        this.eventManager.emit(constants_1.qrwcEvents.disconnected, event);
    }
    isOpen() {
        return this.getReadyState() === this.socket.OPEN;
    }
    getReadyState() {
        if (this.socket) {
            return this.socket.readyState;
        }
        else {
            this.eventManager.emit(constants_1.qrwcEvents.error, 'WebSocket is not initialized.');
        }
    }
    close(code, reason) {
        if (this.socket !== null && this.isOpen()) {
            // this.clearIntervals()
            // emit event for websocket close
            this.eventManager.emit(constants_1.qrwcEvents.disconnected, 'WebSocket closed.');
            this.socket.close(code, reason);
        }
        else {
            this.eventManager.emit(constants_1.qrwcEvents.error, 'WebSocket is not open or not initialized.');
        }
    }
    // a method to clean up the websocket
    cleanUp() {
        this.close();
    }
}
exports.default = WebSocketManager;
//# sourceMappingURL=WebSocketManager.js.map