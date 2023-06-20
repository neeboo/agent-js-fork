import fs from 'fs';
import packageList from './config';
import shell from 'shelljs';

const folder = process.cwd() + '/packages';

function buildPackages() {
  for (let p = 0; p < packageList.length; p += 1) {
    shell.exec(
      `cd ${folder}/${packageList[p]}` +
        `&& rm -rf build` +
        `&& rm -rf tsconfig.tsbuildinfo` +
        `&& tsc --emitDeclarationOnly` +
        `&& swc src -d build --no-swcrc` +
        `&& tsc-alias`,
    );
  }
}

buildPackages();
