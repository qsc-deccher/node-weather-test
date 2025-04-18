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
exports.Qrwc = void 0;
const __1 = require("..");
const constants_1 = require("../../constants");
class Qrwc {
    constructor() {
        this.webSocketManager = null;
        this.startManager = null;
        this.changeGroupManagers = {};
        this.createStartManager = (validatedPollingInterval) => {
            // create StartManager instance
            this.startManager = new __1.StartManager(this.webSocketManager.send.bind(this.webSocketManager), this.componentManager, this.controlManager, this.eventManager, validatedPollingInterval);
        };
        this.createControlManager = () => {
            // create ControlManager instance
            this.controlManager = new __1.ControlManager(this.webSocketManager.send.bind(this.webSocketManager), this.eventManager, this.changeRequestManager);
        };
        this.createComponentManager = (componentFilter) => {
            // create ComponentManager instance
            this.componentManager = new __1.ComponentManager(this.eventManager.on.bind(this.eventManager), this.eventManager.emit.bind(this.eventManager), this.webSocketManager.send.bind(this.webSocketManager), componentFilter);
        };
        // main dependencies
        // create EventManager instance
        this.eventManager = new __1.EventManager();
        // create ChangeRequestManager instance
        this.changeRequestManager = new __1.ChangeRequestManager(this.eventManager);
        this.eventManager.on('disconnected', () => {
            // initate clean up
            this.qrwcCleanUp();
        });
    }
    // a getter method for components
    get components() {
        return this.controlManager.components;
    }
    // a method to create the websocket manager
    attachWebSocket(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // check if webSocketManager is defined
                if (this.webSocketManager) {
                    // reject promise for websocket already attached
                    reject(new Error('web socket already attached'));
                    return;
                }
                // create webSocketManager
                this.webSocketManager = new __1.WebSocketManager(socket, this.eventManager);
                // resolve promise for websocket attached
                resolve();
            });
        });
    }
    start({ componentFilter, pollingInterval } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // check start options
            const validatedComponentFilter = componentFilter && this.validateComponentFilter(componentFilter)
                ? componentFilter
                : null;
            const validatedPollingInterval = pollingInterval && this.validatePollingInterval(pollingInterval)
                ? pollingInterval
                : null;
            // check if webSocketManager is initialized
            if (!this.checkWebSocketManagerInitialized())
                return;
            // check if startManager is initialized
            if (this.checkStartManagerInitialized())
                return;
            this.createControlManager();
            this.createComponentManager(validatedComponentFilter);
            this.createStartManager(validatedPollingInterval);
            this.startManager.start();
            // Return a promise that resolves when the "startComplete" event is emitted
            return new Promise((resolve) => {
                this.eventManager.on('startComplete', () => {
                    resolve();
                });
            });
        });
    }
    // Helper function to validate component filter
    validateComponentFilter(componentFilter) {
        const isValid = typeof componentFilter === 'function' &&
            typeof componentFilter(constants_1.qrwcMockComponentGetResult) === 'boolean';
        if (!isValid) {
            this.eventManager.emit('error', 'Invalid componentFilter, using defaults');
        }
        return isValid;
    }
    // Helper function to validate polling interval
    validatePollingInterval(pollingInterval) {
        const isValid = typeof pollingInterval === 'number' &&
            pollingInterval >= constants_1.QrwcMinPollInterval;
        if (!isValid) {
            this.eventManager.emit('error', `Invalid pollingInterval, must be a number greater than ${constants_1.QrwcMinPollInterval}, using defaults`);
        }
        return isValid;
    }
    // Method to check if webSocketManager is initialized
    checkWebSocketManagerInitialized() {
        if (!this.webSocketManager) {
            this.eventManager.emit('error', 'web socket not initialized');
            return false;
        }
        return true;
    }
    // Method to check if startManager is initialized
    checkStartManagerInitialized() {
        if (this.startManager) {
            this.eventManager.emit('error', 'start already initialized');
            return true;
        }
        return false;
    }
    getReadyState() {
        return this.webSocketManager.getReadyState();
    }
    close() {
        this.webSocketManager.close();
    }
    // a method that decorates the .on method of the eventManager
    on(event, listener) {
        this.eventManager.on(event, listener);
    }
    // a method for initating clean up for QRWC
    qrwcCleanUp() {
        // remove all listeners from eventManager
        this.eventManager.removeAllEventListeners();
        // set eventManager to null
        this.eventManager = null;
        // check if webSocketManager is defined
        if (this.webSocketManager) {
            // initiate cleanup for webSocketManager
            this.webSocketManager.cleanUp();
            // set webSocketManager to null
            this.webSocketManager = null;
        }
        // check if startManager is defined
        if (this.startManager) {
            // initiate cleanUp for startManager
            this.startManager.cleanUp();
            // set startManager to null
            this.startManager = null;
        }
        // check if componentManager is defined
        if (this.componentManager) {
            // set componentManager to null
            this.componentManager = null;
        }
        // check if controlManager is defined
        if (this.controlManager) {
            // initiate cleanUp for controlManager
            this.controlManager.cleanUp();
            // set controlManager to null
            this.controlManager = null;
        }
        // check if changeRequestManager is defined
        if (this.changeRequestManager) {
            // initiate cleanUp for changeRequestManager
            this.changeRequestManager.cleanUp();
            // set changeRequestManager to null
            this.changeRequestManager = null;
        }
        // check if changeGroupManagers is defined
        if (this.changeGroupManagers) {
            // initiate cleanUp for each ChangeGroupManager
            for (const key in this.changeGroupManagers) {
                this.changeGroupManagers[key].cleanUp();
            }
            // set changeGroupManagers to null
            this.changeGroupManagers = null;
        }
    }
}
exports.Qrwc = Qrwc;
//# sourceMappingURL=Qrwc.js.map