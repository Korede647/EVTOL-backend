import { eVTOLDevice, EvtolRequest, Medication } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/createEvtol.dto";

export interface EvtolService{
    createEvtol(data: CreateEvtolDTO): Promise<eVTOLDevice>;
    getEvtolBySN(serialNo: string): Promise<eVTOLDevice | null>
    getAllEvtol(): Promise<eVTOLDevice[]>
    loadEvtolWithMedication(EvtolSerialNo: string,userId: number,  medicCodes: string[]): Promise<eVTOLDevice>
    getLoadedMedications(EvtolSerialNo: string, userId: number): Promise<Medication[]>
    getEvtolLoadedByUser(userId: number): Promise<eVTOLDevice[]>
    requestEvtol(userId: number, EvtolSerialNo: string): Promise<eVTOLDevice>

    rejectRequestEvtol(userId: number, EvtolSerialNo: string): Promise<EvtolRequest>
    approveRequestEvtol(userId: number, EvtolSerialNo: string): Promise<EvtolRequest>

    getAvailableEvtol(): Promise<eVTOLDevice[]>
    
    deliverMedication(EvtolSerialNo: string, distance: number): Promise<eVTOLDevice>
    getAllLoadedMedications(EvtolSerialNo: string): Promise<Medication[]>
    getAllLoadedEvtol(): Promise<eVTOLDevice[]>
    getBatteryLevel(EvtolSerialNo: string): Promise<number>
    updateEvtol(serialNo: string, data: Partial<CreateEvtolDTO>): Promise<eVTOLDevice>
    deleteEvtol(serialNo: string): Promise<void>
}