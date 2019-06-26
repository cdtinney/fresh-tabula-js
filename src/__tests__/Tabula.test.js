const Tabula = require('../Tabula');

describe('Tabula', () => {
  describe('constructor', () => {
    it('creates a new instance when using new()', () => {
      const table = new Tabula('foo', {});
      expect(table instanceof Tabula).toBeTruthy();
    });
  });

  describe('stream()', () => {
    // TODO
  });

  describe('streamSections()', () => {
    // TODO
  });

  describe('getData()', () => {
    // TODO
  });
});
