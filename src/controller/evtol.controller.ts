import { Response, Request, NextFunction } from "express";
import { EvtolServiceImpl } from "../service/impl/evtol.service.impl";
import { CreateEvtolDTO } from "../dto/createEvtol.dto";

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

    public getAllEvtol = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const evtols = await this.evtolservice.getAllEvtol()
            res.status(200).json(evtols)
        }catch(error){
            next(error)
        }
    }


    public getEvtolBySN = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const evtol = req.params.serialNo;
            const singleEvtol = await this.evtolservice.getEvtolBySN(evtol)
            res.status(200).json(singleEvtol);
        }catch(error){
            next(error)
        }
    }


    public loadEvtolWithMedications = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            // const serialNo = req.params.serialNo;
            const {serialNo, medications} = req.body ;

            if (!serialNo || !medications || !Array.isArray(medications)) {
               res.status(400).json({ message: "Invalid input data" });
              }

            const loadEvtol = await this.evtolservice.loadEvtolWithMedication(serialNo, medications);
            
            res.status(201).json({
             message: "EVTOL successfully loaded",
             data: loadEvtol
            });
        }catch(error){
            next(error)
        }
    }

    public getLoadedMedications = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const evtol = req.params.serialNo;
            const getMedications = await this.evtolservice.getLoadedMedications(evtol)

            res.status(200).json(getMedications);
        }catch(error){
            next(error)
        }
    }

    public getLoadedEvtol = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const evtols = await this.evtolservice.getLoadedEvtol()
            res.status(200).json(evtols)
        }catch(error){
            next(error)
        }
    }

    public getAvailableEvtol = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const evtols = await this.evtolservice.getAvailableEvtol()
            res.status(200).json(evtols)
        }catch(error){
            next(error)
        }
    }

    public deliverMedications = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            // const userId = parseInt(req.params.id)
            const evtol = req.params.serialNo
            const distance = req.body.distance
            const medications = await this.evtolservice.deliverMedication(evtol, distance)
            res.status(201).json(medications)
        }catch(error){
            next(error)
        }
    }

    public getBatteryLevel = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const evtolSN = req.params.serialNo;
            const evtol = await this.evtolservice.getBatteryLevel(evtolSN)
            res.status(201).json(evtol)
        }catch(error){
            next(error)
        }
    }
}