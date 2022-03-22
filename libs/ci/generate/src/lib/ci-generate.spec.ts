import { ciGenerate } from './ci-generate';

describe('ciGenerate', () => {
  it('should work', () => {
    expect(ciGenerate()).toEqual('ci-generate');
  });
});
