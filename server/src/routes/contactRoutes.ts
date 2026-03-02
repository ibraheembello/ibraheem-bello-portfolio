import { Router } from 'express';
import { sendMessage } from '../controllers/contactController';
import { validateContact } from '../middleware/validate';

const router = Router();

router.post('/', validateContact, sendMessage);

export default router;
