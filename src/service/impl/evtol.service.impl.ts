import { eVTOLDevice, Medication, PrismaClient, STATUS } from "@prisma/client";
import { CreateEvtolDTO } from "../../dto/createEvtol.dto";
import { EvtolService } from "../evtol.service";
import { db } from "../../config/db";
import { CustomError } from "../../exceptions/customError.error";
import { StatusCodes } from "http-status-codes";

export class EvtolServiceImpl implements EvtolService {
 async getEvtolBySN(serialNo: string): Promise<eVTOLDevice | null> {
    const evtol = await db.eVTOLDevice.findUnique({
        where: {
            serialNo
        },
    }) 
    if(!evtol){
        throw new CustomError(StatusCodes.NOT_FOUND, `No Evtol Device with serial number ${serialNo} exists`)
    }
      return evtol
  }

async getAllEvtol(): Promise<eVTOLDevice[]> {
    return await db.eVTOLDevice.findMany();
  }

  async updateEvtol(serialNo: string, data: Partial<CreateEvtolDTO>): Promise<eVTOLDevice> {
    const isEvtolExist = await db.eVTOLDevice.findFirst({
      where: {
        serialNo
      },
    })
    if(!isEvtolExist){
      throw new CustomError(StatusCodes.CONFLICT, "EVTOL not found")
    }
    const evtol = await db.eVTOLDevice.update({
      where: {
        serialNo: serialNo
      },
      data
    })
    return evtol
  }

 async deleteEvtol(serialNo: string): Promise<void> {
    const isEvtolExist = await db.eVTOLDevice.findFirst({
      where: {
        serialNo,
      },
    });
    if (isEvtolExist) {
        throw new CustomError(
          StatusCodes.CONFLICT,
          "Evtol device not found."
        );
      }
      await db.eVTOLDevice.delete({
        where: {
            serialNo
        }
      })
  }
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

  async loadEvtolWithMedication(
    EvtolSerialNo: string,
    medicCodes: string[]
  ): Promise<eVTOLDevice> {
    const evtol = await db.eVTOLDevice.findUnique({
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

    const medications = await db.medication.findMany({
        where: {
            code: {
               in : medicCodes
            }
        }
    })

    if (medications.length !== medicCodes.length) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Some medications not found.");
      }

    const totalWeight = medications.reduce((sum, med) => sum + med.weight, 0);

    if (totalWeight > evtol.weightLimit) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "Medication Weight exceeds EVTOL Weight Limit."
      );
    }

    await db.medication.updateMany({
      where: {
         code: {
           in: medicCodes 
          } 
        },
        data: {
          delivered: false
        }
    })
    await db.eVTOLDevice.update({
      where: {
        serialNo: EvtolSerialNo,
      },
      data: {
        status: "LOADING",
      },
    });
    await this.delay(60000);


    const updatedEvtol = await db.eVTOLDevice.update({
      where: {
        serialNo: EvtolSerialNo,
      },
      data: {
        medications: {
            connect: medications.map((med) => ({ id: med.id }))
        },
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
                  status: "LOADED"
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


        async getLoadedEvtol(): Promise<eVTOLDevice[]>{
          const loadedEvtol = await db.eVTOLDevice.findMany({
            where:{
              status: 
             STATUS.LOADED,
          }
          })
          return loadedEvtol;
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

  async deliverMedication(EvtolSerialNo: string, distanceTravelled: number): Promise<eVTOLDevice> {

    const evtol = await db.eVTOLDevice.findUnique({
      where: {
         serialNo: EvtolSerialNo
         },
      include: { medications: true },
    });
  
    if (!evtol) throw new CustomError(StatusCodes.NOT_FOUND, "EVTOL not found");
    if (evtol.status !== STATUS.LOADED) 
      throw new CustomError(StatusCodes.BAD_REQUEST, "EVTOL is not loaded for delivery");
  
    console.log(`Starting delivery for EVTOL ${EvtolSerialNo}...`);
  
    // Change status to DELIVERING
    await db.eVTOLDevice.update({
      where: { 
        serialNo: EvtolSerialNo 
    },
      data: { status: STATUS.DELIVERING },
    });
    console.log("EVTOL is now DELIVERING...");
    
     let currentBattery: number = 0
     if(distanceTravelled > 100 && distanceTravelled < 300){
      currentBattery = evtol.batteryCapacity - 15
     }
     if(distanceTravelled > 300 && distanceTravelled < 600 ){
      currentBattery = evtol.batteryCapacity - 30
     }
     if(distanceTravelled > 600 && distanceTravelled < 1000){
      currentBattery = evtol.batteryCapacity - 45
     }
     if(distanceTravelled > 1000){
      currentBattery = evtol.batteryCapacity - 70
     }else{
     currentBattery = evtol.batteryCapacity - 5
     }
     await this.delay(60000);  // Wait 60 seconds before next step

    // Change status to DELIVERED
    await db.medication.updateMany({
      where: { id: { in: evtol.medications.map((med) => med.id) } },
      data: { 
        delivered: true,    
    } as any,
    });
  
    await db.eVTOLDevice.update({
      where: { 
        serialNo: EvtolSerialNo 
    },
      data: { 
        batteryCapacity: currentBattery,
        status: STATUS.DELIVERED
      },
    });
    
    console.log("✅ EVTOL has DELIVERED the medication...");
    let midCurrentBattery: number = 0
    if(distanceTravelled > 100 && distanceTravelled < 300){
      midCurrentBattery = currentBattery - 10
     }
     if(distanceTravelled > 300 && distanceTravelled < 600 ){
      midCurrentBattery = currentBattery - 20
     }
     if(distanceTravelled > 600 && distanceTravelled < 1000){
      midCurrentBattery = currentBattery - 30
     }
     if(distanceTravelled > 1000){
      midCurrentBattery = currentBattery - 20
     }else{
     midCurrentBattery = currentBattery - 3
     }
    await this.delay(60000); // Wait 60 seconds before next step
  
    await db.eVTOLDevice.update({
      where: {
        serialNo: EvtolSerialNo
      },
      data: {
        batteryCapacity: midCurrentBattery,
        status: STATUS.RETURNING
      },
    })
    console.log("EVTOL has returned from delivery");
    
     
    await this.delay(30000)
    
    let lastcurrentBattery: number = midCurrentBattery - 1
    // Reset EVTOL to IDLE
    const updatedEvtol = await db.eVTOLDevice.update({
      where: { 
        serialNo: EvtolSerialNo 
    },
      data: { 
        status: STATUS.IDLE, 
        batteryCapacity: lastcurrentBattery, // set battery percent to current batteryCapacity after delivery
        medications: { set: [] }  // Clear medications
      },
    });
  
    console.log(" EVTOL has been reset to IDLE.");
    return updatedEvtol;
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

//   function for delays
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
}
