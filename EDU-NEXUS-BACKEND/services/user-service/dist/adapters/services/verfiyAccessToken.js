import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || '';
export class AuthService {
    verifyAccessToken(token) {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    }
    verifyRefreshToken(token) {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    }
}
