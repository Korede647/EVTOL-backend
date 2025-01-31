import { Response, Request, NextFunction } from "express";
import { EvtolServiceImpl } from "../service/impl/evtol.service.impl";
import { CreateEvtolDTO } from "../dto/createEvtol.dto";
import { Medication } from "@prisma/client";
import { CreateMedicationDTO } from "../dto/createMedication.dto";

export class EvtolController{
    private evtolservice: EvtolServiceImpl;

    constructor(){
        this.evtolservice = new EvtolServiceImpl
    }

    public createEvtol = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const evtolData = req.body as CreateEvtolDTO;
            const newEvtol = await this.evtolservice.createEvtol(evtolData);
            res.status(201).json(newEvtol);
        }catch (error){
            next(error);
        }
    }

    public loadEvtolWithMedications = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const evtol = req.params.serialNo;
            const medication = req.body as CreateMedicationDTO[];
            const loadEvtol = await this.evtolservice.loadEvtolWithMedication(evtol, medication);
            
            res.status(201).json(loadEvtol);
        }catch(error){
            next(error)
        }
    }
}