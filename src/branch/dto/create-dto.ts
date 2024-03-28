import { IsNotEmpty } from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone: string;

  avatar: string;
}
