import { Request, Response } from "express";
import express from 'express';
import { ProductInfo } from "../dtos/product-info";
import { GeneralResponse, GeneralResponseList } from "../dtos/responses/general-responses";
import authorized from "../middlewares/check-jwt";
import { Product } from "../models/product";
import { ProductsService } from "../services/product.service";

const productsService = new ProductsService();
const index = async (req: Request, res: Response) => {
    try{
        const products = await productsService.index();
        if(!products){
            return res.status(400).send('Error');
        }
        const productDto = Product.ConvertToProductInfoList(products);
        
        const response = new GeneralResponseList<ProductInfo>();
        response.data = productDto;
        response.count = productDto.length;
        
        res.json(response);
    }
    catch(err){
        return res.status(400).send('Error');
    }
};

const show =  async (req: Request, res: Response) => {
    try{
        const {id} = req.route;
        const product = await productsService.show(id);
        if(!product){
            return res.status(400).send('Error');
        }
        const productDto = Product.ConvertToProductInfo(product);
        
        const response = new GeneralResponse<ProductInfo>();
        response.data = productDto;
        
        res.json(response);
    }
    catch(err){
        return res.status(400).send('Error');
    }
};

const create = async (req: Request, res: Response) => {
    try{
        const {productDto} = req.body;
        const product = Product.ConvertFromProductInfo(productDto);
        if(!product.validateEntity()){
            return res.status(400).send('Wrong Values');
        }

        const productReturned = await productsService.create(product);
        if(!productReturned){
            return res.status(400).send('Error');
        }
        
        const response = new GeneralResponse<ProductInfo>();
        response.data = Product.ConvertToProductInfo(productReturned);
        
        res.json(response);
    }
    catch(err){
        return res.status(400).send('Error');
    }
};

const products_routes = (app: express.Application) => {
    app.get('/products', index),
    app.get('/products/:id', show),
    app.post('/products', authorized, create)
};

export default products_routes;