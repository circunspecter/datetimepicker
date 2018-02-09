---
layout: default
title: Reference
meta_description: "DateTime picker: reference."
prev_page_title: Init
prev_page_path:
next_page_title: Examples
next_page_path: examples/
---

#### constructor <code>Object: config, Boolean: initialize</code>

{: .list .indent}
- <code>config</code>: optional. Configuration.
- <code>initialize</code>: optional. Sets whether the picker has to be initialized. Default: true.

Datetimepicker uses [Modi](https://github.com/circunspecter/modi "Modi") and [Calendar](https://github.com/circunspecter/calendar "Calendar") packages, so the config object merges the configuration of both.

Config structure:

```js
config = {
  {Modi config},
  calendar: {Calendar config},
  minDate: {String|Number|Date},
  maxDate: {String|Number|Date},
  selectedDate: {String|Number|Date}
}
```

{: .list .indent}
- [Modi config](https://circunspecter.github.io/modi/configuration/ "Modi config").
- [Calendar config](https://circunspecter.github.io/calendar/calendar/ "Calendar config").

Default config:

```js
config = {
  eventsNamespace: 'dtp',
  template: <defaultTemplate>,
  minDate: null,
  maxDate: null,
  selectedDate: new Date(),
  calendar: {
    week: {
      namesType: 'mini'
    }
  }
}
```

{: .note}
Datetimepicker extends Modi, so, in addition to the following properties, methods and events, those offered by the base class are also available.

### Properties

#### calendar <span>Calendar</span>

[Calendar instance](https://circunspecter.github.io/calendar/calendar/ "Calendar config").

#### selectedDate <span>Date</span>

Default selected date.

#### hoursRange <span>Array</span>

Hours range.

#### minutesRange <span>Array</span>

Minutes range.

### Methods

#### changeMonth <code>Date: date</code>

Change selected month.

{: .list .indent}
- <code>date</code>: new calendar date.

#### refreshCalendar

Redraw calendar.

#### setSelectedDay <code>String|Number|Date: day, Boolean: changeMonth</code>

Set selected day.

{: .list .indent}
- <code>day</code>: new selected day.
- <code>changeMonth</code>: change month when needed.

#### setLimitDate <code>String: type, String|Number|Date: date, Boolean: refresh</code>

Set calendar limits.

{: .list .indent}
- <code>type</code>: limit type (min or max).
- <code>date</code>: limit date.
- <code>refresh</code>: refresh calendar. Default: <code>true</code>.

#### getDayElementByDate <code>String|Number|Date: date</code> <span>Element|undefined</span>

Get day element by date.

{: .list .indent}
- <code>date</code>: day date.

#### getSelectedDayDate <code>mixed: def</code> <span>Date|mixed</span>

Get selected day.

{: .list .indent}
- <code>def</code>: value to return when it fails.

#### getHours <span>Number</span>

Get selected hour.

#### getMinutes <span>Number</span>

Get selected minutes.

#### parseDate <code>String|Number|Date: date, mixed: def</code> <span>Date|mixed</span>

Parse date.

{: .list .indent}
- <code>date</code>: proposed date.
- <code>def</code>: value to return when it fails.

#### isValidDate <code>mixed: operand</code> <span>Boolean</span>

Check for a valid date object.

{: .list .indent}
- <code>operand</code>: operand.

### Events

[Dispatched events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent "MDN CustomEvent") have the <code>detail</code> property, which contains:

{: .list .indent}
- <code>instance</code>: datetimepicker instance.
- <code>overlay</code>: overlay element.
- <code>modal</code>: modal element.

```js
datetimepicker.addListener('dtp:day:click', (e) => {
  console.log(e.detail.instance);
});
```

#### day:click

Dispatched when a day element is clicked.

<code>detail +=</code>

{: .list .indent}
- <code>element</code>: day element.
- <code>dateTime</code>: date representing de selected date and time.

#### month:change

Dispatched when the current month changes.

<code>detail +=</code>

{: .list .indent}
- <code>date</code>: date representing de first day of the new selected month.

#### action:click

Dispatched when an action button is clicked.

<code>detail +=</code>

{: .list .indent}
- <code>element</code>: action element.
- <code>action</code>: <code>data-action</code> content.
- <code>dateTime</code>: date representing de selected date and time.
