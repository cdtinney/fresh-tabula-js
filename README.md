# fresh-tabula-js
> Convert tables inside PDFs to CSV via [`tabula-java`](https://github.com/tabulapdf/tabula-java) using JavaScript.

[![Build Status](https://travis-ci.org/cdtinney/fresh-tabula-js.svg?branch=master)](https://travis-ci.org/cdtinney/fresh-tabula-js) [![Coverage Status](https://coveralls.io/repos/github/cdtinney/fresh-tabula-js/badge.svg?branch=master)](https://coveralls.io/github/cdtinney/fresh-tabula-js?branch=master) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This is a maintained fork of the [`tabula-js`](https://github.com/ezodude/tabula-js) package,
with changes such as:

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
    - [`Tabula.extractCsv`](#tabulaextractcsv)
    - [`Tabula.extractStreamCsv`](#tabulaextractstreamcsv)
    - [`Tabula.streamCsv`](#tabulastreamcsv)
- [Developing](#developing)
  - [Introduction](#introduction)
    - [Branch Usage](#branch-usage)
    - [Commit Message Convention](#commit-message-convention)
  - [Installing](#installing-1)
  - [Testing](#testing)
  - [Building](#building)
  - [Deploying](#deploying)
- [Acknowledgements](#acknowledgements)

## Getting Started

**Only Node.js environments are supported due to file-system usage requirements.
The package is exported as a CommonJS module.**

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
const Tabula = require('fresh-tabula-js');
const extractData = async () => {
  // 2. Instantiate a table via passing a path to a PDF (this can be relative or absolute)
  const table = new Tabula('data/foobar.pdf');
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
const Tabula = require('fresh-tabula-js');
const table = new Tabula('path/to/pdf/foobar.pdf');
// Do stuff
```

### Options

All extraction methods support the same set of options.

Options are passed through to [`tabula-java`](https://github.com/tabulapdf/tabula-java#usage-examples) with some exceptions, such as the inability to write the output to file (`-o`). Extracted data is available through callbacks, streams, and return values.

Options are structured as a plain object.

| Key | Type | Default | Description |
| - | - | - | - |
| `area` | String or Array | Entire page | Co-ordinates of the portion(s) of the page to analyze, formatted in strings in the following format `top,left,bottom,right`. For example, `269.875,12.75,790.5,561` or `["269.875,12.75,790.5,561", "132.45,23.2,256.3,534"]`.
| `columns` | String | none | X coordinates of column boundaries. Example `"10.1,20.2,30.3"` |
| `debug` | Boolean | `false` | Print detected table areas instead of processing them. |
| `guess` | Boolean | `true` | Guess the portion(s) of the page to analyze and process. |
| `silent` | Boolean | `false` | Suppresses all `stderr` output from the `tabula-java` JAR **only**. JavaScript errors will still be logged. |
| `noSpreadsheet` | Boolean | `false` | Force PDF not to be extracted using spreadsheet-style  extraction (if there are ruling lines separating each cell, as in a PDF of an Excel spreadsheet). |
| `pages` | String | `1` | Comma separated list of ranges, or `all`. E.g. `1-3,5-7`, `3`, `all`.
| `spreadsheet` | Boolean | `false` | Force PDF to be extracted using spreadsheet-style extraction (if there are ruling lines separating each cell, as in a PDF of an Excel spreadsheet). |
| `password` | String | empty | Password used to decrypt/access the document. |
| `useLineReturns` | Boolean | `false` | Use embedded line returns in cells (only in spreadsheet mode). |

### Methods

#### `Tabula.extractCsv`

Use this method to process extracted data from PDF asynchronously using `async`/`await`.

It returns an object in the following format:

```
{
  output: <String>,
  error: <String>,
}
```

Example:

```js
const Tabula = require('fresh-tabula-js');
const extractData = async () => {
  const table = new Tabula('dir/foobar.pdf');
  return await table.extractCsv();
};
```

#### `Tabula.extractStreamCsv`

Use this method to process extracted data from PDFs using callbacks, via streams.

Callbacks will be executed for each parsed section of the PDF.

Extracted data is a string representing an array of all rows (in CSV format) found,
including headers.

``` js
const Tabula = require('fresh-tabula-js');
const table = new Tabula('dir/foobar.pdf');
table.extractStreamCsv((err, data) => console.log(data));
```

We can use the `area` option to analyze specific portions of the document.

``` js
const Tabula = require('fresh-tabula-js');
const table = new Tabula('dir/foobar.pdf', {
  area: "269.875,150,690,545",
});
table.extractStreamCsv((err, data) => console.log(data));
```

#### `Tabula.streamCsv`

This is used to process data from PDFs via streams.

Example:

``` js
const Tabula = require('fresh-tabula-js');
const stream = new Tabula('dir/foobar.pdf').streamCsv();
stream.pipe(process.stdout);
```

The underlying library is built on streams using [Highland.js](http://highlandjs.org/).

This means the returned stream can perform `highland-js`-style transformations and operations.

Example: 

``` js
const Tabula = require('fresh-tabula-js');
const stream = new Tabula('dir/foobar.pdf').streamCsv();
stream.split()
  .doto(console.log)
  .done(() => console.log('All done!'));
```

## Developing

### Introduction 

#### Branch Usage

Development is done in the `develop` branch.

When `master` changes (e.g. via pull request), [Travis CI](https://travis-ci.org/cdtinney/fresh-tabula-js)
will build and deploy a new version of the package using semantic versioning based on commit messages
to determine the version type.

#### Commit Message Convention

**Commit messages must be formatted according to the [conventional commits Angular spec](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary):**

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

The following types are supported:
  * **build**: Changes that affect the build system or npm dependencies
  * **ci**: Changes to CI config (e.g. Travis CI config changes)
  * **docs**: Documentation-only changes
  * **feat**: New features
  * **fix**: Bug fix
  * **perf**: Code change related to performance
  * **refactor**: A code change that neither fixes a bug nor adds a feature
  * **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
  * **test**: Adding missing tests or correcting existing tests

Rules configuration is found in in `release.config.js`.

### Installing

1. Clone the repository.
2. Switch to the `develop` branch:

    ```
    git checkout develop
    ```

3. Install dependencies:

    ```
    $ npm install
    ```

### Testing

To run tests:

```
$ npm run test
```

To run tests in watch mode:

```
$ npm run test:watch
```

To run test coverage:

```
$ npm run test:cov
```

### Building

To run deployment builds:

```
$ npm run build
```

### Deploying

1. Push the changes to `develop`.
2. Merge to `master` via pull request.

[Travis CI](https://travis-ci.org/cdtinney/fresh-tabula-js) will build and deploy the new version of the package (based on semantic commits) to [NPM](https://npmjs.com/package/fresh-tabula-js).

## Acknowledgements

* [Ezo Saleh](https://github.com/ezodude), [original author](https://github.com/ezodude/tabula-js) of this package
* The [tabula-java](https://github.com/tabulapdf/tabula-java) team
* [tabula](https://tabula.technology/)
