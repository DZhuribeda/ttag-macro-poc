import React from 'react';
import PropTypes from 'prop-types';
import { t, jt, gettext, ngettext, msgid } from 'ttag.macro';

const a = 'text';
const b = <span key="b">span text</span>;

const PluralText = ({ n }) => (
  ngettext(msgid`plural form with ${ n } plural`, `plural form with ${ n } plurals`, n)
);

class Translations extends React.Component {
  static propTypes = {
    test: PropTypes.any,
  };

  render() {
    return (
      <>
        {t`simple string literal`}
        <br />
        {jt`${ a } simple string ${ b } literal with formatting`}
        <br />
        {t`no translator notes`}
        <br />
        <PluralText n={1} />
        <br />
        <PluralText n={2} />
        <br />
        {t`
          first line
          second line
          third line
        `}
        <br />
        {gettext`${ a } spaces test`}
        <br />
        {t`{name} fuzzy name`}
      </>
    );
  }
};

export default Translations;
