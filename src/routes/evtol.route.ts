import express from "express"
import { EvtolController } from "../controller/evtol.controller";

const evtolcontroller = new EvtolController
const evtolRoutes = express.Router();

evtolRoutes.post("/", evtolcontroller.createEvtol)

export default evtolRoutes;