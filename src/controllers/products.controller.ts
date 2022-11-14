import { Request, Response } from "express";
import app from "../app";
import { ProductInfo } from "../dtos/product-info";
import { GeneralResponse, GeneralResponseList } from "../dtos/responses/general-responses";
import { Product } from "../models/product";
import { ProductsService } from "../services/product.service";

const productsService = new ProductsService();
app.get('/products', async (req: Request, res: Response) => {
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
});

app.get('/products/:id', async (req: Request, res: Response) => {
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
});

app.post('/products', async (req: Request, res: Response) => {
    try{
        const {productDto} = req.body;
        const product = Product.ConvertFromProductInfo(productDto);

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
});