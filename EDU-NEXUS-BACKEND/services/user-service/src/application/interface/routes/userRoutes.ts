import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { RegisterUserUseCase } from '../../use-case/RegisterUser';
import { UserRepositoryimpl } from '../../../infrastructure/repositories/UserImpl';
import { CloudinaryService } from '../../../presentation/services/cloudinary';
import { AuthorizeUserUseCase } from '../../use-case/AuthorizeUser';
import { ProfileUseCase } from '../../use-case/ProfileUseCase';
import { AuthService } from '../../../adapters/services/verfiyAccessToken';
// import upload from '../../../infrastructure/middlewares/fileUpload';

const router = Router();

const userRepository = new UserRepositoryimpl();

const cloudinaryService = new CloudinaryService();
const authService = new AuthService()

const registerUserUseCase = new RegisterUserUseCase(userRepository);
const authorizeUserUsecase = new AuthorizeUserUseCase(userRepository)
const profileUseCase = new ProfileUseCase(userRepository)

const userController = new UserController(registerUserUseCase,authorizeUserUsecase,profileUseCase,authService);

router.post('/register',userController.registerUserHandler.bind(userController));
router.get('/getUser',userController.getUserHandler.bind(userController))
router.post('/approve',userController.approveInstructorHandler.bind(userController))
router.get('/getInstructors',userController.getAllInstructors.bind(userController))
export default router;
