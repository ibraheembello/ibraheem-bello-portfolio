import { Router } from 'express';
import { getProjects, getSkills, getExperience, getBlog } from '../controllers/projectController';

const router = Router();

router.get('/projects', getProjects);
router.get('/skills', getSkills);
router.get('/experience', getExperience);
router.get('/blog', getBlog);

export default router;
