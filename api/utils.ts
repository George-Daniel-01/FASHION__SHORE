import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './models/userModel';

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization) {
    try {
      const token = authorization.slice(7); // Remove "Bearer "
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'somethingsecret'
      ) as {
        _id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        token?: string;
      };

      req.user = {
        ...decoded,
        token, // attach token if needed
      };

      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid Token' });
    }
  } else {
    res.status(401).json({ message: 'No Token' });
  }
};
