import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/config';
import {
  CreatedEntity,
  createOneWithRelations,
  NewEntity,
  UpdateEntity,
  updateOneWithRelations,
} from 'src/tools';
import { Repository } from 'typeorm';
import { Tag } from '../model';

@Injectable()
export class TagRepo {
  constructor(
    @InjectRepository(Tag)
    private readonly repo: Repository<Tag>,
  ) {}

  async getOneById(id: number): Promise<Tag> {
    const tag = await this.repo.findOne({
      where: { id },
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

  async deleteMany(tagIds: number[]): Promise<void> {
    await this.repo.delete(tagIds);
  }
}
