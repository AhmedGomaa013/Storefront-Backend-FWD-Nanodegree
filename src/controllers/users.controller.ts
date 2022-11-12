import { Request, Response } from "express";
import app from "../app";

app.get('/users', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});

app.get('/users/:id', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});

app.post('/users/create', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});

app.post('/users/authenticate', (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
});