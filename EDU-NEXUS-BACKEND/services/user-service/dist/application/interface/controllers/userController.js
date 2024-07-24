export class UserController {
    constructor(registerUserUseCase, authorizeUserUseCase, profileUseCase, authService) {
        this.registerUserUseCase = registerUserUseCase;
        this.authorizeUserUseCase = authorizeUserUseCase;
        this.profileUseCase = profileUseCase;
        this.authService = authService;
    }
    async registerUserHandler(req, res) {
        try {
            const { access_token } = req.cookies;
            const decoded = this.authService.verifyAccessToken(access_token);
            const user = await this.registerUserUseCase.execute(req.body, decoded.email);
            console.log("registered user in usercontroller", user);
            res.status(201).json({ message: "User registered successfully", user });
        }
        catch (error) {
            console.log("error in userrouter register", error);
            res.status(500).json({ error: error.message });
        }
    }
    async getUserHandler(req, res) {
        try {
            const { access_token } = req.cookies;
            const decoded = this.authService.verifyAccessToken(access_token);
            const user = await this.profileUseCase.getUser(decoded.email);
            res
                .status(200)
                .json({ message: "User retrieved successfully", user: user });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
    async approveInstructorHandler(req, res) {
        try {
            const { email } = req.body;
            const updatedUser = await this.authorizeUserUseCase.approveInstructor(email);
            res
                .status(200)
                .json({
                message: "Instructor verified successfully",
                user: updatedUser,
            });
        }
        catch (error) {
            console.log("error occured in user controller", error);
            res.status(500).json({ error: error.message });
        }
    }
    async rejectInstructorHandler(req, res) {
        try {
            const { email } = req.body;
            const updatedUser = await this.authorizeUserUseCase.approveInstructor(email);
            res
                .status(200)
                .json({
                message: "Instructor verified successfully",
                user: updatedUser,
            });
        }
        catch (error) {
            console.log("error occured in user controller", error);
            res.status(500).json({ error: error.message });
        }
    }
    async getAllInstructors(req, res) {
        try {
            const allInstructors = await this.profileUseCase.getAllInstructors();
            res.status(200).json({ instructors: allInstructors });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
    async getVerifiedInstructors(req, res) {
        try {
            const verifiedInstructors = await this.profileUseCase.getVerifiedInstructors();
            res.status(200).json({ instructors: verifiedInstructors });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
    async getUnVerifiedInstructors(req, res) {
        try {
            const unVerifiedInstructors = await this.profileUseCase.getUnVerifiedInstructors();
            res.status(200).json({ instructors: unVerifiedInstructors });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
    async getAllUsers(req, res) {
        try {
            const allUsers = await this.profileUseCase.getAllUsers();
            res.status(200).json({ allUsers: allUsers });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
    async blockUser(req, res) {
        try {
            const response = await this.profileUseCase.blockUser(req.body.email);
            res.status(200).json({ email: response });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
    async unBlockUser(req, res) {
        try {
            const response = await this.profileUseCase.unBlockUser(req.body.email);
            res.status(200).json({ email: response });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}
