import { GenerateConfig } from "@cypress-dx/ci-config";

const generateBasicYmlText = (config: GenerateConfig): string =>
`name: Cypress GitHub Action CI Script
on: [${config.triggerType}]
jobs:
  cypress-run:
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      # Install NPM dependencies, cache them correctly
      # and run all Cypress tests
      - name: Cypress run
        uses: cypress-io/github-action@v3`

const generateRecordYmlText = (): string => 
`       with:
          record: true
        env:
          # pass the Dashboard record key as an environment variable
          CYPRESS_RECORD_KEY: \${{ secrets.CYPRESS_RECORD_KEY }}
          # pass GitHub token to allow accurately detecting a build vs a re-run build
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`

export function generateGitHubActions(config: GenerateConfig): string {
  const basic = generateBasicYmlText(config)
  
  if (config.recordKey) {
    return `${basic}
 ${generateRecordYmlText()}`
  }

  return basic;
}