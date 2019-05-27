const Command = require('../Command');

describe('Command', () => {
  it('creates a new instance when using new()', () => {
    const command = new Command('foo', {});
    expect(command instanceof Command).toBeTruthy();
  });
});
