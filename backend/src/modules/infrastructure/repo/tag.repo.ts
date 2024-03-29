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
import { SingleTagDTO } from 'src/types';
import { Repository } from 'typeorm';
import { Tag } from '../model';

@Injectable()
export class TagRepo {
  constructor(
    @InjectRepository(Tag)
    private readonly repo: Repository<Tag>,
  ) {}

  async getAll(): Promise<SingleTagDTO[]> {
    return await this.repo.find({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  async getOneById(id: number): Promise<SingleTagDTO> {
    const tag = await this.repo.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!tag)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'tag'),
      );
    return tag;
  }

  async updateOneWithRelations(
    updatedTag: UpdateEntity<Tag, 'id'>,
  ): Promise<Tag> {
    return await updateOneWithRelations<Tag, 'id'>(this.repo, updatedTag);
  }

  async createOneWithRelations(
    newTag: NewEntity<Tag, 'id'>,
  ): Promise<CreatedEntity<Tag, 'id'>> {
    return await createOneWithRelations(this.repo, newTag);
  }

  async createManyWithRelations(
    newTags: NewEntity<Tag, 'id'>[],
  ): Promise<CreatedEntity<Tag, 'id'>[]> {
    return await createManyWithRelations(this.repo, newTags);
  }

  async deleteMany(tagIds: number[]): Promise<void> {
    await this.repo.delete(tagIds);
  }
}
