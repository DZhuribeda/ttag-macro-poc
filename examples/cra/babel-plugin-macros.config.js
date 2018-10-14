const babelConfig = process.env.NODE_ENV === 'production'
  ? {
    ttag: {
      resolve: {
        translations: 'src/translations.po',
      },
    },
  }
  : {};

module.exports = babelConfig;
