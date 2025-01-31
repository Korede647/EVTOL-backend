import { eVTOLDevice, Medication } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/createEvtol.dto";
import { CreateMedicationDTO } from "../dto/createMedication.dto";

export interface EvtolService{
    createEvtol(data: CreateEvtolDTO): Promise<eVTOLDevice>;
    loadEvtolWithMedication(EvtolId: number, medications: CreateMedicationDTO[]): Promise<eVTOLDevice>
    getLoadedMedications(EvtolId: number): Promise<Medication[]>
    getAvailableEvtol(): Promise<EvtolService>
    getBatteryLevel(EvtolId: number): Promise<number>
}