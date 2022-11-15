import client from "../database";
import { User } from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const pepper = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS;
export class UsersService{
    async index(): Promise<User[] | null>{
        try{
        const conn = await client.connect();
        const sql = 'SELECT * FROM users;';
        const result = await conn.query(sql);
        conn.release();
        return result.rows as User[];
        }
        catch(err){
            return null;
        }
    }

    async show(id: number): Promise<User | null>{
        try{
        const conn = await client.connect();
        const sql = 'SELECT * FROM users WHERE id = $1;';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0] as User;
        }
        catch(err){
            return null;
        }
    }

    async create(user: User): Promise<User | null>{
        try{
            const hashedPassword = await bcrypt.hash(
                user.password + pepper,
                Number(salt));
        const conn = await client.connect();
        const sql = 'INSERT INTO users(firstname, lastname, username, password) VALUES($1,$2,$3,$4) RETURNING*;';
        const result = await conn.query(sql, [user.firstname, user.lastname, user.username, hashedPassword]);
        conn.release();
        return result.rows[0] as User;
        }
        catch(err){
            return null;
        }
    }

    async authenticate(user: User): Promise<string | null>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE username = $1;';
            const userDb:User = (await conn.query(sql, [user.username])).rows[0];
            conn.release();
            if(!userDb){
                return '404';
            }
            
            const compareResult = await bcrypt.compare(user.password + pepper, userDb.password);
            if(compareResult){
                const token = jwt.sign({user:userDb}, process.env.JWT_SECRET as string);
                return token;
            }
            return 'wrong password';
        }
        catch(err){
            return null;
        }
    }
}