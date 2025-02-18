import { User } from "@prisma/client";
import { CreateUserDTO } from "../../dto/createUser.dto";
import { UserService } from "../user.service";

export class UserServiceImpl implements UserService{
    createUser(data: CreateUserDTO): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getUserById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    getAllUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    updateUser(id: number, data: Partial<CreateUserDTO>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}