import { IsNotEmpty, Length } from "class-validator";

export class CreateMedicationDTO {
    @IsNotEmpty()
    @Length(2, 70)
    name!: string

    @IsNotEmpty()
    weight!: number

    @IsNotEmpty()
    code!: string

    @IsNotEmpty()
    image!: string
}