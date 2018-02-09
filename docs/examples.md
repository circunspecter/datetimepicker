---
layout: default
title: Examples
meta_description: "DateTime picker: examples."
prev_page_title: Reference
prev_page_path: reference/
next_page_title:
next_page_path:
---

<script src="{{ site.baseurl }}/assets/js/datetimepicker.min.js"></script>
<link href="{{ site.baseurl }}/assets/css/templates/default/styles.min.css" rel="stylesheet">

<script src="{{ site.baseurl }}/assets/js/templates/calendar/config.js"></script>
<link href="{{ site.baseurl }}/assets/css/templates/calendar/styles.min.css" rel="stylesheet">

### Capture selected date

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

<button class="button" onclick="dtpCaptureSelectedDate.show()">datetimepicker.show();</button>

{: #selected-datetime .note}
<i>nothing selected</i>

<script style="text/javascript">
let dtpCaptureSelectedDate = new Datetimepicker();

dtpCaptureSelectedDate.addListener('dtp:action:click', (e) => {
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

### Limit selectable dates

```js
let today = new Date();
let datetimepicker = new Datetimepicker({
  selectedDate: today,
  minDate: (new Date()).setDate(today.getDate() - 15),
  maxDate: (new Date()).setDate(today.getDate() + 15)
});
```

<button class="button" onclick="dtpDateRange.show()">datetimepicker.show();</button>

<script style="text/javascript">
let today = new Date();
let dtpDateRange = new Datetimepicker({
  selectedDate: today,
  minDate: (new Date()).setDate(today.getDate() - 15),
  maxDate: (new Date()).setDate(today.getDate() + 15)
});
</script>

### Date range

```js
let dtpFrom = new Datetimepicker();
let dtpTo = new Datetimepicker();

dtpFrom.addListener('dtp:action:click', (e) => {
  if (e.detail.action == 'accept') {
    dtpTo.setLimitDate('min', e.detail.dateTime);
  }
});

dtpTo.addListener('dtp:action:click', (e) => {
  if (e.detail.action == 'accept') {
    dtpFrom.setLimitDate('max', e.detail.dateTime);
  }
});
```

<button class="button" onclick="dtpFrom.show()">dtpFrom.show();</button>
<button class="button" onclick="dtpTo.show()">dtpTo.show();</button>

<script style="text/javascript">
let dtpFrom = new Datetimepicker();
let dtpTo = new Datetimepicker();

dtpFrom.addListener('dtp:action:click', (e) => {
  if (e.detail.action == 'accept') {
    dtpTo.setLimitDate('min', e.detail.dateTime);
  }
});

dtpTo.addListener('dtp:action:click', (e) => {
  if (e.detail.action == 'accept') {
    dtpFrom.setLimitDate('max', e.detail.dateTime);
  }
});
</script>

### Calendar only

```js
let datetimepicker = new Datetimepicker({
  template: calendarTplConfig
});

datetimepicker.addListener('dtp:day:click', (e) => {
  let dateTime = e.detail.dateTime.toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
    hour12: true
  });
  document.getElementById('selected-datetime').textContent = dateTime;
});
```

<button class="button" onclick="dtpOnlyCalendar.show()">datetimepicker.show();</button>

{: #selected-datetime-2 .note}
<i>nothing selected</i>

<script style="text/javascript">
let dtpOnlyCalendar = new Datetimepicker({
  template: calendarTplConfig
});

dtpOnlyCalendar.addListener('dtp:day:click', (e) => {
  let dateTime = e.detail.dateTime.toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
    hour12: true
  });
  document.getElementById('selected-datetime-2').textContent = dateTime;
});
</script>

<div markdown="1" class="note">
<code>calendarTplConfig</code> is a custom template that removes the hour selector, the action buttons and hides the picker when a day is clicked.

You can take a look to the different configs and styles under ["templates" folder](https://github.com/circunspecter/datetimepicker/tree/master/dist/templates "Templates folder").
</div>
