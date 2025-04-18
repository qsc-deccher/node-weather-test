"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidControlChange = exports.createJSONRPCMessage = void 0;
const createJSONRPCMessage = (method, params, id) => ({
    jsonrpc: '2.0',
    method,
    params,
    id
});
exports.createJSONRPCMessage = createJSONRPCMessage;
function isValidControlChange(control) {
    return (control &&
        typeof control.Name === 'string' &&
        typeof control.Component === 'string' &&
        typeof control.Value === 'number' &&
        typeof control.String === 'string' &&
        typeof control.Position === 'number');
}
exports.isValidControlChange = isValidControlChange;
//# sourceMappingURL=index.js.map