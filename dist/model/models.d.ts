export * from './addressBookItem';
export * from './bookSummary';
export * from './currency';
export * from './currencyPortfolio';
export * from './currencyWithdrawalPriorities';
export * from './deposit';
export * from './instrument';
export * from './keyNumberPair';
export * from './order';
export * from './orderIdInitialMarginPair';
export * from './portfolio';
export * from './portfolioEth';
export * from './position';
export * from './publicTrade';
export * from './settlement';
export * from './tradesVolumes';
export * from './transferItem';
export * from './types';
export * from './userTrade';
export * from './withdrawal';
import localVarRequest = require('request');
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class HttpBasicAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class ApiKeyAuth implements Authentication {
    private location;
    private paramName;
    apiKey: string;
    constructor(location: string, paramName: string);
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class OAuth implements Authentication {
    accessToken: string;
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class VoidAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(_: localVarRequest.Options): void;
}
//# sourceMappingURL=models.d.ts.map