// import fs from 'fs';
// import packageList from './config';
// import shell from 'shelljs';
// import { config } from '@swc/core/spack';

// const folder = process.cwd() + '/packages';
// const artifactsFolder = process.cwd() + '/artifacts';

// function generateConfigs() {
//   return packageList.map(p => {
//     const entry = {};
//     entry[p] = `src/index.ts`;
//     const item = config({
//       output: {
//         path: `${artifactsFolder}/${p}`,
//         // Name is optional.
//         name: 'index.js',
//       },
//       entry: { ...entry },
//       module: {},
//     });

//     const itemString = `
//     module.exports = ${JSON.stringify(item)}
//     `;

//     const swcrcConfig = `
//     {
//       "jsc": {
//         "parser": {
//           "syntax": "typescript"
//         },
//         "target": "es2020",
//         "externalHelpers": true,
//         "keepClassNames": true,
//         "loose": true,
//         "minify": {
//           "compress": true,
//           "mangle": true
//         }
//       },
//       "env": {
//         "targets": {
//           "chrome": "79",
//           "android" : "65",
//           "ios": "11"
//         },
//         "mode": "entry",
//         "coreJs": "3.22"
//       },
//       "module": {
//         "type": "umd"
//       }
//     }
//     `;
//     fs.writeFileSync(`${folder}/${p}/spack.config.js`, itemString);
//     fs.writeFileSync(`${folder}/${p}/.swcrc`, swcrcConfig);
//   });
// }

// function runBundler() {
//   generateConfigs();
//   packageList.map(p => {
//     shell.exec(`cd ${folder}/${p} && spack`);
//     shell.exec(`cd ${folder}/${p}/build && browserify index.js -t swcify > ${artifactsFolder}/${p}/bundle.js`);
//   });
// }

// runBundler();

// tslint:disable-next-line: no-implicit-dependencies
import webpack from 'webpack';
// tslint:disable-next-line: no-implicit-dependencies

import batch from './webpack/wpConfig';

webpack(batch).run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
    stats?.toString({
      all: false,
      modules: false,
      errors: true,
      warnings: false,
      moduleTrace: true,
      errorDetails: true,
      chunks: true,
      colors: true,
    }),
  );
});
