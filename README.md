[![Build Status](https://travis-ci.org/circunspecter/datetimepicker.svg?branch=master)](https://travis-ci.org/circunspecter/datetimepicker)
[![Coverage Status](https://coveralls.io/repos/github/circunspecter/datetimepicker/badge.svg?branch=master)](https://coveralls.io/github/circunspecter/datetimepicker?branch=master)

# Datetimepicker
DateTime picker.

[Documentation and examples](https://circunspecter.github.io/datetimepicker/ "Documentation and examples")

### Installation

#### Browser

```html
<script src="/path/to/datetimepicker.min.js"></script>
```

[unpkg CDN](https://unpkg.com "unpkg"):

```html
//unpkg.com/@circunspecter/datetimepicker@latest/dist/datetimepicker.min.js
```

#### npm

```shell
npm install @circunspecter/datetimepicker
```

### Basic usage

```js
let datetimepicker = new Datetimepicker();

datetimepicker.addListener('dtp:day:click', (e) => {
  let dateTime = e.detail.dateTime.toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
    hour12: true
  });
  // dateTime: August 13, 2030, 12:00 AM
});
```
