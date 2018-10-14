import cosmiconfigMock from 'cosmiconfig';
import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';

jest.mock('cosmiconfig', () => jest.fn(require.requireActual('cosmiconfig')));

const exampleCode = `
import { t, jt, gettext, ngettext, msgid } from './macro';

const a = 'text';
const b = ['text 1', 'text 2'];

function pluralText(n) {
  return ngettext(
    msgid\`plural form with \${ n } plural\`,
    \`plural form with \${ n } plurals\`,
    n
  );
}

console.log(t\`simple string literal\`);
console.log(jt\`\${ a } simple string \${ b } literal with formatting\`);
console.log(t\`no translator notes\`);
console.log(pluralText(1));
console.log(pluralText(2));
console.log(t\`
  first line
  second line
  third line
\`);
console.log(gettext\`\${ a } spaces test\`);
console.log(t\`{name} fuzzy name\`);
`;

const errorExampleCode = `
import { t } from './macro';

const mississipi = 'test';

console.log(t\`Typo test \${ mississipi }\`);
`;

pluginTester({
  title: 'macro',
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: {
    'should replace translations': {
      code: exampleCode,
      setup: () => {
        cosmiconfigMock.mockImplementationOnce(() => ({
          searchSync: () => ({
            config: {
              ttag: {
                resolve: { translations: 'translations.po' },
              },
            },
          }),
        }));
      },
    },
    'should throw error if missing placeholder': {
      code: errorExampleCode,
      error: /Expression 'mississipi' is not found in the localized string 'Typo test \${ missingpi }'./,
      snapshot: false,
      setup: () => {
        cosmiconfigMock.mockImplementationOnce(() => ({
          searchSync: () => ({
            config: {
              ttag: {
                resolve: { translations: 'translations.po' },
              },
            },
          }),
        }));
      },
    },
  },
});
