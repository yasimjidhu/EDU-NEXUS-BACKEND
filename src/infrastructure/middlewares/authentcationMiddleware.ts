import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()



declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}


const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || ""

 const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.cookies.access_token
  console.log('accesstoken in course',access_token)
  if (!access_token) {
    console.log('no accesstoken')
      return res.status(401).json({ message: 'Un Authorized' });
  }

  try {
    console.log('secret',ACCESS_TOKEN_SECRET)
      const decoded = jwt.verify(access_token, ACCESS_TOKEN_SECRET);
      (req as any).user = decoded; 
      console.log('decoded course',decoded)
      next();
  } catch (error) {
    console.log('token error',error)
      return res.status(403).json({ message: 'Invalid token' });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Admin access required' });
  }
};

export const instructorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'instructor') {
    next();
  } else {
    return res.status(403).json({ message: 'Instructor access required' });
  }
};

export const studentMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('this is the req.user',req.user)
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    return res.status(403).json({ message: 'Student access required' });
  }
};
export default authMiddleware