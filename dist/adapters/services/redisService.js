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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenBlacklisted = exports.addToBlacklist = void 0;
const index_1 = require("../../infrastructure/index");
const addToBlacklist = (token) => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.redisClient.set(token, 'blocked', { EX: 3600 }); // Expires in 1 hour
});
exports.addToBlacklist = addToBlacklist;
const isTokenBlacklisted = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield index_1.redisClient.exists(token);
    return result === 1;
});
exports.isTokenBlacklisted = isTokenBlacklisted;