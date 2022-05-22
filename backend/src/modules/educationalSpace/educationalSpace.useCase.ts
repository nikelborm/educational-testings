import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { messages } from 'src/config';
import { CreateEducationalSpaceDTO } from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class EducationalSpaceUseCase implements OnModuleDestroy, OnModuleInit {
  constructor(
    private readonly educationalSpaceRepo: repo.EducationalSpaceRepo,
  ) {}

  async createEducationalSpace(
    educationalSpaceDTO: CreateEducationalSpaceDTO,
    user: { id: number; canCreateEducationalSpaces: boolean },
  ): Promise<void> {
    if (!user.canCreateEducationalSpaces)
      throw new BadRequestException(messages.user.cantCreateEducationalSpace);

    await this.educationalSpaceRepo.createOneWithRelations({
      ...educationalSpaceDTO,
      createdByUserId: user.id,
    });
  }

  onModuleDestroy(): void {
    console.log('EducationalSpaceUseCase destroy');
  }

  onModuleInit(): void {
    console.log('EducationalSpaceUseCase init');
  }
}
