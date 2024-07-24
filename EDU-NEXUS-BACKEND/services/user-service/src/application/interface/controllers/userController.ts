import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../use-case/RegisterUser";
import { AuthorizeUserUseCase } from "../../use-case/AuthorizeUser";
import { ProfileUseCase } from "../../use-case/ProfileUseCase";
import { AuthService } from "../../../adapters/services/verfiyAccessToken";
export class UserController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private authorizeUserUseCase: AuthorizeUserUseCase,
    private profileUseCase: ProfileUseCase,
    private authService: AuthService
  ) {}

  async registerUserHandler(req: Request, res: Response): Promise<void> {
    try {
      const { access_token } = req.cookies;
      const decoded = this.authService.verifyAccessToken(access_token) as {
        email: string;
      };

      const user = await this.registerUserUseCase.execute(
        req.body,
        decoded.email
      );
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserHandler(req: Request, res: Response): Promise<void> {
    try {
      const { access_token } = req.cookies;
      const decoded = this.authService.verifyAccessToken(access_token) as {
        email: string;
      };
      
      const user = await this.profileUseCase.getUser(decoded.email);
      res
        .status(200)
        .json({ message: "User retrieved successfully", user: user });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  async approveInstructorHandler(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      const updatedUser = await this.authorizeUserUseCase.approveInstructor(
        email
      );
      
      res
        .status(200)
        .json({
          message: "Instructor verified successfully",
          user: updatedUser,
        });
    } catch (error: any) {
      console.log("error occured in user controller", error);
      res.status(500).json({ error: error.message });
    }
  }

  async rejectInstructorHandler(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      const updatedUser = await this.authorizeUserUseCase.approveInstructor(
        email
      );
      res
        .status(200)
        .json({
          message: "Instructor verified successfully",
          user: updatedUser,
        });
    } catch (error: any) {
      console.log("error occured in user controller", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getAllInstructors(req: Request, res: Response): Promise<void> {
    try {
      const allInstructors = await this.profileUseCase.getAllInstructors();
      res.status(200).json({ instructors: allInstructors });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  async getVerifiedInstructors(req: Request, res: Response): Promise<void> {
    try {
      const verifiedInstructors = await this.profileUseCase.getVerifiedInstructors();
      res.status(200).json({ instructors: verifiedInstructors });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  async getUnVerifiedInstructors(req: Request, res: Response): Promise<void> {
    try {
      const unVerifiedInstructors = await this.profileUseCase.getUnVerifiedInstructors();
      res.status(200).json({ instructors: unVerifiedInstructors });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  async getAllUsers(req:Request,res:Response):Promise<void>{
    try {
      const allUsers = await this.profileUseCase.getAllUsers();
      res.status(200).json({ allUsers: allUsers });
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  
  async blockUser(req:Request,res:Response):Promise<void>{
    try {
      const response = await this.profileUseCase.blockUser(req.body.email)
      res.status(200).json({email:response})
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  async unBlockUser(req:Request,res:Response):Promise<void>{
    try {
      const response = await this.profileUseCase.unBlockUser(req.body.email)
      res.status(200).json({email:response})
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

}
