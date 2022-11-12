import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authorized = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    if(!authToken){
        return res.status(401).send('unauthorized');
    }

    try{
    const token = authToken.split(' ')[1];
    const {JWT_SECRET} = process.env;
    jwt.verify(token, JWT_SECRET as jwt.Secret);
    next();
    }
    catch(err){
        return res.status(401).send('unauthorized');
    }
}

export default authorized;