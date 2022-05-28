export class GetPublicAbstractTestings {
  abstractTestings!: PublicAbstractTesting[];
}

export class PublicAbstractTesting {
  id!: number;
  name!: string;
  goal!: string;
  description?: string;
}
