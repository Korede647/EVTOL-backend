import { MODEL, STATUS } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateEvtolDTO {
    @IsString()
    @IsNotEmpty()
    @Length(10, 100)
    serialNo!: string

    @IsNotEmpty()
    @IsEnum(MODEL)
    model!: MODEL

    @IsNotEmpty()
    weightLimit!: number

    @IsNotEmpty()
    batteryCapacity!: number

    @IsEnum(STATUS)
    @IsNotEmpty()
    status!: STATUS
}       