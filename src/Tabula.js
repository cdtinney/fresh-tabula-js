const highlandProc = require('highland-process');
const Command = require('./Command');

class Tabula {
  constructor(pdfPath, options) {
    this._pdfPath = pdfPath;
    this._options = options;
  }

  static fromPath(pdfPath, options) {
    return new Tabula(pdfPath, options);
  }

  streamCsv() {
    return highlandProc
      .from(new Command(this._pdfPath, this._options))
      .run();
  }

  extractStreamCsv(callback) {
    this.streamCsv()
        .map(data => data.toString())
        .split()
        .collect()
        .stopOnError(err => callback(err, null))
        .each(data => callback(null, data));
  }

  extractCsv() {
    const cmd = new Command(this._pdfPath, this._options);
    const result = cmd.runSync();
    const {
      stdout,
      stderr,
    } = result;

    // TODO Check status/signal/error
    return {
      output: stdout.toString(),
      error: stderr.toString(),
    };
  }
}

module.exports = Tabula;
