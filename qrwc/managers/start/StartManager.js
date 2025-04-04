"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const __1 = require("..");
class StartManager {
    constructor(websocketSend, componentManager, controlManager, eventManager, newPollingRate) {
        this.websocketSend = websocketSend;
        this.componentManager = componentManager;
        this.controlManager = controlManager;
        this.eventManager = eventManager;
        this.newPollingRate = newPollingRate;
        this.getControlIds = [];
        this.startChangeGroupId = 'StartChangeGroup';
        this.changeGroupManager = null;
        this.componentFilter = null;
        // main dependencies
        this.controlManager = controlManager;
        this.eventManager = eventManager;
        //event listener for handling websocket messages
        this.eventManager.on(constants_1.qrwcEvents.message, (message) => {
            this.parseMessage(message);
        });
        this.eventManager.on(constants_1.qrwcEvents.componentsReceived, (components) => {
            this.getControls(components);
        });
        this.eventManager.on(constants_1.qrwcEvents.controlsReceived, () => {
            this.createStartChangeGroup();
        });
        // listen for change group created event
        this.eventManager.on(constants_1.qrwcEvents.componentChangeGroupCreated, (changeGroupId) => {
            // check if change group id matches startChangeGroupId
            if (changeGroupId === this.startChangeGroupId && this.changeGroupManager) {
                // create start change group polling service
                this.createStartChangePollingManager();
            }
        });
    }
    // a method for parsing messages
    parseMessage(message) {
        // check for getControls response
        if (this.getControlIds.includes(message === null || message === void 0 ? void 0 : message.id)) {
            this.handleControlGetResponse(message.result, message.id);
        }
    }
    // a method for kicking off the getComponents process
    start() {
        this.componentManager.getComponents();
    }
    // a method for getting controls
    getControls(components) {
        // get component names
        const componentNames = Object.keys(components);
        // set components in control manager
        this.controlManager.components = components;
        // iterate through components list
        componentNames.forEach((component) => {
            const id = (0, uuid_1.v4)();
            // send getControls request for each component with id
            this.websocketSend((0, utils_1.createJSONRPCMessage)(constants_1.qrcMethods.components.getControls, { Name: component }, id));
            // add id to getControlIds
            this.getControlIds = [...this.getControlIds, id];
        });
    }
    // a method for handling getControls response
    handleControlGetResponse(result, id) {
        // check if the results has "Name" and "Controls" populated
        if ((result === null || result === void 0 ? void 0 : result.Name) && (result === null || result === void 0 ? void 0 : result.Controls)) {
            // reformat controls into object
            result.Controls.forEach((control) => {
                // decorate control
                const decoratedControl = this.controlManager.decorateControl(Object.assign(Object.assign({}, control), { Component: result.Name }));
                // set control
                this.controlManager.updateControls(decoratedControl);
            });
        }
        // remove id from getControlIds
        this.getControlIds = this.getControlIds.filter((getId) => getId !== id);
        // check if getControlIds is empty
        if (this.getControlIds.length === 0) {
            // emit event
            this.eventManager.emit(constants_1.qrwcEvents.controlsReceived);
        }
    }
    // a method for creating change groups
    createStartChangeGroup() {
        // create change group service
        this.changeGroupManager = new __1.ChangeGroupManager(this.startChangeGroupId, this.websocketSend, this.controlManager.handleControlChanges.bind(this.controlManager), this.eventManager, this.newPollingRate);
        // groom components for change group
        const groomedComponents = this.changeGroupManager.groomComponents(this.controlManager.components);
        // create change group
        this.changeGroupManager.createChangeGroup(groomedComponents);
    }
    // a method for creating start change group polling service
    createStartChangePollingManager() {
        // init polling service
        this.changeGroupManager.initPollingManager();
        const { polling } = this.changeGroupManager;
        // check if polling service is initialized
        if (polling) {
            // start polling service
            this.changeGroupManager.polling.start();
        }
        // emit event for start complete
        this.eventManager.emit(constants_1.qrwcEvents.startComplete);
    }
    // a method for cleaning up the start manager
    cleanUp() {
        // clear getControlIds
        this.getControlIds = [];
        // clear startChangeGroupId
        this.startChangeGroupId = '';
        // stop ongoing polling and cleanup changeGroupManager
        if (this.changeGroupManager) {
            this.changeGroupManager.cleanUp();
            this.changeGroupManager = null;
        }
        // set controlManager to null
        this.controlManager = null;
        // set eventManager to null
        this.eventManager = null;
    }
}
exports.default = StartManager;
//# sourceMappingURL=StartManager.js.map