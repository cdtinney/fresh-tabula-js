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
    it('has a stream property', () => {
      const table = new Tabula('foo')
      expect('stream' in table).toBe(true);
    })
  });

  describe('streamSections()', () => {
    // TODO
    it('has a streamSections property', () => {
      const table = new Tabula('foo')
      expect('streamSections' in table).toBe(true);
    })
  });

  describe('getData()', () => {
    // TODO
    it('has a getData property', () => {
      const table = new Tabula('foo')
      expect('getData' in table).toBe(true);
    })
  });
});
