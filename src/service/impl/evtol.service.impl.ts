import { eVTOLDevice, Medication } from "@prisma/client";
import { CreateEvtolDTO } from "../../dto/createEvtol.dto";
import { CreateMedicationDTO } from "../../dto/createMedication.dto";
import { EvtolService } from "../evtol.service";
import { db } from "../../config/db";
import { CustomError } from "../../exceptions/customError.error";
import { StatusCodes } from "http-status-codes";

export class EvtolServiceImpl implements EvtolService{
   async createEvtol(data: CreateEvtolDTO): Promise<eVTOLDevice> {
        const isEvtolExist = await db.eVTOLDevice.findFirst({
            where: {
                serialNo: data.serialNo,
            }
        });
        if(isEvtolExist){
              throw new CustomError(StatusCodes.CONFLICT, "Oops a device already has this serial Number.")
        }

        const user = await db.eVTOLDevice.create({
            data: {
                serialNo: data.serialNo,
                model: data.model,
                weightLimit: data.weightLimit,
                batteryCapacity: data.batteryCapacity,
                status: data.status
            }
        })
       return user;
    }
   async loadEvtolWithMedication(EvtolId: number, medications: CreateMedicationDTO[]): Promise<eVTOLDevice> {
        throw new Error("Method not implemented.");
    }
   async getLoadedMedications(EvtolId: number): Promise<Medication[]> {
        throw new Error("Method not implemented.");
    }
   async getAvailableEvtol(): Promise<EvtolService> {
        throw new Error("Method not implemented.");
    }
   async getBatteryLevel(EvtolId: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

}