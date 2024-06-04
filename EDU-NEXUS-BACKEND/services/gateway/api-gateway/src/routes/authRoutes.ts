import express, { Request, Response } from "express";
import axios from "axios";
import passport from 'passport'

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const authResponse = await axios.post(
      "http://localhost:3001/auth/signup",
      req.body
    );
    res.status(authResponse.status).json(authResponse.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occured in signup1", err: error });
  }
});

router.post("/verify-otp", async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/verify-otp",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${req.headers.authorization}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log("error in otp verification router bro", error);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/login",
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log("error in login", error);
  }
});

router.post("/google", async (req: Request, res: Response) => {
  try {

    const response = await axios.post("http://localhost:3001/auth/google", {});
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: "An error occurred during Google signup", error: error.message });
  }
});

router.post('/forgot-password',async (req:Request,res:Response)=>{
  try {
    const response = await axios.post('http://localhost:3001/auth/forgot-password',req.body)
    res.status(200).json(response.data)
    
  } catch (error) {
    res.status(500).json({message:'An Error occured during forgot password'})
  }
})


export default router;
