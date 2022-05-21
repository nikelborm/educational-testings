import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/config';
import {
  createOneWithRelations,
  NewEntity,
  UpdatedEntity,
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

  async updateOneWithRelations(updatedTag: UpdatedEntity<Tag>): Promise<Tag> {
    return await updateOneWithRelations(this.repo, updatedTag, 'tag');
  }

  async createOneWithRelations(newTag: NewEntity<Tag>): Promise<Tag> {
    return await createOneWithRelations(this.repo, newTag, 'tag');
  }

  async deleteMany(tagIds: number[]): Promise<void> {
    await this.repo.delete(tagIds);
  }
}
