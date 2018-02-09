---
layout: default
title: Init
meta_description: "DateTime picker."
next_page_title: Reference
next_page_path: reference/
---

<script src="{{ site.baseurl }}/assets/js/datetimepicker.min.js"></script>
<link href="{{ site.baseurl }}/assets/css/templates/default/styles.min.css" rel="stylesheet">

DateTime picker.

### Installation

#### Browser

```html
<script src="/path/to/datetimepicker.min.js"></script>
```

<div markdown="1" class="note">
[unpkg CDN](https://unpkg.com "unpkg"):

```html
//unpkg.com/@circunspecter/datetimepicker@latest/dist/datetimepicker.min.js
```
</div>

#### npm

```shell
npm install @circunspecter/datetimepicker
```

### Basic usage

```js
let datetimepicker = new Datetimepicker();

datetimepicker.addListener('dtp:action:click', (e) => {
  if (e.detail.action == 'accept') {
    let dateTime = e.detail.dateTime.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
      hour12: true
    });
    document.getElementById('selected-datetime').textContent = dateTime;
  }
});
```

<button class="button" onclick="datetimepicker.show()">datetimepicker.show();</button>

{: #selected-datetime .note}
<i>nothing selected</i>

<script style="text/javascript">
let datetimepicker = new Datetimepicker();

datetimepicker.addListener('dtp:action:click', (e) => {
  if (e.detail.action == 'accept') {
    let dateTime = e.detail.dateTime.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
      hour12: true
    });
    document.getElementById('selected-datetime').textContent = dateTime;
  }
});
</script>
