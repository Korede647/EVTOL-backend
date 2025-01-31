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
}