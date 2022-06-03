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
import { AvailableForLaunchTestingDTO, PublicAbstractTesting } from 'src/types';
import { Repository } from 'typeorm';
import { AbstractTesting } from '../model';

@Injectable()
export class AbstractTestingRepo {
  constructor(
    @InjectRepository(AbstractTesting)
    private readonly repo: Repository<AbstractTesting>,
  ) {}

  async getManyPublic(): Promise<PublicAbstractTesting[]> {
    return await this.repo.find({
      select: {
        id: true,
        name: true,
        description: true,
        goal: true,
      },
      where: {
        isPublic: true,
        isReadyToUse: true,
      },
    });
  }

  async getOneWithQuestionsById(id: number): Promise<AbstractTesting> {
    const abstractTesting = await this.repo.findOne({
      where: { id },
      relations: {
        analyticsModules: true,
        stages: {
          questions: {
            abstractAnswerOptions: {
              contributions: {
                tag: true,
              },
            },
          },
        },
      },
    });
    if (!abstractTesting)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'abstractTesting'),
      );
    return abstractTesting;
  }

  async getOneWithAvailableEducationalSpacesById(id: number): Promise<{
    id: number;
    isReadyToUse: boolean;
    isPublic: boolean;
    availableForLaunchInEducationalSpaces: { id: number }[];
  }> {
    const abstractTesting = await this.repo.findOne({
      where: { id },
      select: {
        id: true,
        isReadyToUse: true,
        isPublic: true,
        availableForLaunchInEducationalSpaces: {
          id: true,
        },
      },
      relations: {
        availableForLaunchInEducationalSpaces: true,
      },
    });
    if (!abstractTesting)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'abstractTesting'),
      );
    return abstractTesting;
  }

  async getOneById(id: number): Promise<AbstractTesting> {
    const abstractTesting = await this.repo.findOne({ where: { id } });
    if (!abstractTesting)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'abstractTesting'),
      );
    return abstractTesting;
  }

  async getManyCreatedBy(createdByUserId: number): Promise<
    {
      id: number;
      availableForLaunchInEducationalSpaces: {
        id: number;
      }[];
    }[]
  > {
    return await this.repo.find({
      where: {
        createdByUserId,
      },
      relations: {
        availableForLaunchInEducationalSpaces: true,
      },
      select: {
        id: true,
        availableForLaunchInEducationalSpaces: {
          id: true,
        },
      },
    });
  }

  async getManyAvailableForLaunch(
    educationalSpaceId: number,
  ): Promise<AvailableForLaunchTestingDTO[]> {
    return await this.repo
      .createQueryBuilder('abstractTesting')
      .select([
        'abstractTesting.id',
        'abstractTesting.name',
        'abstractTesting.description',
        'abstractTesting.goal',
      ])
      .leftJoin(
        'abstractTesting.availableForLaunchInEducationalSpaces',
        'availableForLaunchInEducationalSpaces',
      )
      .where(
        'availableForLaunchInEducationalSpaces.id = :educationalSpaceId AND abstractTesting.isReadyToUse',
        { educationalSpaceId },
      )
      .orWhere('abstractTesting.isPublic AND abstractTesting.isReadyToUse')
      .getMany();
  }

  async getOneByIdForLaunching(id: number): Promise<{
    id: number;
    isPublic: boolean;
    isReadyToUse: boolean;
    availableForLaunchInEducationalSpaces: {
      id: number;
    }[];
    stages: {
      id: number;
      questions: {
        id: number;
        abstractAnswerOptions: {
          id: number;
        }[];
      }[];
    }[];
  }> {
    const abstractTesting = await this.repo.findOne({
      where: { id },
      relations: {
        availableForLaunchInEducationalSpaces: true,
        stages: {
          questions: {
            abstractAnswerOptions: true,
          },
        },
      },
      select: {
        id: true,
        isPublic: true,
        isReadyToUse: true,
        availableForLaunchInEducationalSpaces: {
          id: true,
        },
        stages: {
          id: true,
          questions: {
            id: true,
            abstractAnswerOptions: {
              id: true,
            },
          },
        },
      },
    });
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
