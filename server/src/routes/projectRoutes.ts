import { Router } from 'express';
import { getProjects, getSkills, getExperience } from '../controllers/projectController';

const router = Router();

router.get('/projects', getProjects);
router.get('/skills', getSkills);
router.get('/experience', getExperience);

export default router;
