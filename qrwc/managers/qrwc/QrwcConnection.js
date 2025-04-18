"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupQrwc = void 0;
const Qrwc_1 = require("./Qrwc");
const setupQrwc = ({ coreIpAddress, maxReconnectAttempts = 0, reconnectDelay = 500, componentFilter, pollingInterval, onError, onDisconnect, onStartComplete, onControlsUpdated, onComponentsReceived }) => {
    let reconnectAttempts = 0;
    let socket = null;
    const connectQrwc = () => __awaiter(void 0, void 0, void 0, function* () {
        socket = new WebSocket(`ws://${coreIpAddress}/qrc-public-api/v0`);
        const qrwc = new Qrwc_1.Qrwc();
        if (onError) {
            qrwc.on('error', (error) => onError(qrwc, error));
        }
        if (onDisconnect) {
            qrwc.on('disconnected', (event) => onDisconnect(qrwc, event));
        }
        if (onStartComplete) {
            qrwc.on('startComplete', () => onStartComplete(qrwc));
        }
        if (onControlsUpdated) {
            qrwc.on('controlsUpdated', (updatedComponent) => onControlsUpdated(qrwc, updatedComponent));
        }
        if (onComponentsReceived) {
            qrwc.on('componentsReceived', (components) => onComponentsReceived(qrwc, components));
        }
        socket.onopen = () => __awaiter(void 0, void 0, void 0, function* () {
            reconnectAttempts = 0;
            yield qrwc.attachWebSocket(socket);
            yield qrwc.start({
                componentFilter,
                pollingInterval
            });
        });
        socket.onerror = (error) => {
            onError && onError(qrwc, error);
            if (reconnectAttempts++ < maxReconnectAttempts) {
                setTimeout(connectQrwc, reconnectDelay);
            }
        };
    });
    connectQrwc();
    return { closeQrwc: () => socket === null || socket === void 0 ? void 0 : socket.close() }; // return an obj so we can add to it later w/o breaking changes
};
exports.setupQrwc = setupQrwc;
//# sourceMappingURL=QrwcConnection.js.map