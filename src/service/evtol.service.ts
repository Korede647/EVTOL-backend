import { eVTOLDevice, Medication } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/createEvtol.dto";

export interface EvtolService{
    createEvtol(data: CreateEvtolDTO): Promise<eVTOLDevice>;
    getEvtolBySN(serialNo: string): Promise<eVTOLDevice | null>
    getAllEvtol(): Promise<eVTOLDevice[]>
    loadEvtolWithMedication(EvtolSerialNo: string, medicCodes: string[]): Promise<eVTOLDevice>
    getAvailableEvtol(): Promise<eVTOLDevice[]>
    deliverMedication(EvtolSerialNo: string): Promise<eVTOLDevice>
    getLoadedMedications(EvtolSerialNo: string): Promise<Medication[]>
    getBatteryLevel(EvtolSerialNo: string): Promise<number>
    updateEvtol(serialNo: string, data: Partial<CreateEvtolDTO>): Promise<eVTOLDevice>
    deleteEvtol(serialNo: string): Promise<void>
}