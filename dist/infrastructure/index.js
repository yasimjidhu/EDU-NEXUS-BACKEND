"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const auth_db_1 = __importDefault(require("./database/auth-db"));
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("../application/interfaces/routes/authRoutes"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };
// app.use(cors(corsOptions))
axios_1.default.defaults.withCredentials = true;
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
redisClient
    .connect()
    .then(() => {
    console.log("Connected to Redis");
})
    .catch((err) => {
    console.error(err);
});
const sessionStore = new connect_redis_1.default({
    client: redisClient,
});
app.use("/auth", authRoutes_1.default);
(0, auth_db_1.default)()
    .then(() => {
    app.listen(3001, () => {
        console.log("Auth service running on port 3001");
    });
})
    .catch((err) => {
    console.log("error occured while connecting auth-db");
});