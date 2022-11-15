import client from "../database";
import { Product } from "../models/product";

export class ProductsService{
    async index(): Promise<Product[] | null>{
        try{
        const conn = await client.connect();
        const sql = 'SELECT * FROM products;';
        const result = await conn.query(sql);
        conn.release();
        return result.rows as Product[];
        }
        catch(err){
            return null;
        }
    }

    async show(id: number): Promise<Product | null>{
        try{
        const conn = await client.connect();
        const sql = 'SELECT * FROM products WHERE id = $1;';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0] as Product;
        }
        catch(err){
            return null;
        }
    }

    async create(product: Product): Promise<Product | null>{
        try{
        const conn = await client.connect();
        const sql = 'INSERT INTO products(name, price) VALUES($1,$2) RETURNING*;';
        const result = await conn.query(sql, [product.name, product.price]);
        conn.release();
        return result.rows[0] as Product;
        }
        catch(err){
            console.log(err);
            return null;
        }
    }
}