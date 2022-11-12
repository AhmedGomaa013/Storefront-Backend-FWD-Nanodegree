import { Request, Response } from "express";
import app from "../app";

app.get('/orders/active', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});

app.get('/orders/completed', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});

app.post('/orders', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});

app.put('/orders', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});