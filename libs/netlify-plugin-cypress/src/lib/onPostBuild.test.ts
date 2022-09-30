import onPostBuild from './onPostBuild.js'
import {
  startServerMaybe,
  serveFolder,
  runCypressTests,
  processCypressResults,
  waitOnMaybe,
} from './utils'

jest.mock('./utils')

const mockStartServerMaybe = startServerMaybe as jest.Mock;
const mockServeFolder = serveFolder as jest.Mock;
const mockRunCypressTests = runCypressTests as jest.Mock;
const mockProcessCypressResults = processCypressResults as jest.Mock;

const setup = ({ postBuildInputs = {} } = {}) => {
  const inputs = {
    postBuild: {
      spa: false,
      record: false,
      ...postBuildInputs,
    },
  }
  const constants = {
    PUBLISH_DIR: 'PUBLISH_DIR',
  }
  const utils = {
    run: jest.fn(),
    build: {
      failBuild: jest.fn(),
    },
    status: {
      show: jest.fn(),
    },
  }

  return {
    inputs,
    constants,
    utils,
    testFunction: () => onPostBuild({ inputs, constants, utils }),
  }
}

describe('onPostBuild', () => {
  beforeEach(() => {
    mockStartServerMaybe.mockReset()
    mockServeFolder.mockReset()
    mockRunCypressTests.mockReset()
    mockProcessCypressResults.mockReset()
  })

  it('skips when post build tests is disabled', async () => {
    const { testFunction } = setup({
      postBuildInputs: { enable: false },
    })

    await expect(testFunction()).resolves.toBe(undefined)
    expect(mockStartServerMaybe).not.toHaveBeenCalled()
    expect(mockServeFolder).not.toHaveBeenCalled()
  })

  describe('start option', () => {
    it('runs the specified command', async () => {
      const startCommand = 'a start command'
      const { testFunction, utils } = setup({
        postBuildInputs: {
          enable: true,
          start: startCommand,
        },
      })

      await expect(testFunction()).resolves.toBe(undefined)
      expect(mockStartServerMaybe).toHaveBeenCalledWith(utils.run, {
        start: startCommand,
      })
    })

    it('waits for the specified url before continuing', async () => {
      const startCommand = 'a start command'
      const { testFunction, utils, inputs } = setup({
        postBuildInputs: {
          enable: true,
          start: startCommand,
          'wait-on': 'URL',
          'wait-on-timeout': 10,
        },
      })

      await expect(testFunction()).resolves.toBe(undefined)
      expect(waitOnMaybe).toHaveBeenCalledWith(utils.build, {
        'wait-on': inputs.postBuild['wait-on'],
        'wait-on-timeout': inputs.postBuild['wait-on-timeout'],
      })
    })

    it('kills the process when tests are complete', async () => {
      const { testFunction } = setup({
        postBuildInputs: {
          enable: true,
          start: 'a start command',
        },
      })

      const stopMock = jest.fn()
      mockStartServerMaybe.mockReturnValue(stopMock)

      await expect(testFunction()).resolves.toBe(undefined)
      expect(stopMock).toHaveBeenCalled()
    })

    it('does not try to serve the publish folder', async () => {
      const { testFunction } = setup({
        postBuildInputs: {
          enable: true,
          start: 'a start command',
        },
      })

      await expect(testFunction()).resolves.toBe(undefined)
      expect(mockServeFolder).not.toHaveBeenCalled()
    })

    it('runs the cypress tests', async () => {
      const { testFunction, inputs } = setup({
        postBuildInputs: {
          enable: true,
          start: 'a start command',
        },
      })

      await expect(testFunction()).resolves.toBe(undefined)
      // TODO: Improve this assertion
      expect(mockRunCypressTests).toHaveBeenCalledWith(
        'http://localhost:8080',
        inputs.postBuild.record,
        inputs.postBuild.spec,
        undefined,
        undefined,
        'chromium',
        undefined,
      )
    })

    it('processes the cypress test results', async () => {
      const { testFunction, inputs, utils } = setup({
        postBuildInputs: {
          enable: true,
          start: 'a start command',
        },
      })

      const testResults = 'RESULTS'
      mockRunCypressTests.mockReturnValue(testResults)

      await expect(testFunction()).resolves.toBe(undefined)
      // TODO: Improve assertion
      expect(mockProcessCypressResults).toHaveBeenCalledWith(
        testResults,
        expect.any(Function),
        expect.any(Function),
      )
    })
  })

  describe('serve folder', () => {
    it('serves the publish folder when a start command is not specified', async () => {
      const { testFunction, constants } = setup({
        postBuildInputs: {
          enable: true,
        },
      })

      await expect(testFunction()).resolves.toBe(undefined)
      expect(mockServeFolder).toHaveBeenCalledWith(
        constants.PUBLISH_DIR,
        8080,
        false,
      )
    })

    it('kills the process when tests are complete', async () => {
      const { testFunction } = setup({
        postBuildInputs: {
          enable: true,
        },
      })

      const serverCloseMock = jest.fn().mockImplementation((cb) => cb())
      mockServeFolder.mockReturnValue({ close: serverCloseMock })

      await expect(testFunction()).resolves.toBe(undefined)
      expect(serverCloseMock).toHaveBeenCalled()
    })

    it('calls the error callback when it fails to serve the folder', async () => {
      const { testFunction, utils, constants } = setup({
        postBuildInputs: {
          enable: true,
        },
      })

      const error = new Error('Broken')
      mockServeFolder.mockImplementation(() => {
        throw error
      })

      await expect(testFunction()).resolves.toBe(undefined)
      expect(
        utils.build.failBuild,
      ).toHaveBeenCalledWith(
        `Could not serve folder ${constants.PUBLISH_DIR}`,
        { error },
      )
    })

    it('rejects when it fails to close the server', async () => {
      const { testFunction, utils, constants } = setup({
        postBuildInputs: {
          enable: true,
        },
      })

      const error = new Error('Broken')
      mockServeFolder.mockReturnValue({
        close: () => {
          throw error
        },
      })

      await expect(testFunction()).rejects.toBe(error)
    })

    it('runs the cypress tests', async () => {
      const { testFunction, inputs } = setup({
        postBuildInputs: {
          enable: true,
        },
      })

      await expect(testFunction()).resolves.toBe(undefined)
      // TODO: Improve this assertion
      expect(mockRunCypressTests).toHaveBeenCalledWith(
        'http://localhost:8080',
        inputs.postBuild.record,
        inputs.postBuild.spec,
        undefined,
        undefined,
        'chromium',
        undefined,
      )
    })

    it('processes the cypress test results', async () => {
      const { testFunction, inputs, utils } = setup({
        postBuildInputs: {
          enable: true,
          start: 'a start command',
        },
      })

      const testResults = 'RESULTS'
      mockRunCypressTests.mockReturnValue(testResults)

      await expect(testFunction()).resolves.toBe(undefined)
      // TODO: Improve assertion
      expect(mockProcessCypressResults).toHaveBeenCalledWith(
        testResults,
        expect.any(Function),
        expect.any(Function),
      )
    })
  })
})
