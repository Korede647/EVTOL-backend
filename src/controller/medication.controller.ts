import { Response, Request, NextFunction } from "express";
import { MedicationServiceImpl } from "../service/impl/medication.service.impl";
import { CreateMedicationDTO } from "../dto/createMedication.dto";

export class MedicController {
    private medicationservice: MedicationServiceImpl;

    constructor(){
        this.medicationservice = new MedicationServiceImpl
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
        
                const newMedic = await this.medicationservice.createMedication({
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

        public getAllMedic = async(
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            try{
                const medics = await this.medicationservice.getAllMedications()
                    res.status(200).json({
                        medics, 
                        message: "Medications retrieved successfully"})
            }catch(error){
                next(error)
            }
        }

        public getMedicationByCode = async(
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            try{
                const medic = req.params.code;
                const Onemedic = await this.medicationservice.getMedicationByCode(medic)
                res.status(200).json(Onemedic);
            }catch(error){
                next(error)
            }
        }
      
        public updateMedication = async(
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            try{
                const medic = req.params.code
                const bodyMedic = req.body as CreateMedicationDTO
                const updateMedic = await this.medicationservice.updateMedication(medic, bodyMedic)
                res.status(200).json(updateMedic)
            }catch(error){
                next(error)
            }
        }

        public deleteMedication = async(
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            try{
                const medic = req.params.code
                const deleted = await this.medicationservice.deleteMedication(medic)
                res.status(200).json(deleted)
            }catch(error){
                next(error)
            }
        }
}