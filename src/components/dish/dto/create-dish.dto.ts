import { IsNotEmpty } from 'class-validator';

export class CreateDishDto {
  @IsNotEmpty()
  branchId: number;

  @IsNotEmpty()
  name: string;
}
