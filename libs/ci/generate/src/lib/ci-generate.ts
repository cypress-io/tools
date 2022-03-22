import { GenerateConfig } from "@cypress-ci/ci-config";

export function ciGenerate(config: GenerateConfig) {
  switch (config.provider) {
    case 'CircleCI':
      // TODO CircleCIGenerator
      return config.provider

    case 'GitHub Actions':
      // TODO GitHubActionsGenerator
      return config.provider;
  
    default:
      break;
  }
}
