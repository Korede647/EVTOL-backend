import { User } from "@prisma/client";
import { CreateUserDTO } from "../../dto/createUser.dto";
import { UserService } from "../user.service";
import { db } from "../../config/db";
import { CustomError } from "../../exceptions/customError.error";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../../utils/password.util";

export class UserServiceImpl implements UserService{
    async createUser(data: CreateUserDTO): Promise<User> {
         const isUserExists = await db.user.findFirst({
            where: {
                email: data.email
            },
         })
         if(isUserExists){
            throw new CustomError(
                StatusCodes.CONFLICT,
                "Oops a user with this email already exists."
            )
         }

         const user = await db.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: await hashPassword(data.password)
            }
         })
         return user
    }

    async getUserById(id: number): Promise<User | null> {
        const user = await db.user.findUnique({
            where: {
                id: id
            },
        })
        if(!user){
            throw new CustomError(
                StatusCodes.NOT_FOUND,
                "No user with id specified"
            )
        }
        return user
    }
    
    async getAllUsers(): Promise<User[]> {
        return await db.user.findMany()
    }

    async updateUser(id: number, data: Partial<CreateUserDTO>): Promise<User> {
       const isUserExists = await db.user.findFirst({
        where: {
            id
        },
       })
       if(!isUserExists){
        throw new CustomError(StatusCodes.CONFLICT, "User does not exist")
       }
       const user = await db.user.update({
        where: {
            id: id
        },
        data
       })

       return user
    }

    async deleteUser(id: number): Promise<void> {
       const isUserExists = await db.user.findUnique({
        where: {
            id
        },
       })
       if(!isUserExists){
        throw new CustomError(
            StatusCodes.NOT_FOUND,
            "User not found"
        )
       }
       await db.user.delete({
        where: {
            id
        }
       })
    }
    
}