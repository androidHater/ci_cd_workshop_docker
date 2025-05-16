import { sum } from '../../src/utils';

test('součet čísel', () => {
  expect(sum(2, 3)).toBe(5);
});
