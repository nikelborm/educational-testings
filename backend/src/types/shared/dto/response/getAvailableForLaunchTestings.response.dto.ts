export class GetAvailableForLaunchTestingsDTO {
  availableForLaunchTestings!: AvailableForLaunchTestingDTO[];
  availableForLaunchInGroups!: AvailableForLaunchInGroupDTO[];
}

export class AvailableForLaunchInGroupDTO {
  id!: number;
  name!: string;
}

export class AvailableForLaunchTestingDTO {
  id!: number;
  name!: string;
  description?: string;
  goal!: string;
}
