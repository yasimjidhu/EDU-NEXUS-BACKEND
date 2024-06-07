import express, { Request, Response, response } from "express";
import axios from "axios";


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
        withCredentials:true
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
    if (response.data && response.data.error) {
      throw new Error(response.data.error);
    }
    res.status(200).json(response.data);
  } catch (error:any) {
    if(error.response){
      res.status(400).json({error:error.response.data.error})
    }else{
      res.status(500).json({error:'unexpected error occured'})
    }
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

router.post('/reset-password',async (req:Request,res:Response)=>{
  try {
    console.log('reset password reached in server',req.body)
    const response = await axios.post('http://localhost:3001/auth/reset-password',req.body,{
      withCredentials:true
    })
    console.log('responsedata',response.data)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({message:'An Error occured during forgot password'})
  }
})

export default router;
