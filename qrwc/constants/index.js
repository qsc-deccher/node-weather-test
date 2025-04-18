"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrwcMockComponentGetResult = exports.QrwcDefaultPollInterval = exports.QrwcMinPollInterval = exports.QrwcPollReset = exports.qrcMethods = void 0;
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
exports.QrwcPollReset = 30000;
exports.QrwcMinPollInterval = 34;
exports.QrwcDefaultPollInterval = 350;
exports.qrwcMockComponentGetResult = {
    Name: 'mock',
    Properties: [],
    ID: 'mock',
    Type: 'mock',
    Controls: null,
    ControlSource: 1
};
//# sourceMappingURL=index.js.map