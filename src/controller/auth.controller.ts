import { Request, Response, NextFunction } from "express";
import { AuthServiceImpl } from "../service/impl/auth.service.impl";
import { LoginDTO } from "../dto/login.dto";
import { CreateUserDTO } from "../dto/createUser.dto";

import { VerifyEmailDTO } from "../dto/verifyEmail.dto";

export class AuthController{
    private authService = new AuthServiceImpl()

    constructor(){
        this.authService = new AuthServiceImpl()
    }

    public login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const userData: LoginDTO = req.body;
            const { accessToken, refreshToken} = await this.authService.login(userData)
            res.status(201).json({
                accessToken,
                refreshToken
            })
         }catch(error){
            next(error)
         }
    }

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
          try{
            const data: CreateUserDTO = req.body 
            const user = await this.authService.createUser(data)
            res.status(201).json({
                error: false,
                message: "You have successfully registered",
            })
          }catch(error){
            next(error)
          }
    }

    public verifyEmail = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const data: VerifyEmailDTO = req.body
            const user = await this.authService.verifyEmail(data)
            res.status(201).json({
                error: false,
                message: "You have successfully been verified",
                data: user
            })
        }catch(error){
            next(error)
        }
    }
}