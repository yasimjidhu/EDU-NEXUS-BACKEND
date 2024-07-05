import { Router } from "express";
import categoryRoutes from "./categoryRoutes";
import courseRoutes from "./courseRoutes";
import enrollmentRoutes from "./enrollmentRoutes";
import reviewRoutes from "./reviewRoutes";
import assessmentRoutes from "./assessmentRoutes";

const router = Router();

router.use(categoryRoutes);
router.use(courseRoutes);
router.use(enrollmentRoutes);
router.use(reviewRoutes);
router.use(assessmentRoutes);

export default router;
