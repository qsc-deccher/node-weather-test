"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
class ComponentManager {
    constructor(onMessage, emit, websocketSend, componentFilter) {
        this.onMessage = onMessage;
        this.emit = emit;
        this.websocketSend = websocketSend;
        this.componentFilter = componentFilter;
        this.componentNames = [];
        this.getComponentsId = '';
        //event listener for handling websocket messages
        this.onMessage('message', (message) => {
            this.parseMessage(message);
        });
    }
    // get component names
    getComponentNames() {
        return this.componentNames;
    }
    setComponentNames(newComponents) {
        const names = newComponents.map((component) => component.Name);
        this.componentNames = names;
    }
    // a method for parsing messages
    parseMessage(message) {
        // check for getComponents response
        if ((message === null || message === void 0 ? void 0 : message.id) === this.getComponentsId) {
            this.handleComponentGetResponse(message.result);
        }
    }
    // a method for getting components
    getComponents() {
        // create id for getComponents request
        this.getComponentsId = (0, uuid_1.v4)();
        // send getComponents request for all components
        this.websocketSend((0, utils_1.createJSONRPCMessage)(constants_1.qrcMethods.components.getComponents, 'test', this.getComponentsId));
    }
    setComponentList(components) {
        this.componentList = components.reduce((acc, component) => {
            const { Name } = component;
            acc[Name] = component;
            return acc;
        }, {});
    }
    // // a method for handling getComponents response
    handleComponentGetResponse(result) {
        let checkedComponents = result;
        // check if componentList is empty
        if (!result.length) {
            this.emit('error', 'No components found');
        }
        // check if there is a filter
        if (this.componentFilter) {
            // filter components
            checkedComponents = result.filter(this.componentFilter);
        }
        // set component names
        this.setComponentNames(checkedComponents);
        // set component list
        this.setComponentList(checkedComponents);
        // emit event when all components have been added to componentList
        this.emit('componentsReceived', this.componentList);
    }
}
exports.default = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map