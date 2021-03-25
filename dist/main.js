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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var FormatConversion_1 = require("./modules/FormatConversion");
var index_modules_1 = require("./modules/index_modules");
var exp = express_1.default();
exp.use(cors_1.default());
index_modules_1.keepHosting("http://toy-projects-api.herokuapp.com/");
var pathDir = function (dir) {
    return path_1.default.join(__dirname, dir.replace(".ts", ".js"));
};
var korea_covid19_dir = pathDir("./korea-covid19-api/index.ts");
var insider_trade_dir = pathDir("./insider-trade-api/index.ts");
var korean_webtoon_dir = pathDir("./korean-webtoon-api/index.ts");
//------------------------------------------------------------------------
var main = function () {
    FormatConversion_1.setTimer_loop(FormatConversion_1.ms2hour(12), update_insider_trade_api);
    FormatConversion_1.setTimer_loop(FormatConversion_1.ms2minute(10), update_korean_webtoon_api);
    FormatConversion_1.setTimer_loop(FormatConversion_1.ms2hour(1), update_korea_covid19_api);
    index_modules_1.hosting(8080);
};
//------------------------------------------------------------------------
var update_korea_covid19_api = function () { return __awaiter(void 0, void 0, void 0, function () {
    var router_list, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                router_list = [];
                return [4 /*yield*/, index_modules_1.getData_from_Worker(korea_covid19_dir)];
            case 1:
                data = _a.sent();
                data.map(function (data) {
                    var region = data.region;
                    index_modules_1.createRouter("/covid19/" + region, data, router_list);
                });
                index_modules_1.createRouter("/covid19", router_list);
                return [2 /*return*/];
        }
    });
}); };
var update_insider_trade_api = function () { return __awaiter(void 0, void 0, void 0, function () {
    var router_list, data, insider_trade_list_data, stock_data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                router_list = [];
                return [4 /*yield*/, index_modules_1.getData_from_Worker(insider_trade_dir)];
            case 1:
                data = _a.sent();
                insider_trade_list_data = data.insiderTradeList;
                stock_data = data.stockData;
                stock_data.map(function (data) {
                    var ticker = data.ticker;
                    index_modules_1.createRouter("/insidertrade/" + ticker, data, router_list);
                });
                index_modules_1.createRouter("/insidertrade/list", insider_trade_list_data, router_list);
                index_modules_1.createRouter("/insidertrade", router_list);
                return [2 /*return*/];
        }
    });
}); };
var update_korean_webtoon_api = function () { return __awaiter(void 0, void 0, void 0, function () {
    var router_list, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                router_list = [];
                return [4 /*yield*/, index_modules_1.getData_from_Worker(korean_webtoon_dir)];
            case 1:
                data = _a.sent();
                index_modules_1.createRouter("/webtoon/all", data, router_list);
                index_modules_1.createRouter("/webtoon", router_list);
                return [2 /*return*/];
        }
    });
}); };
main();