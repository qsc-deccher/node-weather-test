"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrwcMockComponentGetResult = exports.qrwcDefaultPollInterval = exports.qrwcMinPollInterval = exports.qrwcPollReset = exports.qrwcEvents = exports.qrcMethods = void 0;
exports.qrcMethods = {
    components: {
        getComponents: 'Component.GetComponents',
        getControls: 'Component.GetControls',
        set: 'Component.Set'
    },
    changeGroup: {
        poll: 'ChangeGroup.Poll',
        addControl: 'ChangeGroup.AddControl',
        addComponentControl: 'ChangeGroup.AddComponentControl'
    }
};
exports.qrwcEvents = {
    message: 'message',
    error: 'error',
    disconnected: 'disconnected',
    connected: 'connected',
    webSocketAttached: 'webSocketAttached',
    startComplete: 'startComplete',
    controlsUpdated: 'controlsUpdated',
    controlsReceived: 'controlsReceived',
    componentsReceived: 'componentsReceived',
    changeRequestSuccessful: 'changeRequestSuccessful',
    componentChangeGroupCreated: 'componentChangeGroupCreated'
};
exports.qrwcPollReset = 30000;
exports.qrwcMinPollInterval = 34;
exports.qrwcDefaultPollInterval = 350;
exports.qrwcMockComponentGetResult = {
    Name: 'mock',
    Properties: [],
    ID: 'mock',
    Type: 'mock',
    Controls: null,
    ControlSource: 1
};
//# sourceMappingURL=index.js.map