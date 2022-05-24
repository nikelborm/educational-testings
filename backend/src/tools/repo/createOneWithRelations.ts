import { Repository } from 'typeorm';
import { NewEntity, CreatedEntity } from '.';

export async function createOneWithRelations<
  BaseEntity,
  KeysGeneratedByDB extends string = 'id',
>(
  repo: Repository<BaseEntity>,
  newEntity: NewEntity<BaseEntity, KeysGeneratedByDB>,
): Promise<CreatedEntity<BaseEntity, KeysGeneratedByDB>> {
  console.log('createOneWithRelations before repo.save newEntity: ', newEntity);
  // @ts-expect-error при создании мы не можем указать айди, поэтому мы его выпилили
  const shit = await repo.save(newEntity);
  console.log('createOneWithRelations repo.save shit: ', shit);
  console.log('createOneWithRelations after repo.save newEntity: ', newEntity);
  // @ts-expect-error TODO
  return;
}
