import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendContactEmail } from '../services/emailService';
import { ContactPayload } from '../types';

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((err) => err.msg),
      });
      return;
    }

    const { name, email, message } = req.body as ContactPayload;

    await sendContactEmail({ name, email, message });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
    });
  } catch (error) {
    next(error);
  }
};
