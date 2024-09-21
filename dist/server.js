"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
axios_1.default.defaults.withCredentials = true;
// proxies
const authProxy = (0, express_http_proxy_1.default)('http://localhost:3001', {
    proxyReqPathResolver: (req) => `/auth${req.url}`,
});
const userProxy = (0, express_http_proxy_1.default)('http://localhost:3002', {
    proxyReqPathResolver: (req) => `/user${req.url}`,
});
const notificationProxy = (0, express_http_proxy_1.default)('http://localhost:3003', {
    proxyReqPathResolver: (req) => `/notification${req.url}`,
});
const courseProxy = (0, express_http_proxy_1.default)('http://localhost:3004', {
    proxyReqPathResolver: (req) => `/course${req.url}`,
});
const paymentProxy = (0, express_http_proxy_1.default)('http://localhost:3005', {
    proxyReqPathResolver: (req) => `/payment${req.url}`,
});
const chatProxy = (0, express_http_proxy_1.default)('http://localhost:3006', {
    proxyReqPathResolver: (req) => `/chat${req.url}`,
});
// Proxy middleware
app.use('/auth', authProxy);
app.use('/user', userProxy);
app.use('/course', courseProxy);
app.use('/payment', paymentProxy);
app.use('/chat', chatProxy);
app.use('/notification', notificationProxy);
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`API gateway running on port ${PORT}`);
});
