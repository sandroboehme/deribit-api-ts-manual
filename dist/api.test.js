"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiClient_1 = __importDefault(require("./ApiClient"));
const marketDataApi_1 = require("./api/marketDataApi");
describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => __awaiter(void 0, void 0, void 0, function* () {
        const client = ApiClient_1.default.instance;
        const result = yield new marketDataApi_1.MarketDataApi().publicGetBookSummaryByInstrumentGet('BTC-10NOV23-40000-C');
        // const bookSummary = result.body.result[0];
        // const bookSummaryObj: BookSummary = ObjectSerializer.deserialize(bookSummary, "BookSummary");
        console.log(client);
        // expect(sum(1, 2)).toBe(3);
    }));
});
