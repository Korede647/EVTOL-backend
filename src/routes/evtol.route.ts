import express from "express"
import { EvtolController } from "../controller/evtol.controller";

const evtolcontroller = new EvtolController
const evtolRoutes = express.Router();

evtolRoutes.post("/", evtolcontroller.createEvtol)
evtolRoutes.post("/loadEvtol/:serialNo", evtolcontroller.loadEvtolWithMedications)

evtolRoutes.get("/all/evtol", evtolcontroller.getAllEvtol)
evtolRoutes.get("/:serialNo", evtolcontroller.getEvtolBySN)
evtolRoutes.get("/loadedMedication/:serialNo", evtolcontroller.getLoadedMedications)
evtolRoutes.get("/deliveringMedications/:serialNo", evtolcontroller.deliverMedications)
evtolRoutes.get("/all/available", evtolcontroller.getAvailableEvtol)
evtolRoutes.get("/batteryLevel/:serialNo", evtolcontroller.getBatteryLevel)

export default evtolRoutes;