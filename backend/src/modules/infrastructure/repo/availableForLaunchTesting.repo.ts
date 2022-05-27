import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatedEntity,
  CreatedPlainEntity,
  createOnePlain,
  createOneWithRelations,
  NewEntity,
  NewPlainEntity,
} from 'src/tools';
import { Repository } from 'typeorm';
import { AvailableForLaunchTesting } from '../model';

@Injectable()
export class AvailableForLaunchTestingRepo {
  constructor(
    @InjectRepository(AvailableForLaunchTesting)
    private readonly repo: Repository<AvailableForLaunchTesting>,
  ) {}

  async createOneWithRelations(
    newAvailableForLaunchTesting: NewEntity<AvailableForLaunchTesting, never>,
  ): Promise<CreatedEntity<AvailableForLaunchTesting, never>> {
    return await createOneWithRelations(
      this.repo,
      newAvailableForLaunchTesting,
    );
  }

  async createOnePlain(
    newAvailableForLaunchTesting: NewPlainEntity<
      AvailableForLaunchTesting,
      never
    >,
  ): Promise<CreatedPlainEntity<AvailableForLaunchTesting, never>> {
    return await createOnePlain(this.repo, newAvailableForLaunchTesting);
  }
}
