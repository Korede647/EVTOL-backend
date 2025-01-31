import express from "express"
import { EvtolController } from "../controller/evtol.controller";

const evtolcontroller = new EvtolController
const evtolRoutes = express.Router();

evtolRoutes.post("/", evtolcontroller.createEvtol)
evtolRoutes.post("/loadEvtol/:S/N", evtolcontroller.loadEvtolWithMedications)
evtolRoutes.get("/loadedMedication/:S/N", evtolcontroller.getLoadedMedications)
evtolRoutes.get("/", evtolcontroller.getAvailableEvtol)
evtolRoutes.get("/betteryLevel/:S/N", evtolcontroller.getBatteryLevel)

export default evtolRoutes;