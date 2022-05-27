export class GetAvailableForLaunchTestingsDTO {
  abstractTestings!: AvailableForLaunchTestingDTO[];
}

export class AvailableForLaunchTestingDTO {
  id!: number;
  name!: string;
  description?: string;
  goal!: string;
}
