/* eslint-disable prettier/prettier */
const CracoAlias = require('craco-alias');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === 'production';
// console.log('process.env.NODE_ENV : ', process.env.NODE_ENV );

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  babel: {
    presets: [
      [
        '@babel/preset-react',
        { runtime: 'automatic', importSource: '@emotion/react' },
      ],
    ],
    plugins: ['@emotion/babel-plugin'],
  },
  eslint: {
    enable: true,
    mode: 'extends',
    configure: {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'react-app',
        'react-app/jest',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['react', '@typescript-eslint'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': 'error',
      },
    },
  },
  webpack: {
    plugins: isProduction ? [] : [new BundleAnalyzerPlugin()],
  },
};
