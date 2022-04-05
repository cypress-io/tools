import { GenerateConfig } from "@cypress-dx/ci-config";
import { generateGitHubActions } from "./ci-github-actions";

describe('generateGitHubActions', () => {
  it('returns the basic YML WITHOUT Recording on push', () => {
    // arrange
    const config = { recordKey: false, triggerType: 'push' } as GenerateConfig;
    const expected =
`name: Cypress GitHub Action CI Script
on: [push]
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

    // act
    const actual = generateGitHubActions(config);

    // assert
    expect(actual).toEqual(expected);
  })

  it('returns the Basic YML WITH recording on pull request', () => {
    // arrange
    const config: GenerateConfig = { recordKey: true, triggerType: 'pull request' } as GenerateConfig;
    const expected = 
`name: Cypress GitHub Action CI Script
on: [pull request]
jobs:
  cypress-run:
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      # Install NPM dependencies, cache them correctly
      # and run all Cypress tests
      - name: Cypress run
        uses: cypress-io/github-action@v3
        with:
          record: true
        env:
          # pass the Dashboard record key as an environment variable
          CYPRESS_RECORD_KEY: \${{ secrets.CYPRESS_RECORD_KEY }}
          # pass GitHub token to allow accurately detecting a build vs a re-run build
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`

    // act
    const actual = generateGitHubActions(config);

    // assert
    expect(actual).toEqual(expected);
  })

  it('returns the Basic YML WITH recording on merge', () => {
    // arrange
    const config: GenerateConfig = { recordKey: true, triggerType: 'merge' } as GenerateConfig;
    const expected = 
`name: Cypress GitHub Action CI Script
on: [merge]
jobs:
  cypress-run:
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      # Install NPM dependencies, cache them correctly
      # and run all Cypress tests
      - name: Cypress run
        uses: cypress-io/github-action@v3
        with:
          record: true
        env:
          # pass the Dashboard record key as an environment variable
          CYPRESS_RECORD_KEY: \${{ secrets.CYPRESS_RECORD_KEY }}
          # pass GitHub token to allow accurately detecting a build vs a re-run build
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`

    // act
    const actual = generateGitHubActions(config);

    // assert
    expect(actual).toEqual(expected);
  })
})