const R = require('ramda');
const os = require('os');
const fs = require('fs-extra');

const pathOld = `${os.homedir()}/.ln23_old`;
const pathNew = `${os.homedir()}/.ln23`;

console.log(`pathOld: ${pathOld}`);
console.log(`pathNew: ${pathNew}`);

fs.copySync(pathOld, pathNew);
const writeJson = R.curry((path, data) => fs.writeJsonSync(path, data));

const changeData = R.curry((path, filename) =>
  R.pipe(
    R.tap(console.log),
    fs.readFileSync,
    R.toString,
    R.split('\n'),
    R.objOf('triggerList'),
    R.assoc('companyName', ''),
    R.assoc('botName', filename),
    writeJson(`${path}/${filename}`)
  )(`${path}/${filename}`)
);

R.pipe(
  R.tap(console.log),
  fs.readdirSync,
  R.forEach(changeData(pathNew))
)(pathNew);
