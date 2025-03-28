import { Medication, eVTOLDevice } from "@prisma/client";
import { CreateMedicationDTO } from "../../dto/createMedication.dto";
import { MedicationService } from "../medication.service";
import { CustomError } from "../../exceptions/customError.error";
import { StatusCodes } from "http-status-codes";
import { db } from "../../config/db";

export class MedicationServiceImpl implements MedicationService{

    async createMedication(data: CreateMedicationDTO): Promise<Medication> {
        const isMedicExist = await db.medication.findUnique({
          where: {
             code: data.code
          },
        });
        if (isMedicExist) {
          throw new CustomError(
            StatusCodes.CONFLICT,
            "Oops! A medication with this code already exists."
          );
        }
        if (!data.image) {
            throw new CustomError(StatusCodes.BAD_REQUEST, "Medication image is required.");
        }
    
        const medication = await db.medication.create({
          data: {
            name: data.name,
            weight: data.weight,
            code: data.code,
            image: data.image,
            price: data.price,
            description: data.description,
          }
        });
        return medication;
      }
    
      async getAllMedications(): Promise<Medication[]> {
        return await db.medication.findMany();
    }

    async getMedicationByCode(code: string): Promise<Medication | null> {
           const medication = await db.medication.findUnique({
            where: {
                code
            },
           })
           if(!medication){
            throw new CustomError(StatusCodes.NOT_FOUND, `No Medication with ${code} exists`)
           }
        return medication
    }

    async updateMedication(code: string, data: Partial<CreateMedicationDTO>): Promise<Medication> {
        const isMedicExist = await db.medication.findFirst({
            where: {
                code
            },
        })
        if(!isMedicExist){
            throw new CustomError(StatusCodes.CONFLICT, "Medication not found")
        }
       const medic = await db.medication.update({
            where: {
                code
            },
            data,
        })
        return medic;
    }

    async deleteMedication(code: string): Promise<void> {
        const isMedicExist = await db.medication.findFirst({
            where: {
                code
            },
        })
        if(!isMedicExist){
            throw new CustomError(StatusCodes.CONFLICT, 
            "Medication not found."
            )
        }
          await db.medication.delete({
            where: {
                code
            }
          })
    }
}