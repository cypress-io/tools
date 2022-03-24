import { GenerateConfig } from "@cypress-dx/ci-config";

export function generateGitHubActions(config: GenerateConfig): string {
  return 'ci-github-actions';
}
