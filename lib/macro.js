import { createMacro, MacroError } from 'babel-plugin-macros';
import babelPluginTtag from 'babel-plugin-ttag';
import * as ttag from 'ttag';

const allowedImports = Object.keys(ttag).filter(helper => helper !== '__esModule');

function ttagMacro({ references, state, babel: { types: t }, config = {} }) {
  const program = state.file.path;

  // replace `ttag.macro` by `ttag`
  // create a node for ttag's imports
  const imports = t.importDeclaration([], t.stringLiteral('ttag'));
  // and add it to top of the document
  program.node.body.unshift(imports);

  // references looks like this
  // { default: [path, path], css: [path], ... }
  Object.keys(references).forEach(refName => {
    if (!allowedImports.includes(refName)) {
      throw new MacroError(
        `Invalid import: ${refName}. You can only import ${allowedImports.join(
          ', '
        )} from 'ttag.macro'.`
      );
    }

    // generate new identifier and add to imports
    let id;
    if (refName === 'default') {
      id = program.scope.generateUidIdentifier('ttag');
      imports.specifiers.push(t.importDefaultSpecifier(id));
    } else {
      id = program.scope.generateUidIdentifier(refName);
      imports.specifiers.push(t.importSpecifier(id, t.identifier(refName)));
    }

    // update references with the new identifiers
    references[refName].forEach(referencePath => {
      // eslint-disable-next-line no-param-reassign
      referencePath.node.name = id.name;
    });
  });

  // apply babel-plugin-ttag to the file
  const stateWithOpts = { ...state, opts: config };
  program.traverse(babelPluginTtag().visitor, stateWithOpts);
}

export default createMacro(ttagMacro, { configName: 'ttag' });
