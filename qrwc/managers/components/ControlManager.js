"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const ControlDecorator_1 = require("./ControlDecorator");
class ControlManager {
    constructor(webSocketSend, eventManager, changeRequestManager) {
        this.webSocketSend = webSocketSend;
        this.eventManager = eventManager;
        this.changeRequestManager = changeRequestManager;
        this.components = {};
        // callBack for changeRequestManager
        this.controlChangeCallback = (changes) => {
            // handle control changes
            this.handleControlChanges(changes);
        };
    }
    decorateControl(control) {
        return new ControlDecorator_1.ControlDecorator(control, this.setComponent.bind(this), this.eventManager.emit.bind(this.eventManager));
    }
    // a method for handling changes
    handleControlChanges(changes) {
        // if changes is empty, return
        if (changes.length === 0)
            return;
        // iterate through changes
        changes.forEach((change) => {
            // check if change is valid
            if (!(0, utils_1.isValidControlChange)(change)) {
                // if change is invalid, emit error
                this.eventManager.emit('error', 'Invalid change');
                return;
            }
            // find existing control
            const existingControl = this.getControl(change.Component, change.Name);
            // check if existing control exists
            if (existingControl) {
                // if existing control exists, update existing control
                const newControl = this.createUpdatedControl(existingControl.getProperties(), change);
                // update controls
                this.updateControls(newControl);
            }
            else {
                // emit error
                this.eventManager.emit('error', 'Connot update Control, existing Control not found');
            }
        });
    }
    // a setter for websocket send method
    setWebSocketSend(send) {
        // check if websocketManager is defined
        if (this.webSocketSend) {
            // emit error
            this.eventManager.emit('error', 'Websocket send already attached');
            return;
        }
        this.webSocketSend = send;
    }
    // a method for adding a new control to components
    updateControls(newControl) {
        // update component
        this.components = Object.assign(Object.assign({}, this.components), { [newControl.Component]: Object.assign(Object.assign({}, this.components[newControl.Component]), { Controls: Object.assign(Object.assign({}, this.components[newControl.Component].Controls), { [newControl.Name]: newControl }) }) });
        // emit component updated event
        this.eventManager.emit('controlsUpdated', this.components[newControl.Component]);
    }
    // a method for adding a new component to components
    addComponent(component, componentName) {
        // check if component exists
        if (this.components[componentName]) {
            // if component exists, emit error
            this.eventManager.emit('error', 'Component already exists');
            return;
        }
        // add component to components
        this.components = Object.assign(Object.assign({}, this.components), { [componentName]: component });
    }
    // a method for setting a control values for a components
    setComponent(componentName, controlToUpdate) {
        // create change request id
        const requestId = (0, uuid_1.v4)();
        const componentChange = {
            ResponseValues: true,
            Name: componentName,
            Controls: [controlToUpdate]
        };
        // create change request
        this.changeRequestManager.createChangeRequest(componentName, requestId, this.controlChangeCallback);
        // check if webSocketSend is defined
        if (!this.webSocketSend) {
            // if webSocketManager is not defined, emit error
            this.eventManager.emit('error', 'WebSocketManager is not defined');
            return;
        }
        // send setControlValue request
        this.webSocketSend((0, utils_1.createJSONRPCMessage)(constants_1.qrcMethods.components.set, componentChange, requestId));
    }
    // a method for retuning a existing control otherwise undefined
    getControl(componentName, controlName) {
        // check if component exists
        if (!this.components[componentName]) {
            // if component does not exist, emit error
            this.eventManager.emit('error', 'Component does not exist');
            return;
        }
        // check if control exists
        if (!this.components[componentName].Controls[controlName]) {
            // if control does not exist, emit error
            this.eventManager.emit('error', 'Control does not exist');
            return;
        }
        // return control
        return this.components[componentName].Controls[controlName];
    }
    // a method for creating a new decorated control based on both old and updated properties
    createUpdatedControl(oldControl, updatedControl) {
        // create new control
        const newControl = Object.assign(Object.assign({}, oldControl), updatedControl);
        // return decorated control
        return new ControlDecorator_1.ControlDecorator(newControl, this.setComponent.bind(this), this.eventManager.emit.bind(this.eventManager));
    }
    // a method for returning all component names
    getComponentNames() {
        return Object.keys(this.components);
    }
    // a method for returning all control names for a component
    getControlNamesByComponent(componentName) {
        return Object.keys(this.components[componentName]);
    }
    // a method for clean up
    cleanUp() {
        // reset components
        this.components = {};
    }
}
exports.default = ControlManager;
//# sourceMappingURL=ControlManager.js.map