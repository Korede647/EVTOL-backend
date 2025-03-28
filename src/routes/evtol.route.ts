import express from "express"
import { EvtolController } from "../controller/evtol.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const evtolcontroller = new EvtolController
const evtolRoutes = express.Router();

evtolRoutes.post("/", evtolcontroller.createEvtol)
evtolRoutes.post("/loadEvtol/:serialNo", evtolcontroller.loadEvtolWithMedications)

evtolRoutes.get("/all/evtol", evtolcontroller.getAllEvtol)
evtolRoutes.get("/:serialNo", authenticateUser, evtolcontroller.getEvtolBySN)
evtolRoutes.get("/loadedMedication/:serialNo", authenticateUser, evtolcontroller.getLoadedMedications)
evtolRoutes.get("/loaded/Evtol", authenticateUser, evtolcontroller.getLoadedEvtol)
evtolRoutes.post("/deliveringMedications/:serialNo", authenticateUser, evtolcontroller.deliverMedications)
evtolRoutes.get("/all/available", authenticateUser, evtolcontroller.getAvailableEvtol)
evtolRoutes.get("/batteryLevel/:serialNo", authenticateUser, evtolcontroller.getBatteryLevel)

export default evtolRoutes;