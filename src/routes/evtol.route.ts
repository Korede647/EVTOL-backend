import express from "express"
import { EvtolController } from "../controller/evtol.controller";
import { uploadToCloudinaryMedicImage } from "../config/cloudinary.config";

const evtolcontroller = new EvtolController
const evtolRoutes = express.Router();

evtolRoutes.post("/", evtolcontroller.createEvtol)
evtolRoutes.post("/createMedic", uploadToCloudinaryMedicImage, evtolcontroller.createMedic)
evtolRoutes.post("/loadEvtol/:S/N", evtolcontroller.loadEvtolWithMedications)

evtolRoutes.get("/allEvtol", evtolcontroller.getAllEvtol)
evtolRoutes.get("/:SN", evtolcontroller.getEvtolBySN)
evtolRoutes.get("/loadedMedication/:S/N", evtolcontroller.getLoadedMedications)
evtolRoutes.get("/", evtolcontroller.getAvailableEvtol)
evtolRoutes.get("/betteryLevel/:S/N", evtolcontroller.getBatteryLevel)

export default evtolRoutes;