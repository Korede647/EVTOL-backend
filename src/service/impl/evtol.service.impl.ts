import { eVTOLDevice, EvtolRequest, EvtolRequestStatus, LoadedMedication, Medication, PrismaClient, STATUS } from "@prisma/client";
import { CreateEvtolDTO } from "../../dto/createEvtol.dto";
import { EvtolService } from "../evtol.service";
import { db } from "../../config/db";
import { CustomError } from "../../exceptions/customError.error";
import { StatusCodes } from "http-status-codes";
import { constrainedMemory } from "process";

export class EvtolServiceImpl implements EvtolService {
  async rejectRequestEvtol(userId: number, EvtolSerialNo: string): Promise<EvtolRequest> {
    const user = await db.user.findUnique({
      where: {
        id: userId
      }
    })

    if(!user){
      throw new CustomError(StatusCodes.BAD_REQUEST, "User does not exist")
    }

    const evtol = await db.eVTOLDevice.findUnique({
      where: {
        serialNo: EvtolSerialNo
      },
      include: {
        requests: true
      }
    })
    if(!evtol){
      throw new CustomError(StatusCodes.BAD_REQUEST, "Evtol does not exist")
    }

    const request = await db.evtolRequest.findFirst({
      where: { 
        userId, 
        evtolSerialNo: EvtolSerialNo 
      },
    });
    if (!request) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        "No matching eVTOL request found"
      );
    }

    const rejectedRequest = await db.evtolRequest.update({
      where: {
       id: request.id
    },
    include: {
      user: true,
      evtol: true
    },
    data: {
     requestStatus: "DECLINED"
    },
 })
    return rejectedRequest
  }

 async getAllLoadedEvtol(): Promise<eVTOLDevice[]> {
    const loadedEvtol = await db.eVTOLDevice.findMany({
      where: {
        status: STATUS.LOADED,
      },
    })
    return loadedEvtol;
  }

  async getEvtolLoadedByUser(userId: number): Promise<eVTOLDevice[]> {
     const user = await db.user.findUnique({
      where: {
        id: userId
      }
     })
     if(!user){
      throw new CustomError(StatusCodes.BAD_REQUEST, "User is not found")
     }

     const loadedEvtol = await db.loadedMedication.findMany({
      where: {
        userId,
      },
      include: {
        evtolDevice: true
      }
     })
     if(loadedEvtol.length === 0){
        throw new CustomError(
          StatusCodes.ACCEPTED,
          "User has no loaded Evtol."
        )
     }
     return loadedEvtol.map((loaded) => loaded.evtolDevice);
  }

  async requestEvtol(userId: number, EvtolSerialNo:string): Promise<EvtolRequest> {
    const user = await db.user.findUnique({
      where: {
        id: userId
      }
    })

    if(!user){
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        "User Not Found"
      )
    }

    const evtol = await db.eVTOLDevice.findUnique({
      where: {
        serialNo: EvtolSerialNo
      }
    })

    if(!evtol){
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        "Evtol Device Not Found"
      )
    }

    const request = await db.evtolRequest.create({
      data: {
        userId,
        evtolSerialNo: EvtolSerialNo,
        requestStatus: EvtolRequestStatus.PENDING
      }
    })

    return request
  }
 async approveRequestEvtol(userId: number, EvtolSerialNo: string): Promise<EvtolRequest> {
    const user = await db.user.findUnique({
      where: {
        id: userId
      }
    })

    if(!user){
      throw new CustomError(StatusCodes.BAD_REQUEST, "User does not exist")
    }

    const evtol = await db.eVTOLDevice.findUnique({
      where: {
        serialNo: EvtolSerialNo
      },
      include: {
        requests: true
      }
    })
    if(!evtol){
      throw new CustomError(StatusCodes.BAD_REQUEST, "Evtol does not exist")
    }

    const request = await db.evtolRequest.findFirst({
      where: { 
        userId, 
        evtolSerialNo: EvtolSerialNo 
      },
    });
    if (!request) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "No matching eVTOL request found"
      );
    }

    const approvedRequest = await db.evtolRequest.update({
      where: {
       id: request.id
    },
    include: {
      user: true,
      evtol: true
    },
    data: {
     requestStatus: "APPROVED"
    },
 })
    return approvedRequest
  }

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
    evtolSerialNo: string,
    userId: number,
    medicCodes: string[]
  ): Promise<eVTOLDevice> {
    return await db.$transaction(async (tx) => {
      // 1️⃣ Fetch and validate user + request
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new CustomError(StatusCodes.BAD_REQUEST, "User does not exist");
  
      const hasRequested = await tx.evtolRequest.findFirst({
        where: { userId, evtolSerialNo }
      });
      if (!hasRequested) {
        throw new CustomError(StatusCodes.FORBIDDEN, "You have not requested this EVTOL");
      }
  
      // 2️⃣ Fetch EVTOL & meds, validate battery and weight
      const evtol = await tx.eVTOLDevice.findUnique({
        where: { serialNo: evtolSerialNo },
        include: { medications: true },
      });
      if (!evtol) throw new CustomError(StatusCodes.NOT_FOUND, "EVTOL not found");
      if (evtol.batteryCapacity < 25) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Battery too low for loading");
      }
  
      const meds = await tx.medication.findMany({
        where: { code: { in: medicCodes } }
      });
      if (meds.length !== medicCodes.length) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Some medications not found");
      }
      const totalWeight = meds.reduce((sum, m) => sum + m.weight, 0);
      if (totalWeight > evtol.weightLimit) {
        throw new CustomError(
          StatusCodes.BAD_REQUEST,
          "Medication weight exceeds EVTOL weight limit"
        );
      }
  
      // 3️⃣ Mark meds as to‑be‑delivered
      await tx.medication.updateMany({
        where: { code: { in: medicCodes } },
        data: { delivered: false },
      });
  
      // 4️⃣ Insert your “loadedMedication” records
      await tx.loadedMedication.createMany({
        data: medicCodes.map(code => ({
          userId,
          evtol_serialNo: evtolSerialNo,
          medicationCode: code
        }))
      });
  
      // 5️⃣ Set EVTOL state to LOADING
      await tx.eVTOLDevice.update({
        where: { serialNo: evtolSerialNo },
        data: { status: "LOADING" },
      });
  
      // 6️⃣ (Don’t block the DB! Kick off your delay asynchronously instead)
      setTimeout(async () => {
        await db.$transaction(async (tx2) => {
          await tx2.eVTOLDevice.update({
            where: { serialNo: evtolSerialNo },
            data: {
              medications: {
                connect: meds.map(m => ({ id: m.id }))
              },
              status: "LOADED",
            }
          });
        });
      }, 60_000);
  
      // 7️⃣ Return the “LOADING” EVTOL state immediately
      return evtol;
    });
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
      where: { serialNo: EvtolSerialNo },
      include: { medications: true },
    });
  
    if (!evtol) throw new CustomError(StatusCodes.NOT_FOUND, "EVTOL not found");
    if (evtol.status !== STATUS.LOADED)
      throw new CustomError(StatusCodes.BAD_REQUEST, "EVTOL is not loaded for delivery");
  
    console.log(`Starting delivery for EVTOL ${EvtolSerialNo}...`);
  
    // Change status to DELIVERING
    await db.eVTOLDevice.update({
      where: { serialNo: EvtolSerialNo },
      data: { status: STATUS.DELIVERING },
    });
  
    console.log("EVTOL is now DELIVERING...");
  
    let currentBattery = evtol.batteryCapacity;
    
    if (distanceTravelled > 1000) currentBattery -= 70;
    else if (distanceTravelled > 600) currentBattery -= 45;
    else if (distanceTravelled > 300) currentBattery -= 30;
    else if (distanceTravelled > 100) currentBattery -= 15;
    else currentBattery -= 5;
  
    await this.delay(60000); // Wait 60 seconds before next step
  
    // Mark medications as delivered
    await db.medication.updateMany({
      where: { id: { in: evtol.medications.map((med) => med.id) } },
      data: { delivered: true } as any,
    });
  
    await db.eVTOLDevice.update({
      where: { serialNo: EvtolSerialNo },
      data: { batteryCapacity: currentBattery, status: STATUS.DELIVERED },
    });
  
    console.log("✅ EVTOL has DELIVERED the medication...");
  
    let midCurrentBattery = currentBattery;
    
    if (distanceTravelled > 1000) midCurrentBattery -= 20;
    else if (distanceTravelled > 600) midCurrentBattery -= 30;
    else if (distanceTravelled > 300) midCurrentBattery -= 20;
    else if (distanceTravelled > 100) midCurrentBattery -= 10;
    else midCurrentBattery -= 3;
  
    await this.delay(60000); // Wait 60 seconds before next step
  
    await db.eVTOLDevice.update({
      where: { serialNo: EvtolSerialNo },
      data: { batteryCapacity: midCurrentBattery, status: STATUS.RETURNING },
    });
  
    console.log("EVTOL has returned from delivery");
  
    await this.delay(30000);
  
    let lastCurrentBattery = midCurrentBattery - 1;
  
    // Reset EVTOL to IDLE
    const updatedEvtol = await db.eVTOLDevice.update({
      where: { serialNo: EvtolSerialNo },
      data: { 
        status: STATUS.IDLE,
        batteryCapacity: lastCurrentBattery, // Final battery capacity after return
        medications: { set: [] }, // Clear medications
      },
    });
  
    console.log("EVTOL has been reset to IDLE.");
  
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
