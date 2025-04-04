"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FrontendEventEmitter {
    constructor() {
        this.eventTarget = new EventTarget();
        this.listeners = new Map();
    }
    on(event, listener) {
        const wrappedListener = (e) => {
            listener(...e.detail);
        };
        this.listeners.set(listener, wrappedListener);
        this.eventTarget.addEventListener(event, wrappedListener);
    }
    emit(event, ...args) {
        const eventToDispatch = new CustomEvent(event, { detail: args });
        this.eventTarget.dispatchEvent(eventToDispatch);
    }
    removeListener(event, listener) {
        const wrappedListener = this.listeners.get(listener);
        if (wrappedListener) {
            this.eventTarget.removeEventListener(event, wrappedListener);
            this.listeners.delete(listener);
        }
    }
    removeAllListeners() {
        this.eventTarget = new EventTarget();
        this.listeners.clear();
    }
}
exports.default = FrontendEventEmitter;
//# sourceMappingURL=FrontendEvents.js.map