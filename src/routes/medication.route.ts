import express from "express"
import { MedicController } from "../controller/medication.controller";
import { uploadToCloudinaryMedicImage } from "../config/cloudinary.config";

const mediController = new MedicController
const medicRoutes = express.Router();

medicRoutes.post("/", uploadToCloudinaryMedicImage, mediController.createMedic)
medicRoutes.get("/", mediController.getAllMedic)
medicRoutes.get("/:code", mediController.getMedicationByCode)
medicRoutes.get("/updateMedic/:code", mediController.updateMedication)
medicRoutes.get("/deleteMedic/:code", mediController.deleteMedication)

export default medicRoutes