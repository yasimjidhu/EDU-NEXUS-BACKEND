"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
const userRepository_1 = require("../../../infrastructure/repositories/userRepository");
const generateOtpUseCase_1 = __importDefault(require("../../use-cases/otp/generateOtpUseCase"));
const verifyOtpUseCase_1 = __importDefault(require("../../use-cases/otp/verifyOtpUseCase"));
const emailService_1 = __importDefault(require("../../../presentation/services/emailService"));
const redic_client_1 = __importDefault(require("../../../infrastructure/database/redic-client"));
const OTPRepository_impl_1 = require("../../../infrastructure/repositories/OTPRepository.impl");
const authUseCase_1 = require("../../use-cases/authUseCase");
//Dependency injection setup
const userRepository = new userRepository_1.UserRepositoryImpl();
const otpRepository = new OTPRepository_impl_1.OTPRepositoryImpl(redic_client_1.default);
const emailService = new emailService_1.default();
const generateOtpUseCase = new generateOtpUseCase_1.default(otpRepository, emailService);
const verifyOtpUsecase = new verifyOtpUseCase_1.default(otpRepository, userRepository);
const signupUseCase = new authUseCase_1.SignupUseCase(userRepository, generateOtpUseCase);
const signupController = new auth_controller_1.SignupController(signupUseCase, generateOtpUseCase, verifyOtpUsecase);
const router = (0, express_1.Router)();
router.post('/signup', signupController.handleSignup.bind(signupController));
router.post('/verify-otp', signupController.handleVerifyOtp.bind(signupController));
exports.default = router;
