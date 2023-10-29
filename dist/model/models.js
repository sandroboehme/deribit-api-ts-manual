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
exports.VoidAuth = exports.OAuth = exports.ApiKeyAuth = exports.HttpBasicAuth = exports.ObjectSerializer = void 0;
__exportStar(require("./addressBookItem"), exports);
__exportStar(require("./bookSummary"), exports);
__exportStar(require("./currency"), exports);
__exportStar(require("./currencyPortfolio"), exports);
__exportStar(require("./currencyWithdrawalPriorities"), exports);
__exportStar(require("./deposit"), exports);
__exportStar(require("./instrument"), exports);
__exportStar(require("./keyNumberPair"), exports);
__exportStar(require("./order"), exports);
__exportStar(require("./orderIdInitialMarginPair"), exports);
__exportStar(require("./portfolio"), exports);
__exportStar(require("./portfolioEth"), exports);
__exportStar(require("./position"), exports);
__exportStar(require("./publicTrade"), exports);
__exportStar(require("./settlement"), exports);
__exportStar(require("./tradesVolumes"), exports);
__exportStar(require("./transferItem"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./userTrade"), exports);
__exportStar(require("./withdrawal"), exports);
const addressBookItem_1 = require("./addressBookItem");
const bookSummary_1 = require("./bookSummary");
const currency_1 = require("./currency");
const currencyPortfolio_1 = require("./currencyPortfolio");
const currencyWithdrawalPriorities_1 = require("./currencyWithdrawalPriorities");
const deposit_1 = require("./deposit");
const instrument_1 = require("./instrument");
const keyNumberPair_1 = require("./keyNumberPair");
const order_1 = require("./order");
const orderIdInitialMarginPair_1 = require("./orderIdInitialMarginPair");
const portfolio_1 = require("./portfolio");
const portfolioEth_1 = require("./portfolioEth");
const position_1 = require("./position");
const publicTrade_1 = require("./publicTrade");
const settlement_1 = require("./settlement");
const tradesVolumes_1 = require("./tradesVolumes");
const transferItem_1 = require("./transferItem");
const types_1 = require("./types");
const userTrade_1 = require("./userTrade");
const withdrawal_1 = require("./withdrawal");
/* tslint:disable:no-unused-variable */
let primitives = [
    "string",
    "boolean",
    "double",
    "integer",
    "long",
    "float",
    "number",
    "any"
];
let enumsMap = {
    "AddressBookItem.CurrencyEnum": addressBookItem_1.AddressBookItem.CurrencyEnum,
    "AddressBookItem.TypeEnum": addressBookItem_1.AddressBookItem.TypeEnum,
    "Currency.CoinTypeEnum": currency_1.Currency.CoinTypeEnum,
    "CurrencyPortfolio.CurrencyEnum": currencyPortfolio_1.CurrencyPortfolio.CurrencyEnum,
    "Deposit.StateEnum": deposit_1.Deposit.StateEnum,
    "Deposit.CurrencyEnum": deposit_1.Deposit.CurrencyEnum,
    "Instrument.QuoteCurrencyEnum": instrument_1.Instrument.QuoteCurrencyEnum,
    "Instrument.KindEnum": instrument_1.Instrument.KindEnum,
    "Instrument.OptionTypeEnum": instrument_1.Instrument.OptionTypeEnum,
    "Instrument.SettlementPeriodEnum": instrument_1.Instrument.SettlementPeriodEnum,
    "Instrument.BaseCurrencyEnum": instrument_1.Instrument.BaseCurrencyEnum,
    "Order.DirectionEnum": order_1.Order.DirectionEnum,
    "Order.TimeInForceEnum": order_1.Order.TimeInForceEnum,
    "Order.OrderStateEnum": order_1.Order.OrderStateEnum,
    "Order.AdvancedEnum": order_1.Order.AdvancedEnum,
    "Order.OrderTypeEnum": order_1.Order.OrderTypeEnum,
    "Order.OriginalOrderTypeEnum": order_1.Order.OriginalOrderTypeEnum,
    "Order.TriggerEnum": order_1.Order.TriggerEnum,
    "PortfolioEth.CurrencyEnum": portfolioEth_1.PortfolioEth.CurrencyEnum,
    "Position.DirectionEnum": position_1.Position.DirectionEnum,
    "Position.KindEnum": position_1.Position.KindEnum,
    "PublicTrade.DirectionEnum": publicTrade_1.PublicTrade.DirectionEnum,
    "PublicTrade.TickDirectionEnum": publicTrade_1.PublicTrade.TickDirectionEnum,
    "Settlement.TypeEnum": settlement_1.Settlement.TypeEnum,
    "TradesVolumes.CurrencyPairEnum": tradesVolumes_1.TradesVolumes.CurrencyPairEnum,
    "TransferItem.DirectionEnum": transferItem_1.TransferItem.DirectionEnum,
    "TransferItem.CurrencyEnum": transferItem_1.TransferItem.CurrencyEnum,
    "TransferItem.StateEnum": transferItem_1.TransferItem.StateEnum,
    "TransferItem.TypeEnum": transferItem_1.TransferItem.TypeEnum,
    "UserTrade.DirectionEnum": userTrade_1.UserTrade.DirectionEnum,
    "UserTrade.FeeCurrencyEnum": userTrade_1.UserTrade.FeeCurrencyEnum,
    "UserTrade.OrderTypeEnum": userTrade_1.UserTrade.OrderTypeEnum,
    "UserTrade.StateEnum": userTrade_1.UserTrade.StateEnum,
    "UserTrade.TickDirectionEnum": userTrade_1.UserTrade.TickDirectionEnum,
    "UserTrade.LiquidityEnum": userTrade_1.UserTrade.LiquidityEnum,
    "Withdrawal.CurrencyEnum": withdrawal_1.Withdrawal.CurrencyEnum,
    "Withdrawal.StateEnum": withdrawal_1.Withdrawal.StateEnum,
};
let typeMap = {
    "AddressBookItem": addressBookItem_1.AddressBookItem,
    "BookSummary": bookSummary_1.BookSummary,
    "Currency": currency_1.Currency,
    "CurrencyPortfolio": currencyPortfolio_1.CurrencyPortfolio,
    "CurrencyWithdrawalPriorities": currencyWithdrawalPriorities_1.CurrencyWithdrawalPriorities,
    "Deposit": deposit_1.Deposit,
    "Instrument": instrument_1.Instrument,
    "KeyNumberPair": keyNumberPair_1.KeyNumberPair,
    "Order": order_1.Order,
    "OrderIdInitialMarginPair": orderIdInitialMarginPair_1.OrderIdInitialMarginPair,
    "Portfolio": portfolio_1.Portfolio,
    "PortfolioEth": portfolioEth_1.PortfolioEth,
    "Position": position_1.Position,
    "PublicTrade": publicTrade_1.PublicTrade,
    "Settlement": settlement_1.Settlement,
    "TradesVolumes": tradesVolumes_1.TradesVolumes,
    "TransferItem": transferItem_1.TransferItem,
    "Types": types_1.Types,
    "UserTrade": userTrade_1.UserTrade,
    "Withdrawal": withdrawal_1.Withdrawal,
};
class ObjectSerializer {
    static findCorrectType(data, expectedType) {
        if (data == undefined) {
            return expectedType;
        }
        else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }
        else if (expectedType === "Date") {
            return expectedType;
        }
        else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }
            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }
            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            }
            else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if (typeMap[discriminatorType]) {
                        return discriminatorType; // use the type given in the discriminator
                    }
                    else {
                        return expectedType; // discriminator did not map to a type
                    }
                }
                else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }
    static serialize(data, type) {
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return data.toISOString();
        }
        else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }
            // Get the actual type of this object
            type = this.findCorrectType(data, type);
            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }
    static deserialize(data, type) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return new Date(data);
        }
        else {
            if (enumsMap[type]) { // is Enum
                return data;
            }
            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}
exports.ObjectSerializer = ObjectSerializer;
class HttpBasicAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(requestOptions) {
        requestOptions.auth = {
            username: this.username, password: this.password
        };
    }
}
exports.HttpBasicAuth = HttpBasicAuth;
class ApiKeyAuth {
    constructor(location, paramName) {
        this.location = location;
        this.paramName = paramName;
        this.apiKey = '';
    }
    applyToRequest(requestOptions) {
        if (this.location == "query") {
            requestOptions.qs[this.paramName] = this.apiKey;
        }
        else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}
exports.ApiKeyAuth = ApiKeyAuth;
class OAuth {
    constructor() {
        this.accessToken = '';
    }
    applyToRequest(requestOptions) {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}
exports.OAuth = OAuth;
class VoidAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(_) {
        // Do nothing
    }
}
exports.VoidAuth = VoidAuth;
