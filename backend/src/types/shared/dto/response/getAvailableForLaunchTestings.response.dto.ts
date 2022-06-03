import { TestingAnalyticsModuleSupport } from '../../model';

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
  analyticsModules!: AnalyticsModuleOfAvailableForLaunchTestingDTO[];
}

export class AnalyticsModuleOfAvailableForLaunchTestingDTO {
  id!: number;
  uuid!: string;
  name!: string;
  description?: string;
  support!: TestingAnalyticsModuleSupport;
}
