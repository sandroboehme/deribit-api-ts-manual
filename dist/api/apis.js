"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIS = void 0;
__exportStar(require("./accountManagementApi"), exports);
const accountManagementApi_1 = require("./accountManagementApi");
__exportStar(require("./authenticationApi"), exports);
const authenticationApi_1 = require("./authenticationApi");
__exportStar(require("./internalApi"), exports);
const internalApi_1 = require("./internalApi");
__exportStar(require("./marketDataApi"), exports);
const marketDataApi_1 = require("./marketDataApi");
__exportStar(require("./privateApi"), exports);
const privateApi_1 = require("./privateApi");
__exportStar(require("./publicApi"), exports);
const publicApi_1 = require("./publicApi");
__exportStar(require("./supportingApi"), exports);
const supportingApi_1 = require("./supportingApi");
__exportStar(require("./tradingApi"), exports);
const tradingApi_1 = require("./tradingApi");
__exportStar(require("./walletApi"), exports);
const walletApi_1 = require("./walletApi");
exports.APIS = [accountManagementApi_1.AccountManagementApi, authenticationApi_1.AuthenticationApi, internalApi_1.InternalApi, marketDataApi_1.MarketDataApi, privateApi_1.PrivateApi, publicApi_1.PublicApi, supportingApi_1.SupportingApi, tradingApi_1.TradingApi, walletApi_1.WalletApi];
