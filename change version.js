const R = require('ramda');
const os = require('os');
const fs = require('fs-extra');

const pathOld = `${os.homedir()}/.ln23_old`;
const pathNew = `${os.homedir()}/.ln23`;

fs.copySync(pathNew, pathOld);

console.log(`copy  ${pathNew} in ${pathOld}`);

const writeJson = R.curry((path, data) => fs.writeJsonSync(path, data));

const changeData = R.curry((path, filename) =>
  R.pipe(
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
  fs.readdirSync,
  R.forEach(changeData(pathNew))
)(pathNew);

console.log('Upgrade finished');
