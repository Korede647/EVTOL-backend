import { eVTOLDevice, Medication } from "@prisma/client";
import { CreateMedicationDTO } from "../dto/createMedication.dto";

export interface MedicationService{
    createMedication(data: CreateMedicationDTO): Promise<Medication>
    getAllMedications(): Promise<Medication[]>
    getMedicationByCode(code: string): Promise<Medication | null>
    updateMedication(code: string, data: Partial<CreateMedicationDTO>): Promise<Medication>
    deleteMedication(code: string): Promise<void>

}