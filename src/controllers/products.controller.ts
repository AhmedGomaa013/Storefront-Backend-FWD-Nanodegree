import { Request, Response } from "express";
import app from "../app";

app.get('/products', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});

app.get('/products/:id', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});

app.post('/products', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});