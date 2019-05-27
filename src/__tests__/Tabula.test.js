const Tabula = require('../Tabula');

describe('Tabula', () => {
  it('creates a new instance when using new()', () => {
    const table = new Tabula('foo', {});
    expect(table instanceof Tabula).toBeTruthy();
  });
});
