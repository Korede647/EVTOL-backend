import express from "express"
import { EvtolController } from "../controller/evtol.controller";
import { uploadToCloudinaryMedicImage } from "../config/cloudinary.config";

const evtolcontroller = new EvtolController
const evtolRoutes = express.Router();

evtolRoutes.post("/", evtolcontroller.createEvtol)
evtolRoutes.post("/createMedic", uploadToCloudinaryMedicImage, evtolcontroller.createMedic)
evtolRoutes.post("/loadEvtol/:serialNo", evtolcontroller.loadEvtolWithMedications)

evtolRoutes.get("/all", evtolcontroller.getAllEvtol)
evtolRoutes.get("/:serialNo", evtolcontroller.getEvtolBySN)
evtolRoutes.get("/:serialNo/loadedMedication/", evtolcontroller.getLoadedMedications)
evtolRoutes.get("/", evtolcontroller.getAvailableEvtol)
evtolRoutes.get("/:serialNo/batteryLevel/", evtolcontroller.getBatteryLevel)

export default evtolRoutes;