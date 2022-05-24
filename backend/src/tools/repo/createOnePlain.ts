import { Repository } from 'typeorm';
import { CreatedPlainEntity, NewPlainEntity } from './types';

export async function createOnePlain<
  BaseEntity,
  KeysGeneratedByDB extends string = 'id',
>(
  repo: Repository<BaseEntity>,
  newEntity: NewPlainEntity<BaseEntity, KeysGeneratedByDB>,
): Promise<CreatedPlainEntity<BaseEntity, KeysGeneratedByDB>[]> {
  console.log('createOnePlain before repo.insert newEntity: ', newEntity);
  // @ts-expect-error при создании мы не можем указать айди, поэтому мы его выпилили
  const shit = await repo.insert(newEntity);
  console.log('createOnePlain repo.insert shit: ', shit);
  console.log('createOnePlain after repo.insert newEntity: ', newEntity);
  // if (!entityWithOnlyId?.id)
  //   throw new InternalServerErrorException(
  //     messages.repo.common.cantCreateOne(newEntity, entityName),
  //   );

  // @ts-expect-error TODO
  return { ...newEntity, ...entityWithOnlyId };
}
