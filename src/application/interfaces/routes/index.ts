import { Router } from "express";
import categoryRoutes from "./categoryRoutes";
import courseRoutes from "./courseRoutes";
import enrollmentRoutes from "./enrollmentRoutes";
import reviewRoutes from "./reviewRoutes";
import assessmentRoutes from "./assessmentRoutes";

const router = Router();

router.use('/categories', categoryRoutes); 
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/assessments', assessmentRoutes);

export default router;
