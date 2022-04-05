import { generateCircleCI } from "./ci-circle-ci";
import { GenerateConfig } from '@cypress-dx/ci-config';

describe('generateCircleCI', () => {
    it('it creates valid CircleCI YML WITHOUT recording', () => {
        // arrange
        const config = { recordKey: false } as GenerateConfig;
        const expected =
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

      // act
      const actual = generateCircleCI(config);

      // assert
      expect(actual).toEqual(expected);
    })

    it('it creates valid CircleCI YML WITH recording', () => {
        // arrange
        const config = { recordKey: true } as GenerateConfig;
        const expected =
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
      - cypress/run
          record: true`

      // act
      const actual = generateCircleCI(config);

      // assert
      expect(actual).toEqual(expected);
    })
})