import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailableForLaunchTesting } from '../model';

@Injectable()
export class AvailableForLaunchTestingRepo {
  constructor(
    @InjectRepository(AvailableForLaunchTesting)
    private readonly repo: Repository<AvailableForLaunchTesting>,
  ) {}
}
