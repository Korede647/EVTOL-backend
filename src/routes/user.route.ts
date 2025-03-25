import express from "express"
import { UserController } from "../controller/user.contoller";
import { authenticateUser } from "../middleware/auth.middleware";
import isAdmin from "../middleware/isAdmin";

const userController = new UserController
const userRoutes = express.Router()

userRoutes.post("/", userController.createUser)
userRoutes.get("/", isAdmin, userController.getAllUsers)
userRoutes.get("/:id", isAdmin, userController.getUserById)
userRoutes.patch("/:id", authenticateUser, userController.updateUser)
userRoutes.delete("/:id", authenticateUser, userController.deleteUser)

export default userRoutes