"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlDecorator = exports.setupQrwc = exports.Qrwc = void 0;
var Qrwc_1 = require("./managers/qrwc/Qrwc");
Object.defineProperty(exports, "Qrwc", { enumerable: true, get: function () { return Qrwc_1.Qrwc; } });
var QrwcConnection_1 = require("./managers/qrwc/QrwcConnection");
Object.defineProperty(exports, "setupQrwc", { enumerable: true, get: function () { return QrwcConnection_1.setupQrwc; } });
var ControlDecorator_1 = require("./managers/components/ControlDecorator");
Object.defineProperty(exports, "ControlDecorator", { enumerable: true, get: function () { return ControlDecorator_1.ControlDecorator; } });
//# sourceMappingURL=index.js.map