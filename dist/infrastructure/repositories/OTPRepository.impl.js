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
exports.OTPRepositoryImpl = void 0;
class OTPRepositoryImpl {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    saveOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const expirationTime = 180;
            yield this.redisClient.setEx(email, expirationTime, otp);
        });
    }
    verifyOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedOtp = yield this.redisClient.get(email);
            console.log('stored otp is', storedOtp);
            console.log('actual otp is', otp);
            if (!storedOtp) {
                throw new Error('OTP has expired');
            }
            return storedOtp === otp;
        });
    }
}
exports.OTPRepositoryImpl = OTPRepositoryImpl;
