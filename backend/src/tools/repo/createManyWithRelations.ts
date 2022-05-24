import { Repository } from 'typeorm';
import { CreatedEntity, NewEntity } from '.';

export async function createManyWithRelations<
  BaseEntity,
  KeysGeneratedByDB extends string = 'id',
>(
  repo: Repository<BaseEntity>,
  newEntities: NewEntity<BaseEntity, KeysGeneratedByDB>[],
  config?: { chunk?: number },
): Promise<CreatedEntity<BaseEntity, KeysGeneratedByDB>[]> {
  console.log(
    'createManyWithRelations before repo.save newEntities: ',
    newEntities,
  );
  // @ts-expect-error при создании мы не можем указать айди, поэтому мы его выпилили
  const shit = await repo.save(newEntities, {
    chunk: config?.chunk,
  });
  console.log('createManyWithRelations repo.save shit: ', shit);
  console.log(
    'createManyWithRelations after repo.save newEntities: ',
    newEntities,
  );
  // @ts-expect-error TODO
  return newEntities;
}
