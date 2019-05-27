'use strict';

const path = require('path')
const {
  spawn,
  spawnSync,
} = require('child_process')
const _ = require('lodash');

const JAR_PATH = path.join(__dirname, '../bin/jar/tabula-java.jar');
const parseCommandArgs = (args = {}) => {
  return Object.entries(args).reduce((acc, curr) => {
    const [ key, value ] = curr;
    const modifiedKey = `--${_.kebabCase(key)}`;

    if (Array.isArray(value)) {
      return acc.concat(
        value.reduce((acc, curr) => {
          return acc.concat(modifiedKey, curr);
        }, []),
      );
    } else if (typeof value === 'boolean' && value) {
      return acc.concat(modifiedKey);
    }

    return acc.concat(modifiedKey, value);
  }, []);
};

class TabulaCommand {
  constructor(pdfPath, commandArgs) {
    this._build(pdfPath, commandArgs);
  }

  _build(pdfPath, commandArgs) {
    const silentArgs = commandArgs && commandArgs.silent
      ? [
        '-Dorg.slf4j.simpleLogger.defaultLogLevel=off',
        '-Dorg.apache.commons.logging.Log=org.apache.commons.logging.impl.NoOpLog',
        '-Dfile.encoding=utf-8',
      ]
      : [];
    this._args = [
      ...silentArgs,
      ...['-jar', JAR_PATH],
      ...parseCommandArgs(commandArgs),
      pdfPath,
    ];
  }

  run() {
    return spawn('java', this._args);
  }

  runSync() {
    return spawnSync('java', this._args, {
      stdio: 'pipe',
    });
  }
}

module.exports = TabulaCommand;
