import { eVTOLDevice, Medication, PrismaClient, STATUS } from "@prisma/client";
import { CreateEvtolDTO } from "../../dto/createEvtol.dto";
import { CreateMedicationDTO } from "../../dto/createMedication.dto";
import { EvtolService } from "../evtol.service";
import { db } from "../../config/db";
import { CustomError } from "../../exceptions/customError.error";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export class EvtolServiceImpl implements EvtolService {
  async createEvtol(data: CreateEvtolDTO): Promise<eVTOLDevice> {
    const isEvtolExist = await db.eVTOLDevice.findFirst({
      where: {
        serialNo: data.serialNo,
      },
    });
    if (isEvtolExist) {
      throw new CustomError(
        StatusCodes.CONFLICT,
        "Oops a device already has this serial Number."
      );
    }

    const evtol = await db.eVTOLDevice.create({
      data: {
        serialNo: data.serialNo,
        model: data.model,
        weightLimit: data.weightLimit,
        batteryCapacity: data.batteryCapacity,
        status: data.status,
      },
    });
    return evtol;
  }

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
      }
    });
    return medication;
  }

  async loadEvtolWithMedication(
    EvtolSerialNo: string,
    medications: CreateMedicationDTO[]
  ): Promise<eVTOLDevice> {
    const evtol = await db.eVTOLDevice.findFirst({
      where: {
        serialNo: EvtolSerialNo,
      },
      include: {
        medications: true,
      },
    });
    if (!evtol) {
      throw new CustomError(StatusCodes.NOT_FOUND, "Evtol Device not Found");
    }
    if (evtol.batteryCapacity < 25) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "EVTOL Battery too low for loading"
      );
    }

    const currentLoadWeight = evtol.medications.reduce(
      (sum, med) => sum + med.weight,
      0
    );
    const medLoadWeight = medications.reduce((sum, med) => sum + med.weight, 0);
    const totalWeight = currentLoadWeight + medLoadWeight;

    if (totalWeight > evtol.weightLimit) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "Medication Weight exceeds EVTOL Weight Limit."
      );
    }

    await db.eVTOLDevice.update({
      where: {
        serialNo: EvtolSerialNo,
      },
      data: {
        status: "LOADING",
      },
    });

    await db.medication.createMany({
      data: medications.map((med) => ({
        name: med.name,
        weight: med.weight,
        code: med.code,
        image: med.image,
        evtol_serialNo: evtol.serialNo,
      })),
    });

    const updatedEvtol = await db.eVTOLDevice.update({
      where: {
        serialNo: EvtolSerialNo,
      },
      data: {
        status: "LOADED",
      },
      include: {
        medications: true,
      },
    });
    return updatedEvtol;
  }

  async getLoadedMedications(EvtolSerialNo: string): Promise<Medication[]> {

    const evtol = await db.eVTOLDevice.findFirst({
        where: {
            serialNo: EvtolSerialNo,
        },
        include: {
            medications: true,
        },
    })
    if(!evtol){
        throw new CustomError(StatusCodes.NOT_FOUND, "Evtol Device not Found");
    }

    return evtol.medications

  }

  async getAvailableEvtol(): Promise<eVTOLDevice[]> {
    const availableEvtol = await db.eVTOLDevice.findMany({
        where: {
            status: STATUS.IDLE,
            batteryCapacity: { gte: 25 }
        },
    })
    return availableEvtol;
  }

  async getBatteryLevel(EvtolSerialNo: string): Promise<number> {
    const evtol = await db.eVTOLDevice.findUnique({
        where: {
            serialNo: EvtolSerialNo,
        },
        include:{
            batteryHistory: true
        }
    })
    if(!evtol){
        throw new CustomError(StatusCodes.NOT_FOUND, "EVTOL Device not found")
    }
    return evtol.batteryCapacity
  }
}
