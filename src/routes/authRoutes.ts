import express, { Request, Response, response } from "express";
import axios, { AxiosResponse } from "axios";

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
        withCredentials: true,
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log("error in otp verification router bro", error);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:3001/auth/login",
      req.body,
      {
        withCredentials: true,
      }
    );

    if (response.data && response.data.error) {
      throw new Error(response.data.error);
    }

    let cookies: string[] | undefined = response.headers["set-cookie"];
    const accessTokenCookie = cookies?.find((cookie) =>
      cookie.startsWith("access_token")
    );

    const refreshTokenCookie = cookies?.find((cookie) =>
      cookie.startsWith("refresh_token")
    );

    const refreshToken = refreshTokenCookie
      ? refreshTokenCookie.split("=")[1].split(";")[0]
      : null;

    const accessToken = accessTokenCookie
      ? accessTokenCookie.split("=")[1].split(";")[0]
      : null;

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    if (error.response) {
      res.status(400).json({ error: error.response.data.error });
    } else {
      res.status(500).json({ error: "unexpected error occurred" });
    }
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    const response = await axios.post("http://localhost:3001/auth/logout", {
      withCredentials: true,
    });

    if (response.data && response.data.error) {
      throw new Error(response.data.error);
    }

    let cookies: string[] | undefined = response.headers["set-cookie"];
    console.log("cookies in logout", cookies);
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    
    res.status(200).json(response.data);
  } catch (error: any) {
    if (error.response) {
      res.status(400).json({ error: error.response.data.error });
    } else {
      res.status(500).json({ error: "unexpected error occured" });
    }
  }
});

router.post("/google", async (req: Request, res: Response) => {
  try {
    const response = await axios.post("http://localhost:3001/auth/google", {});
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred during Google signup",
      error: error.message,
    });
  }
});

router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/forgot-password",
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An Error occured during forgot password" });
  }
});

router.post("/reset-password", async (req: Request, res: Response) => {
  try {
    console.log("reset password reached in server", req.body);
    const response = await axios.post(
      "http://localhost:3001/auth/reset-password",
      req.body,
      {
        withCredentials: true,
      }
    );
    console.log("responsedata", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An Error occured during forgot password" });
  }
});

export default router;
