"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const constants_1 = require("../../constants");
const __1 = require("..");
const utils_1 = require("../../utils");
class ChangeGroupManager {
    constructor(changeGroupName, send, handleControlChanges, eventManager, newPollingRate) {
        this.send = send;
        this.handleControlChanges = handleControlChanges;
        this.eventManager = eventManager;
        this.newPollingRate = newPollingRate;
        this.changeGroupUpdateRequests = [];
        this.changeGroupId = (0, uuid_1.v4)();
        this.pollingManager = null;
        this.changeGroupComponents = [];
        this.changeGroupName = '';
        // listen for messages
        this.eventManager.on('message', (message) => {
            this.parseMessage(message);
        });
        // assign change group name
        this.changeGroupName = changeGroupName;
    }
    // getter for change group id
    get id() {
        return this.changeGroupId;
    }
    // getter for change group name
    get name() {
        return this.changeGroupName;
    }
    // setter for change group name
    set name(name) {
        this.changeGroupName = name;
    }
    // getter for components
    get components() {
        return this.changeGroupComponents;
    }
    // getter for polling service
    get polling() {
        return this.pollingManager;
    }
    // initialize the polling service
    initPollingManager() {
        // check if polling service is already initialized
        if (this.pollingManager) {
            // emit error
            this.eventManager.emit('error', 'Polling service already initialized');
            return;
        }
        // create polling service
        this.pollingManager = new __1.PollingManager(this.changeGroupId, this.send, this.newPollingRate);
    }
    // a method for parsing messages
    parseMessage(message) {
        var _a, _b;
        if ((message === null || message === void 0 ? void 0 : message.id) && this.changeGroupUpdateRequests.includes(message === null || message === void 0 ? void 0 : message.id)) {
            // if id exists & includes change group request, handle change group response
            this.handleChangeGroupResponse(message);
        }
        // check message for Changes & if message id is included in componentChangeGroupIds
        if (typeof message.result === 'object' && // Add type guard
            'Changes' in message.result && // Add type guard to ensure 'Changes' exists
            this.changeGroupId === ((_a = message === null || message === void 0 ? void 0 : message.result) === null || _a === void 0 ? void 0 : _a.Id)) {
            // if message has Changes, handle Changes
            /// use handleChangeGroupUpdate method
            this.handleControlChanges((_b = message === null || message === void 0 ? void 0 : message.result) === null || _b === void 0 ? void 0 : _b.Changes);
        }
    }
    // a method recieves components from control manager and grooms them into IComponentChangeGroup
    groomComponents(components) {
        // create empty array to hold groomed components
        let groomedComponents = [];
        // iterate through components
        Object.keys(components).forEach((componentName) => {
            // create component object
            const component = {
                Id: this.changeGroupId,
                Component: {
                    Name: componentName,
                    Controls: Object.keys(components[componentName].Controls).map((controlName) => ({
                        Name: controlName
                    }))
                }
            };
            // add component to groomedComponents
            groomedComponents = [...groomedComponents, component];
        });
        // return groomed components
        return groomedComponents;
    }
    // a method for creating change groups
    createChangeGroup(components) {
        // add components to change group
        this.changeGroupComponents = components;
        // iterate through components & add components to change group
        this.changeGroupComponents.forEach((component) => {
            // add component to change group
            this.addComponentToChangeGroup(component);
        });
    }
    // a method for adding components to change groups
    addComponentToChangeGroup(component) {
        // create request id
        const requestId = (0, uuid_1.v4)();
        // add request id to changeGroupUpdateRequests
        this.changeGroupUpdateRequests = [
            ...this.changeGroupUpdateRequests,
            requestId
        ];
        // send addComponentControl request
        this.send((0, utils_1.createJSONRPCMessage)(constants_1.qrcMethods.changeGroup.addComponentControl, component, requestId));
    }
    // a method for handling change group responses
    handleChangeGroupResponse(message) {
        // check if change group response is successful
        if (message.result) {
            // remove request id from changeGroupUpdateRequests
            this.changeGroupUpdateRequests = this.changeGroupUpdateRequests.filter((requestId) => requestId !== message.id);
            // if change group requests is empty, emit change group created event
            if (this.changeGroupUpdateRequests.length === 0) {
                this.eventManager.emit('componentChangeGroupCreated', this.changeGroupName);
            }
        }
        else {
            // emit error
            this.eventManager.emit('error', `Change group - ${this.changeGroupName} - request failed`);
        }
    }
    cleanUp() {
        // set changeGroupUpdateRequests to empty array
        this.changeGroupUpdateRequests = [];
        // set changeGroupComponents to empty array
        this.changeGroupComponents = [];
        // nullify the pollingManager
        if (this.pollingManager) {
            this.pollingManager.cleanUp();
            this.pollingManager = null;
        }
        // remove event manager
        this.eventManager = null;
        // reset changeGroupName
        this.changeGroupName = '';
    }
}
exports.default = ChangeGroupManager;
//# sourceMappingURL=ChangeGroupManager.js.map