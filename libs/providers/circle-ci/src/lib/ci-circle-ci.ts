import { GenerateConfig } from "@cypress-dx/ci-config";


const generateBasicYmlText = (): string => 
`# to use orbs, must use version >= 2.1
version: 2.1
orbs:
  # import Cypress orb by specifying an exact version x.y.z
  # or the latest version 1.x.x using "@1" syntax
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      # "cypress" is the name of the imported orb
      # "run" is the name of the job defined in Cypress orb
      - cypress/run`

const generateRecordYmlText = (): string => 
`      record: true`

export function generateCircleCI(config: GenerateConfig): string {
  const basic = generateBasicYmlText();

  if (config.recordKey) {
    return `${basic}
    ${generateRecordYmlText()}`
  }

  return basic;
}
