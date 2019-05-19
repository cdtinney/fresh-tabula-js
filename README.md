# fresh-tabula-js
> Convert tables inside PDFs to CSV. Node wrapper for [`tabular-java`](https://github.com/tabulapdf/tabula-java).

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This is a maintained fork of the [`tabula-js`](https://github.com/ezodude/tabula-js) package.

## Contents

- [Contents](#contents)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installing](#installing)
  - [Usage](#usage)
  - [Options](#options)
  - [API](#api)
    - [`extractCsv`](#extractcsv)
    - [`streamCsv`](#streamcsv)
- [Acknowledgements](#acknowledgements)

## Getting Started

### Requirements

- Java Development Kit (JDK) with `java` available on command-line
- Node.js/npm

### Installing

To install as a dependency via `npm`:

```
$ npm install --save fresh-tabula-js
```

### Usage

Simply import the module:

```javascript
const tabula = require('fresh-tabula-js');
const table = tabula('data/foobar.pdf');
table.extractCsv((err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
```

### Options

Options mimic [`tabula-java`](https://github.com/tabulapdf/tabula-java#usage-examples) with some exceptions, such as the inability to write the output to file. Extracted data is available through callbacks, streams, and return values.

Options are passed to APIs via plain objects.

| Key | Type | Default | Description |
| - | - | - | - |
| Area | String or Array | Entire page | Co-ordinates of the portion(s) of the page to analyze, formatted in strings in the following format `top,left,bottom,right`. For example, `269.875,12.75,790.5,561` or `["269.875,12.75,790.5,561", "132.45,23.2,256.3,534"]`.
| columns | String | none | X coordinates of column boundaries. Example `"10.1,20.2,30.3"` |
| debug | Boolean | `false` | Print detected table areas instead of processing them. |
| guess | Boolean | `true` | Guess the portion(s) of the page to analyze and process. |
| silent | Boolean | `false` | Suppress all `stderr` output. |
| noSpreadsheet | Boolean | `false` | Force PDF not to be extracted using spreadsheet-style  extraction (if there are ruling lines separating each cell, as in a PDF of an Excel spreadsheet). |
| pages | String | `1` | Comma separated list of ranges, or `all`. E.g. `1-3,5-7`, `3`, `all`.
| spreadsheet | Boolean | `false` | Force PDF to be extracted using spreadsheet-style extraction (if there are ruling lines separating each cell, as in a PDF of an Excel spreadsheet). |
| password | String | empty | Password used to decrypt/access the document. |
| useLineReturns | Boolean | `false` | Use embedded line returns in cells (only in spreadsheet mode). |

### API

#### `extractCsv`

This is the simplest API. It's uses a classic Node style callback ```(err, data)```. The extracted CSV string is an array of all rows found in the data table, including any headers.

``` js
const tabula = require('tabula-js');
const table = tabula(source.pdf);
table.extractCsv((err, data) => console.log(data));
```

We can use the `area` option to analyze specific portions of the document.

``` js
const tabula = require('tabula-js');
const table = tabula(source.pdf, {
  area: "269.875,150,690,545",
});
table.extractCsv((err, data) => console.log(data));
```

#### `streamCsv`

This API allows extracted data to be processed as a stream.

Example:

``` js
const tabula = require('tabula-js');
const stream = tabula(source.pdf).streamCsv();
stream.pipe(process.stdout);
```

The underlying library is built on streams using [Highland.js](http://highlandjs.org/).

This means the returned stream can perform `highland-js`-style transformations and operations.

Example: 

``` js
const tabula = require('tabula-js');
const stream = tabula(source.pdf).streamCsv();
stream
  .split()
  .doto(console.log)
  .done(() => console.log('All done!'));
```

## Acknowledgements

* [Ezo Saleh](https://github.com/ezodude), [original author](https://github.com/ezodude/tabula-js)
* [tabula-java](https://github.com/tabulapdf/tabula-java) team
