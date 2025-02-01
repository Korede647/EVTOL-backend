import { eVTOLDevice, Medication } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/createEvtol.dto";
import { CreateMedicationDTO } from "../dto/createMedication.dto";

export interface EvtolService{
    createEvtol(data: CreateEvtolDTO): Promise<eVTOLDevice>;
    getEvtolBySN(serialNo: string): Promise<eVTOLDevice | null>
    getAllEvtol(): Promise<eVTOLDevice[]>
    updateEvtol(serialNo: string, data: Partial<CreateEvtolDTO>): Promise<eVTOLDevice>
    deleteEvtol(serialNo: string): Promise<void>
    
    createMedication(data: CreateMedicationDTO): Promise<Medication>
    loadEvtolWithMedication(EvtolSerialNo: string, medicCodes: string[]): Promise<eVTOLDevice>
    getLoadedMedications(EvtolSerialNo: string): Promise<Medication[]>
    getAvailableEvtol(): Promise<eVTOLDevice[]>
    getBatteryLevel(EvtolSerialNo: string): Promise<number>
}