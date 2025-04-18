"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FrontendEvents_1 = __importDefault(require("./FrontendEvents"));
class EventManager {
    constructor() {
        this.emitter = new FrontendEvents_1.default();
    }
    on(event, listener) {
        this.emitter.on(event, listener);
    }
    emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }
    removeListener(event, listener) {
        this.emitter.removeListener(event, listener);
    }
    removeAllEventListeners() {
        this.emitter.removeAllListeners();
    }
}
exports.default = EventManager;
//# sourceMappingURL=EventManager.browser.js.map