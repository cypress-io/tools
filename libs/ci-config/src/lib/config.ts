export type CIProvider = 'CircleCI' | 'GitHub Actions';
export type PackageManager = 'npm' | 'yarn';
export type CypressTestTypes = 'e2e' | 'component' | 'both';
export type CIOnType = 'pull request' | 'merge';

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
