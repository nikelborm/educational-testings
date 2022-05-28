import { Injectable } from '@nestjs/common';
import { SingleTagDTO } from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class TagUseCase {
  constructor(private readonly tagRepo: repo.TagRepo) {}

  async getAll(): Promise<SingleTagDTO[]> {
    return await this.tagRepo.getAll();
  }

  async getOneById(id: number): Promise<SingleTagDTO> {
    return await this.tagRepo.getOneById(id);
  }
}
