import express, { Request, Response } from "express";
import authorized from "../middlewares/check-jwt";

const getActiveOrders =  (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
};

const getClosedOrders =  (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
};

 const placeOrders = (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
};

const updateOrder =  (req: Request, res: Response) => {
    try{

    }
    catch(err){
        return res.status(400).send('Error');
    }
};

const orders_routes = (app: express.Application) => {
    app.get('/orders/active', authorized, getActiveOrders),
    app.get('/orders/completed', authorized, getClosedOrders),
    app.post('/orders', authorized, placeOrders),
    app.put('/orders', authorized, updateOrder)
};

export default orders_routes;