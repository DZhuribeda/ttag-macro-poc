# CRA example with ttag

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Translations usage

```jsx
import { t } from 'ttag.macro';

export default () => (
  <>
    {t`abc`}
  </>
);
```

Then setup translations location in macro configuration, create or edit `babel-plugin-macros.config.js`:
```js
module.exports = process.env.NODE_ENV === 'production'
  ? {
    ttag: {
      resolve: {
        translations: '<PO file>',
      },
    },
  }
  : {};
```
