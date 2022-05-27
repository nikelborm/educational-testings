import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import { assertUserCanLaunchTestings } from 'src/tools';
import {
  AddTestingToEducationalSpaceCatalogDTO,
  AvailableForLaunchTestingDTO,
  UserAuthInfo,
} from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class AbstractTestingUseCase {
  constructor(
    private readonly abstractTestingRepo: repo.AbstractTestingRepo,
    private readonly availableForLaunchTestingRepo: repo.AvailableForLaunchTestingRepo,
  ) {}

  async getAvailableToLaunchIn(
    educationalSpaceId: number,
    user: UserAuthInfo,
  ): Promise<AvailableForLaunchTestingDTO[]> {
    assertUserCanLaunchTestings(user, educationalSpaceId);
    const availableForLaunchTestings =
      await this.abstractTestingRepo.getManyAvailableForLaunch(
        educationalSpaceId,
      );
    return availableForLaunchTestings;
  }

  async addTestingToEducationalSpaceCatalog(
    educationalSpaceTestingCatalogEntry: AddTestingToEducationalSpaceCatalogDTO,
    user: UserAuthInfo,
  ): Promise<void> {
    const abstractTestings = await this.abstractTestingRepo.getManyCreatedBy(
      user.id,
    );

    const didUserCreateThisTesting = abstractTestings.find(
      ({ id }) => educationalSpaceTestingCatalogEntry.abstractTestingId === id,
    );

    if (!didUserCreateThisTesting)
      throw new BadRequestException(messages.user.didntCreateAbstractTesting);

    const wasTestingAlreadyAdded = abstractTestings.some(
      ({ availableForLaunchInEducationalSpaces, id }) =>
        educationalSpaceTestingCatalogEntry.abstractTestingId === id &&
        availableForLaunchInEducationalSpaces.some(
          ({ id: educationalSpaceId }) =>
            educationalSpaceTestingCatalogEntry.educationalSpaceId ===
            educationalSpaceId,
        ),
    );

    if (wasTestingAlreadyAdded)
      throw new BadRequestException(
        messages.abstractTesting.alreadyAddedToSpace,
      );

    await this.availableForLaunchTestingRepo.createOnePlain(
      educationalSpaceTestingCatalogEntry,
    );
  }
}
