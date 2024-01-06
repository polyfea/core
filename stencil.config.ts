import { Config } from '@stencil/core';

const esModules = [
  // dependencies of esm packages
  "@polyfea/browser-api",
].join('|');

export const config: Config = {
  namespace: 'core',
  preamble: 'Part of Polyfea microfrontends suite - https://github.com/polyfea',
  // validatePrimaryPackageOutputTarget: true,
  outputTargets: [
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle',
      // isPrimaryPackageOutputTarget: true,
    },
    {
      type: 'docs-readme',
    }
  ],
  
  testing: {
    testPathIgnorePatterns : ["/core/tests/"],
    browserHeadless: "new",
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    transform: {
      '^.+\\.(ts|tsx|js|jsx|css)$': "@stencil/core/testing/jest-preprocessor"
    },
  }
};
