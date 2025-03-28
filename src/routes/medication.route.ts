import express from "express"
import { MedicController } from "../controller/medication.controller";
import { uploadToCloudinaryMedicImage } from "../config/cloudinary.config";
import { authenticateUser } from "../middleware/auth.middleware";

const mediController = new MedicController
const medicRoutes = express.Router();

medicRoutes.post("/", authenticateUser, uploadToCloudinaryMedicImage, mediController.createMedic)
medicRoutes.get("/", authenticateUser, mediController.getAllMedic)
medicRoutes.get("/:code", authenticateUser, mediController.getMedicationByCode)
medicRoutes.get("/updateMedic/:code", authenticateUser, mediController.updateMedication)
medicRoutes.get("/deleteMedic/:code", authenticateUser, mediController.deleteMedication)

export default medicRoutes