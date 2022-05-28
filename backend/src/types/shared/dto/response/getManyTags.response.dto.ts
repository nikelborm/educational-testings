export class GetManyTagsResponseDTO {
  tags!: SingleTagDTO[];
}

export class SingleTagResponseDTO {
  tag!: SingleTagDTO;
}

export class SingleTagDTO {
  id!: number;
  name!: string;
  description!: string;
}
