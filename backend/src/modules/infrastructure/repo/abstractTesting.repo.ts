import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/config';
import {
  CreatedEntity,
  createManyWithRelations,
  createOneWithRelations,
  NewEntity,
  UpdateEntity,
  updateOneWithRelations,
} from 'src/tools';
import { Repository } from 'typeorm';
import { AbstractTesting } from '../model';

@Injectable()
export class AbstractTestingRepo {
  constructor(
    @InjectRepository(AbstractTesting)
    private readonly repo: Repository<AbstractTesting>,
  ) {}

  async getOneById(id: number): Promise<AbstractTesting> {
    const abstractTesting = await this.repo.findOne({ where: { id } });
    if (!abstractTesting)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'abstractTesting'),
      );
    return abstractTesting;
  }

  async updateOneWithRelations(
    updatedAbstractTesting: UpdateEntity<AbstractTesting, 'id'>,
  ): Promise<AbstractTesting> {
    return await updateOneWithRelations<AbstractTesting, 'id'>(
      this.repo,
      updatedAbstractTesting,
    );
  }

  async createOneWithRelations(
    newAbstractTesting: NewEntity<AbstractTesting, 'id'>,
  ): Promise<CreatedEntity<AbstractTesting, 'id'>> {
    return await createOneWithRelations(this.repo, newAbstractTesting);
  }

  async createManyWithRelations(
    newAbstractTestings: NewEntity<AbstractTesting, 'id'>[],
  ): Promise<CreatedEntity<AbstractTesting, 'id'>[]> {
    return await createManyWithRelations(this.repo, newAbstractTestings);
  }

  async deleteMany(abstractTestingIds: number[]): Promise<void> {
    await this.repo.delete(abstractTestingIds);
  }
}
