import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();

router.get('/download', (_req: Request, res: Response, next: NextFunction) => {
  try {
    const resumePath = path.resolve(__dirname, '../../../client/public/resume.pdf');

    if (!fs.existsSync(resumePath)) {
      res.status(404).json({
        success: false,
        message: 'Resume file not found',
      });
      return;
    }

    res.download(resumePath, 'Ibraheem_Bello_Resume.pdf');
  } catch (error) {
    next(error);
  }
});

export default router;
