import { IsNotEmpty, Length } from "class-validator";

export class CreateMedicationDTO {
    @IsNotEmpty()
    @Length(2, 70)
    name!: String

    @IsNotEmpty()
    weight!: String

    @IsNotEmpty()
    code!: String

    @IsNotEmpty()
    image!: String
}