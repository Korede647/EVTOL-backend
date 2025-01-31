import { db } from "../config/db"

export async function checkBatteryLevel () {
        const evtols = await db.eVTOLDevice.findMany({
            select: {
                serialNo: true,
                batteryCapacity: true
            }
        })

        for(const evtol of evtols){
            await db.batteryHistory.create({
                data: {
                    evtol_serialNo: evtol.serialNo,
                    batteryLevel: evtol.batteryCapacity
                }
            });
        }
    }

    