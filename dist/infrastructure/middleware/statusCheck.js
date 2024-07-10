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
exports.checkTokenBlacklist = void 0;
const redisService_1 = require("../../adapters/services/redisService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const __1 = require("..");
dotenv_1.default.config();
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || '';
const checkTokenBlacklist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('request reached in middleware');
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log('token in middleware', token);
    if (!token) {
        console.log('authorization token is missing', token);
        return res.status(401).json({ message: 'Authorization token missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        console.log('user token', decoded);
        //check if the user is blocked
        const isBlocked = yield __1.redisClient.get(`blocked_user:${decoded.email}`);
        console.log('user isblocked', isBlocked);
        if (isBlocked) {
            return res.status(403).json({ message: 'User is blocked' });
        }
        const tokenBlackListed = yield (0, redisService_1.isTokenBlacklisted)(token);
        console.log('user blocked is ', tokenBlackListed);
        if (tokenBlackListed) {
            console.log('user  tokenBlackListed');
            return res.status(403).json({ message: 'Un Authorized' });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Error checking token blacklist:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.checkTokenBlacklist = checkTokenBlacklist;