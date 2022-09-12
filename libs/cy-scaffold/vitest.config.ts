/// <reference types="vitest" />

import { mergeConfig } from 'vite';
import baseConfig from '../../vitest.config';

export default mergeConfig(baseConfig, {
  test: {
     globals: true,
  setupFiles: ["./tests/config/setup.js"],
  testTimeout: 10000,
  hookTimeout: 10000,
  },
  plugins: [],
});
