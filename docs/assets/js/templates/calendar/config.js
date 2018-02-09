let calendarTplConfig = {

  html: `
  <div class="{class}" data-element="overlay" data-visible="false" data-outside-close="{outsideClose}">
    <div data-element="modal" data-small-width="500">
      <div data-element="month-selector"></div>
      <div data-element="week-days"></div>
      <div data-element="month-days"></div>
    </div>
  </div>
  `,

  partials: {
    monthSelector: `
    <button type="button" title="{prevText}" data-time="{prevTime}" data-action="prev" data-disabled="{prevDisabled}">
      &lt;
    </button>
    <span>{currentMonthText}</span>
    <button type="button" title="{nextText}" data-time="{nextTime}" data-action="next" data-disabled="{nextDisabled}">
      &gt;
    </button>
    `,
    weekDay: '<div>{text}</div>',
    monthDay: '<div data-time="{time}" data-year="{year}" data-month="{month}" data-day="{day}" data-month-location="{monthLocation}" data-disabled="{disabled}">{text}</div>'
  },

  data: {
    class: 'datetimepicker-calendar',
    outsideClose: true
  },

  listeners: {
    'day:click': (detail) => {
      detail.instance.hide();
    }
  }
};
