import { eVTOLDevice, Medication } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/createEvtol.dto";
import { CreateMedicationDTO } from "../dto/createMedication.dto";

export interface EvtolService{
    createEvtol(data: CreateEvtolDTO): Promise<eVTOLDevice>;
    loadEvtolWithMedication(EvtolSerialNo: string, medications: CreateMedicationDTO[]): Promise<eVTOLDevice>
    getLoadedMedications(EvtolSerialNo: string): Promise<Medication[]>
    getAvailableEvtol(): Promise<EvtolService>
    getBatteryLevel(EvtolId: number): Promise<number>
}