import { GenerateConfig } from "@cypress-dx/ci-config";
import { generateCircleCI } from "@cypress-dx/circle-ci";

export function ciGenerate(config: GenerateConfig) {
  switch (config.provider) {
    case 'CircleCI':
      return generateCircleCI(config)

    case 'GitHub Actions':
      return config.provider;
  
    default:
      break;
  }
}
