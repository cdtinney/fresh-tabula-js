# fresh-tabula-js
> Convert tables inside PDFs to CSV via [`tabula-java`](https://github.com/tabulapdf/tabula-java) using JavaScript.

[![Build Status](https://travis-ci.org/cdtinney/fresh-tabula-js.svg?branch=master)](https://travis-ci.org/cdtinney/fresh-tabula-js) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This is a maintained fork of the [`tabula-js`](https://github.com/ezodude/tabula-js) package, with changes such as:

* Non-stream asynchronous extraction (use `async`/`await`)

**Please submit any issues (or e-mail me).**

## Contents

- [Contents](#contents)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installing](#installing)
  - [Usage](#usage)
- [API](#api)
  - [Options](#options)
  - [Methods](#methods)
    - [`extractCsv`](#extractcsv)
    - [`extractStreamCsv`](#extractstreamcsv)
    - [`streamCsv`](#streamcsv)
- [Developing](#developing)
  - [Branches](#branches)
  - [Commit Messages](#commit-messages)
  - [Getting Started](#getting-started-1)
- [Acknowledgements](#acknowledgements)

## Getting Started

### Requirements

- Java Development Kit (JDK) with `java` available via command-line
- Node.js/npm

### Installing

To install as a dependency via `npm`:

```
$ npm install --save fresh-tabula-js
```

### Usage

Import the module:

```javascript
// 1. Import the module
const tabula = require('fresh-tabula-js');
const extractData = async () => {
  // 2. Instantiate a table via passing a path to a PDF (this can be relative or absolute)
  const table = tabula('data/foobar.pdf');
  // 3. Call an extraction method
  const data = await table.extractCsv();
  console.log(data);
  return data;
};
// 4. Call the method!
extractData();
```

## API

First, an instance of Tabula must be instantiated via calling `tabula`
with a path (relative or absolute) to a valid PDF.

Example:

```javascript
const tabula = require('fresh-tabula-js');
const table = tabula('path/to/pdf/foobar.pdf');
// Do stuff
```

### Options

All extraction methods support the same set of options.

Options are passed through to [`tabula-java`](https://github.com/tabulapdf/tabula-java#usage-examples) with some exceptions, such as the inability to write the output to file (`-o`). Extracted data is available through callbacks, streams, and return values.

Options are structured as a plain object.

| Key | Type | Default | Description |
| - | - | - | - |
| Area | String or Array | Entire page | Co-ordinates of the portion(s) of the page to analyze, formatted in strings in the following format `top,left,bottom,right`. For example, `269.875,12.75,790.5,561` or `["269.875,12.75,790.5,561", "132.45,23.2,256.3,534"]`.
| columns | String | none | X coordinates of column boundaries. Example `"10.1,20.2,30.3"` |
| debug | Boolean | `false` | Print detected table areas instead of processing them. |
| guess | Boolean | `true` | Guess the portion(s) of the page to analyze and process. |
| silent | Boolean | `false` | Suppresses all `stderr` output from the `tabula-java` JAR **only**. JavaScript errors will still be logged. |
| noSpreadsheet | Boolean | `false` | Force PDF not to be extracted using spreadsheet-style  extraction (if there are ruling lines separating each cell, as in a PDF of an Excel spreadsheet). |
| pages | String | `1` | Comma separated list of ranges, or `all`. E.g. `1-3,5-7`, `3`, `all`.
| spreadsheet | Boolean | `false` | Force PDF to be extracted using spreadsheet-style extraction (if there are ruling lines separating each cell, as in a PDF of an Excel spreadsheet). |
| password | String | empty | Password used to decrypt/access the document. |
| useLineReturns | Boolean | `false` | Use embedded line returns in cells (only in spreadsheet mode). |

### Methods

#### `extractCsv`

Use this method to process extracted data from the CSV using `async`/`await`.

It returns an object in the following format:

```
{
  output: <String>,
  error: <String>,
}
```

Example:

```js
const tabula = require('tabula-js');
const extractData = async () => {
  const table = tabula('dir/foobar.pdf');
  return await table.extractCsv();
};
```

#### `extractStreamCsv`

Use this method to process extracted data from the CSV using callbacks, via streams.

Callbacks will be executed for each parsed section of the PDF.

Extracted data is a string representing an array of all rows (in CSV format) found, including headers.

``` js
const tabula = require('tabula-js');
const table = tabula('dir/foobar.pdf');
table.extractStreamCsv((err, data) => console.log(data));
```

We can use the `area` option to analyze specific portions of the document.

``` js
const tabula = require('tabula-js');
const table = tabula('dir/foobar.pdf', {
  area: "269.875,150,690,545",
});
table.extractStreamCsv((err, data) => console.log(data));
```

#### `streamCsv`

This is used to directly process data from the CSV via stream.

Example:

``` js
const tabula = require('tabula-js');
const stream = tabula('dir/foobar.pdf').streamCsv();
stream.pipe(process.stdout);
```

The underlying library is built on streams using [Highland.js](http://highlandjs.org/).

This means the returned stream can perform `highland-js`-style transformations and operations.

Example: 

``` js
const tabula = require('tabula-js');
const stream = tabula('dir/foobar.pdf').streamCsv();
stream
  .split()
  .doto(console.log)
  .done(() => console.log('All done!'));
```

## Developing

### Branches

Development is done in the `develop` branch.

When `master` changes (e.g. via pull request), [Travis CI](https://travis-ci.org/cdtinney/fresh-tabula-js) will build and deploy a new version of
the package using semantic versioning based on commit messages to determine the version type.

### Commit Messages

**Commit messages must be formatted according to the [conventional commits Angular spec](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary).**

Additionally, the following custom commit message types will result in a patch release:

* `docs`
* `ci`
* `refactor`

These rules can be viewed in `release.config.js`.

### Getting Started

1. Clone the repository.
2. Switch to `develop`.
3. Install dependencies:

    ```
    $ npm install
    ```

4. Write code!
5. Run tests:

    ```
    $ npm run test
    ```

6. Test deployment builds:

    ```
    $ npm run build
    ```

7. Push the changes to `develop`.
8. Merge to `master` via pull request. [Travis CI](https://travis-ci.org/cdtinney/fresh-tabula-js) will build and deploy to [NPM](https://npmjs.com/package/fresh-tabula-js).

## Acknowledgements

* [Ezo Saleh](https://github.com/ezodude), [original author](https://github.com/ezodude/tabula-js) of this package
* The [tabula-java](https://github.com/tabulapdf/tabula-java) team
* [tabula](https://tabula.technology/)
