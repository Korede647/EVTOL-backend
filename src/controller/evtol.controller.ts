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

    public createMedic = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const {name, weight, code} = req.body as CreateMedicationDTO;
            const imageUrl = req.file ? req.file?.path: ""

            if (!imageUrl) {
                res.status(400).json({ message: "Medication image is required." });
            }
    
            const newMedic = await this.evtolservice.createMedication({
                name, 
                weight: Number(weight),
                code,
                image: imageUrl
            });
            res.status(201).json({
                message: "Medication created successfully.",
                data: newMedic,
            });
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
            res.status(400).json(evtols)
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
            // const evtol = req.params.serialNo;
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

            res.status(201).json(getMedications);
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
            res.status(201).json(evtols)
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