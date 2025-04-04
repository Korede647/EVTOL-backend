import { Request, Response, NextFunction } from "express";
import { UserServiceImpl } from "../service/impl/user.service.impl";
import { CreateUserDTO } from "../dto/createUser.dto";

export class UserController{
    private userService: UserServiceImpl;

    constructor(){
        this.userService = new UserServiceImpl
    }

    public createUser = async(
       req: Request,
       res: Response,
       next: NextFunction
    ): Promise<void> => {
        try{
           const userData = req.body as CreateUserDTO
           const newUser = await this.userService.createUser(userData)
           res.status(201).json(newUser)
        }catch(error){
            next(error)
        }
    }

    public getUserById = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const userId = parseInt(req.params.id)
            const userData = await this.userService.getUserById(userId)
            res.status(200).json(userData)
        }catch(error){
            next(error)
        }
    }

    public getAllUsers = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const users = await this.userService.getAllUsers()
        res.status(200).json({
            users,
           message: "Users retrieved successfully"
        })
        }catch(error){
            next(error)
        }
    }

    public updateUser = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const userId = parseInt(req.params.id)
          const user = req.body as Partial<CreateUserDTO>
          const userData = await this.userService.updateUser(userId, user)
          res.status(201).json(userData)
        }catch(error){
            next(error)
        }
    }

    public deleteUser = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const userId = parseInt(req.params.id)
            const userData = await this.userService.deleteUser(userId)
            res.status(200).json(userData)
        }catch(error){
            next(error)
        }
    }
}