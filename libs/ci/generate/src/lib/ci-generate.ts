import { GenerateConfig } from "@cypress-dx/ci-config";
import { generateCircleCI } from "@cypress-dx/circle-ci";
import { generateGitHubActions } from "@cypress-dx/github-actions";

export function ciGenerate(config: GenerateConfig) {
  switch (config.provider) {
    case 'CircleCI':
      return generateCircleCI(config)

    case 'GitHub Actions':
      return generateGitHubActions(config)
  
    default:
      break;
  }
}
