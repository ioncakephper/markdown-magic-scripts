/* eslint-env jest */

const transform = require('../index');

describe('scriptsTransform', () => {
  it('renders a table with default options (object)', () => {
    const options = { format: 'table', sort: true };
    const result = transform({options});
    expect(result).toContain('| Script | Command'); // table header
    expect(result).toContain('`docs`');
    expect(result).toContain('`test`');
  });

  it('accepts options as a JSON string', () => {
    const options = '{"format":"list","compact":true}';
    const result = transform({ options });
    expect(result).toContain('- `docs`');
    expect(result).toContain('- `test`');
  });

  it('accepts options as a querystring-style string', () => {
    const options = 'format=list&showCommands=false';
   const result = transform({ options });
    expect(result).toContain('- `docs`');
    expect(result).toContain('- `test`');
  });

  it('groups scripts by category when groupBy is set', () => {
    const options = { format: 'list', groupBy: 'category' };
   const result = transform({ options });
    expect(result).toContain('### dev');
    expect(result).toContain('`test`');
  });
});
