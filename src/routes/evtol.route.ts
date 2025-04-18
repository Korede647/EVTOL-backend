import express from "express"
import { EvtolController } from "../controller/evtol.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import isAdmin from "../middleware/isAdmin";

const evtolcontroller = new EvtolController
const evtolRoutes = express.Router();

evtolRoutes.post("/", evtolcontroller.createEvtol)
evtolRoutes.post("/loadEvtol/:serialNo", evtolcontroller.loadEvtolWithMedications)

evtolRoutes.get("/all/evtol", isAdmin, evtolcontroller.getAllEvtol)
evtolRoutes.get("/:serialNo", authenticateUser, evtolcontroller.getEvtolBySN)
evtolRoutes.get("/loadedMedication/:serialNo",isAdmin, authenticateUser, evtolcontroller.getLoadedMedications)
evtolRoutes.get("/loaded/Evtol", authenticateUser, evtolcontroller.getLoadedEvtol)
evtolRoutes.post("/deliveringMedications/:serialNo", authenticateUser, evtolcontroller.deliverMedications)
evtolRoutes.get("/all/available", authenticateUser, evtolcontroller.getAvailableEvtol)
evtolRoutes.get("/batteryLevel/:serialNo", isAdmin, authenticateUser, evtolcontroller.getBatteryLevel)

export default evtolRoutes;