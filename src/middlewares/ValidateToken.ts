import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET as string;

export function verifyJWT(req: any, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: "Token not provided." })

  jwt.verify(token, SECRET, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' })

    req.userId = decoded.userId;
    req.userEmail = decoded.userEmail;

    next()
  })
}