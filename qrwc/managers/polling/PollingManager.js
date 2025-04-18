"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
class PollingManager {
    constructor(changeGroupId, send, newPollingInterval) {
        this.send = send;
        this.newPollingInterval = newPollingInterval;
        this.pollInterval = constants_1.QrwcDefaultPollInterval;
        this.intervalId = null;
        this.socketPollId = 1;
        this.changeGroupId = changeGroupId;
        this.pollInterval = this.newPollingInterval;
    }
    // getter for polling interval
    get interval() {
        return this.pollInterval;
    }
    // setter for polling interval
    set interval(interval) {
        // set interval if above Minimum interval
        if (interval >= constants_1.QrwcMinPollInterval)
            this.pollInterval = interval;
    }
    // check if given polling interval is valid
    isValidInterval(interval) {
        return interval >= constants_1.QrwcMinPollInterval;
    }
    // a method to start polling
    start() {
        const interval = setInterval(() => this.poll(), this.pollInterval);
        this.intervalId = interval;
    }
    // a method to stop polling
    stop() {
        clearInterval(this.intervalId);
    }
    // a method to poll the server
    poll() {
        this.send((0, utils_1.createJSONRPCMessage)(constants_1.qrcMethods.changeGroup.poll, { Id: this.changeGroupId }, this.socketPollId));
        // increment socketPollId
        this.incrementSocketPollId();
    }
    // a method to increment socketPollId
    incrementSocketPollId() {
        this.socketPollId++;
        // reset socketPollId after 30 seconds
        const numPollsBeforeReset = Math.floor(constants_1.QrwcPollReset / this.pollInterval);
        if (this.socketPollId > numPollsBeforeReset) {
            this.socketPollId = 1;
        }
    }
    // a method to clean up the polling service
    cleanUp() {
        // clear the interval
        clearInterval(this.intervalId);
        // reset the pollInterval to its initial value
        this.pollInterval = constants_1.QrwcDefaultPollInterval;
        // reset the socketPollId
        this.socketPollId = 1;
        // replace the send method with a no-op
        this.send = () => { };
    }
}
exports.default = PollingManager;
//# sourceMappingURL=PollingManager.js.map