import { generateCircleCI, generateGitHubActions } from "./providers";

export type CIProvider = 'CircleCI' | 'GitHub Actions';
export type PackageManager = 'npm' | 'yarn';
export type CypressTestTypes = 'e2e' | 'component' | 'both';
export type CIOnType = 'pull request' | 'merge' | 'push';

export interface GenerateConfig {
  provider: CIProvider;
  packageManager: PackageManager;
  cypressVersion: number;
  nodeVersion: number;
  testType: CypressTestTypes;
  triggerType: CIOnType;
  triggerBranches: string[];
  recordKey: boolean;
}

export function generate(config: GenerateConfig) {
  switch (config.provider) {
    case 'CircleCI':
      return generateCircleCI(config);

    case 'GitHub Actions':
      return generateGitHubActions(config);

    default:
      break;
  }
}
