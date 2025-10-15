/* eslint-env jest */

const transform = require('../index');

describe('scriptsTransform', () => {
  it('renders a table with default options (object)', () => {
    const opts = { format: 'table', sort: true };
    const result = transform('', opts);
    expect(result).toContain('| Script | Command'); // table header
    expect(result).toContain('`docs`');
    expect(result).toContain('`test`');
  });

  it('accepts options as a JSON string', () => {
    const opts = '{"format":"list","compact":true}';
    const result = transform('', opts);
    expect(result).toContain('- `docs`');
    expect(result).toContain('- `test`');
  });

  it('accepts options as a querystring-style string', () => {
    const opts = 'format=list&showCommands=false';
    const result = transform('', opts);
    expect(result).toContain('- `docs`');
    expect(result).toContain('- `test`');
  });

  it('groups scripts by category when groupBy is set', () => {
    const opts = { format: 'list', groupBy: 'category' };
    const result = transform('', opts);
    expect(result).toContain('### dev');
    expect(result).toContain('`test`');
  });
});
