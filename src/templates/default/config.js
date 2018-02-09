export default {

  html: `
  <div class="{class}" data-element="overlay" data-visible="false" data-outside-close="{outsideClose}">
    <div data-element="modal" data-small-width="500">
      <div data-element="month-selector"></div>
      <div data-element="week-days"></div>
      <div data-element="month-days"></div>
      <div data-element="hour-selector"></div>
      <div data-element="actions">
        <button type="button" data-action="accept">{acceptText}</button>
        <button type="button" data-action="cancel">{cancelText}</button>
      </div>
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
    monthDay: '<div data-time="{time}" data-year="{year}" data-month="{month}" data-day="{day}" data-month-location="{monthLocation}" data-disabled="{disabled}">{text}</div>',
    hourSelector: '{hours}<span>:</span>{minutes}',
    select: '<select data-type="{dataType}">{options}</select>',
    selectOption: '<option value="{value}">{text}</option>'
  },

  data: {
    class: 'datetimepicker',
    outsideClose: true,
    acceptText: 'Accept',
    cancelText: 'Cancel'
  },

  listeners: {

    show: (detail) => {
      let selectedDay = detail.instance.getSelectedDayDate();
      let previousSelectedDay = detail.instance.previousSelectedDay || selectedDay;
      if (selectedDay && previousSelectedDay.getTime() !== selectedDay.getTime()) {
        detail.instance.setSelectedDay(previousSelectedDay, true);
      }
    },

    'action:click': (detail) => {
      if (detail.action === 'accept' && detail.dateTime) {
        detail.instance.previousSelectedDay = detail.dateTime;
      }
      detail.instance.hide();
    }
  },

  get methods() {
    return {

      buildHourSelector: (instance) => {
        let hourSelectorInputs = {};
        ['hours', 'minutes'].forEach((input) => {
          hourSelectorInputs[input] = instance.template.build('select', {
            dataType: input,
            options: instance[`${input}Range`]
              .map(item => instance.template.build('selectOption', { value: item, text: item }))
              .join('')
          });
        });
        instance.element('hour-selector').innerHTML = instance.template.build('hourSelector', hourSelectorInputs);
      },

      getHours: (instance) => {
        return this.methods.getTimePortion(instance, 'hours');
      },

      getMinutes: (instance) => {
        return this.methods.getTimePortion(instance, 'minutes');
      },

      getTimePortion: (instance, portion) => {
        return parseInt(instance.element('hour-selector').querySelector(`[data-type="${portion}"]`).value, 10);
      }
    };
  }
};
