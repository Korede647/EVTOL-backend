import { Response, Request, NextFunction } from "express";
import { EvtolServiceImpl } from "../service/impl/evtol.service.impl";
import { CreateEvtolDTO } from "../dto/createEvtol.dto";


interface loadEvtolBody {
    medicCodes: string[]
}

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


    public requestEvtol = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const serialNo = req.params.serialNo
            const userId = parseInt(req.params.id);

            const requestedEvtol = await this.evtolservice.requestEvtol(userId, serialNo);
            
            res.status(201).json({
             message: "EVTOL successfully requested",
             data: requestedEvtol
            });
        }catch(error){
            next(error)
        }
    }

    public approveRequestedEvtol = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const userId = parseInt(req.params.id);
            const serialNo = req.params.serialNo

            const approvedRequest = await this.evtolservice.approveRequestEvtol(userId, serialNo)

            res.status(200).json({
                message: "Evtol request has been approved.",
                data: approvedRequest
            })
        }catch(error){
            next(error)
        }
    }

    public rejectRequestedEvtol = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const userId = parseInt(req.params.id)
            const serialNo = req.params.serialNo

            const rejectedRequest = await this.evtolservice.rejectRequestEvtol(userId, serialNo)

            res.status(200).json({
                message: "Evtol request has been rejected."
            })
        }catch(error){
            next(error)
        }
    }

    public getAllLoadedEvtol = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const evtols = await this.evtolservice.getAllLoadedEvtol()
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

    public loadEvtolWithMedications = async (
        req: Request<any, loadEvtolBody>,
        res: Response,
        next: NextFunction
    ): Promise<void>  => {
        try{
            const serialNo = req.params.serialNo
            const userId = parseInt(req.params.id)
            const medicCode = req.body

              if (!serialNo || !userId|| !Array.isArray(medicCode)) {
               res.status(400).json({ message: "Invalid input data" });
              }

           const loadEvtol = await this.evtolservice.loadEvtolWithMedication(serialNo, userId, medicCode)
           res.status(201).json({
            message: "Evtol loaded successfully",
            data: loadEvtol
           })
        }catch (error){
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