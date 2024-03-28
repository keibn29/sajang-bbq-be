import { Body, Controller, Get, Post } from '@nestjs/common';
import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Get()
  getAll() {
    return 'get success';
  }

  @Post()
  async create(@Body() data: any) {
    // return await this.branchService.create(data);
  }
}
