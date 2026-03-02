import { Request, Response, NextFunction } from 'express';
import projects from '../data/projects.json';
import skills from '../data/skills.json';
import experience from '../data/experience.json';

export const getProjects = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getSkills = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

export const getExperience = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};
