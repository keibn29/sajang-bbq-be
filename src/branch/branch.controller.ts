import { Body, Controller, Get, Post } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-dto';

@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Get()
  getAll() {
    return 'get success';
  }

  @Post()
  async create(@Body() data: CreateBranchDto) {
    return await this.branchService.create(data);
  }
}
