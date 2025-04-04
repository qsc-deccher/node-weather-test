"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
class ChangeRequestManager {
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.changeRequestIds = [];
        this.eventManager.on(constants_1.qrwcEvents.message, (message) => {
            this.parseMessage(message);
        });
    }
    // a method for parsing messages
    parseMessage(message) {
        // if no meesage id return
        if (!(message === null || message === void 0 ? void 0 : message.id))
            return;
        // get ChangeRequest by id
        const changeRequest = this.findChangeRequestById(message.id);
        // check if changeRequest exists
        if (changeRequest) {
            // handle ChangeRequest
            this.handleChangeRequest(message, changeRequest);
        }
    }
    // a method to create a request it takes in a component name and request id and a callback function
    createChangeRequest(componentName, requestId, onChangeRequest) {
        // construct change request object
        const changeRequest = {
            id: requestId,
            component: componentName,
            onChangeRequest
        };
        // add change request to changeRequestIds
        this.addChangeRequest(changeRequest);
    }
    // a method for adding a change request
    addChangeRequest(changeRequest) {
        this.changeRequestIds = [...this.changeRequestIds, changeRequest];
    }
    // a method for handling change requests
    handleChangeRequest(message, changeRequest) {
        // check if change request is successful
        if (message.result) {
            // check if result is an array
            const areChangesArray = this.isArrayNotEmpty(message.result);
            // if changes array is empty, return
            if (!areChangesArray)
                return;
            //call the callback function with the changes
            changeRequest.onChangeRequest(message.result);
            // remove change request from changeRequestIds
            this.removeChangeRequest(changeRequest.id);
            // emit change request successful event
            this.emitSuccessfulChangeRequest(changeRequest);
        }
        else {
            // if change request is not successful, emit failed change request
            this.emitFailedChangeRequest(changeRequest);
            // remove change request from changeRequestIds
            this.removeChangeRequest(changeRequest.id);
        }
    }
    // a method for removing change request
    removeChangeRequest(requestId) {
        this.changeRequestIds = this.changeRequestIds.filter((changeRequest) => changeRequest.id !== requestId);
    }
    // a method for finding change request by id
    findChangeRequestById(requestId) {
        return this.changeRequestIds.find((changeRequest) => changeRequest.id === requestId);
    }
    // a method for emitting a successful change request
    emitSuccessfulChangeRequest(changeRequest) {
        this.eventManager.emit(constants_1.qrwcEvents.changeRequestSuccessful, changeRequest);
    }
    // a method for emitting a failed change request
    emitFailedChangeRequest(changeRequest) {
        const errorMessage = `Change request for ${changeRequest.component} failed`;
        this.eventManager.emit(constants_1.qrwcEvents.error, errorMessage);
    }
    // a temp method to check if is array and not emtpy
    isArrayNotEmpty(array) {
        return Array.isArray(array) && array.length > 0;
    }
    // a method for initiating clean up for ChangeChangeRequestManager
    cleanUp() {
        // set eventManager to null
        this.eventManager = null;
        // set changeRequestIds to empty array
        this.changeRequestIds = [];
    }
}
exports.default = ChangeRequestManager;
//# sourceMappingURL=ChangeRequestManager.js.map