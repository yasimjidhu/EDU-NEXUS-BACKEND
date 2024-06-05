"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
router.post("/signup", async (req, res) => {
    try {
        const authResponse = await axios_1.default.post("http://localhost:3001/auth/signup", req.body);
        res.status(authResponse.status).json(authResponse.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "error occured in signup1", err: error });
    }
});
router.post("/verify-otp", async (req, res) => {
    try {
        const response = await axios_1.default.post("http://localhost:3001/auth/verify-otp", req.body, {
            headers: {
                Authorization: `Bearer ${req.headers.authorization}`,
            },
            withCredentials: true
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        console.log("error in otp verification router bro", error);
    }
});
router.post("/login", async (req, res) => {
    try {
        const response = await axios_1.default.post("http://localhost:3001/auth/login", req.body);
        res.status(200).json(response.data);
    }
    catch (error) {
        console.log("error in login", error);
    }
});
router.post("/google", async (req, res) => {
    try {
        const response = await axios_1.default.post("http://localhost:3001/auth/google", {});
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred during Google signup", error: error.message });
    }
});
router.post('/forgot-password', async (req, res) => {
    try {
        const response = await axios_1.default.post('http://localhost:3001/auth/forgot-password', req.body);
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: 'An Error occured during forgot password' });
    }
});
exports.default = router;
