import Calendar from '@circunspecter/calendar';
import Dom from '@circunspecter/modi/src/Dom';
import Modi from '@circunspecter/modi/src/Modal';
import Template from './Template';
import templateDefaultConfig from './templates/default/config.js';

export default class extends Modi {
  constructor(config = {}, initialize) {
    config = Object.assign({
      eventsNamespace: 'dtp',
      template: config.template || templateDefaultConfig,
      minDate: null,
      maxDate: null,
      selectedDate: null,
      calendar: {
        week: {
          namesType: 'mini'
        }
      }
    }, config);

    // Modal
    super(config, false);

    // Calendar
    this.calendar = new Calendar({
      week: this.config.calendar.week,
      month: this.config.calendar.month
    });
    this.setLimitDate('min', this.config.minDate, false);
    this.setLimitDate('max', this.config.maxDate, false);
    this.selectedDate = this.parseDate(this.config.selectedDate) || new Date();
    this.hoursRange = [...Array(24).keys()].map(i => ('0' + i).slice(-2));
    this.minutesRange = [...Array(12).keys()].map(i => ('0' + (i * 5)).slice(-2));

    // Template
    this.template = new Template(this.config.template, this.config.data);

    if (initialize !== false) {
      this.create();
    }
  }

  /**
   * Create datepicker.
   * @param {string} contents Modal content.
   */
  create(contents) {
    super.create(contents);
    this.buildCalendar();
  }

  /**
   * Build calendar.
   */
  buildCalendar() {
    // Week days names
    if (this.element('week-days')) {
      this.element('week-days').innerHTML = this.calendar.week.getDays()
        .map(day => this.template.build('weekDay', { text: day }))
        .join('');
    }

    // Hour selector
    if (this.template.methods.buildHourSelector) {
      this.template.methods.buildHourSelector(this);
    }

    // Set selected day
    this.setSelectedDay(this.selectedDate, true);

    // Month selector handler
    this.addListenerContainer(this.element('month-selector'), 'click', (target) => {
      let diff = (target.dataset.action === 'prev') ? -1 : 1;
      this.changeMonth(this.calendar.month.getSibling(diff).date);
    }, (target) => {
      return (target.dataset && target.dataset.action && true);
    });

    // Day click handler
    this.addListenerContainer(this.element('month-days'), 'click', (target) => {
      this.setSelectedDay(new Date(parseInt(target.dataset.time, 10)), true);
      let selectedDate = this.getSelectedDayDate();
      this.dispatchEvent('day:click', {
        element: target,
        dateTime: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          this.getHours(),
          this.getMinutes(),
          0, 0
        )
      });
    }, (target) => {
      return (target.dataset && target.dataset.day && target.dataset.disabled === 'false');
    });

    // Actions handler
    this.addListenerContainer(this.element('actions'), 'click', (target) => {
      let selectedDate = this.getSelectedDayDate();
      this.dispatchEvent('action:click', {
        element: target,
        action: target.dataset.action,
        dateTime: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          this.getHours(),
          this.getMinutes(),
          0, 0
        )
      });
    }, (target) => {
      return (target.dataset && target.dataset.action && true);
    });
  }

  /**
   * Change selected month.
   * @param {Date} date New date.
   */
  changeMonth(date) {
    // Set calendar date
    this.calendar.setDate(date);

    // Change calendar selected month
    Dom.data.set(this.element('month-selector'), 'selected', date.getTime());

    // Render calendar
    this.refreshCalendar();

    // Dispatch month change event
    this.dispatchEvent('month:change', {
      date: date
    });
  }

  /**
   * Refresh calendar.
   */
  refreshCalendar() {
    // Month selector
    let prevMonth = this.calendar.month.getSibling(-1);
    let nextMonth = this.calendar.month.getSibling(1);
    this.element('month-selector').innerHTML = this.template.build('monthSelector', {
      currentMonthText: `${this.calendar.month.getName()} ${this.calendar.month.getYear()}`,
      prevTime: prevMonth.getTime(),
      prevText: `${prevMonth.getName()} ${prevMonth.getYear()}`,
      prevDisabled: (this.isValidDate(this.minDate) && prevMonth.getLastDay().getEnd().getTime() < this.minDate.getTime()),
      nextTime: nextMonth.getTime(),
      nextText: `${nextMonth.getName()} ${nextMonth.getYear()}`,
      nextDisabled: (this.isValidDate(this.maxDate) && nextMonth.getFirstDay().getStart().getTime() > this.maxDate.getTime())
    });

    // Month days
    let monthLocation = '';
    this.element('month-days').innerHTML = this.calendar.month.getDays()
      .map((day) => {
        if (day.getMonth() < this.calendar.date.getMonth()) {
          monthLocation = 'previous';
        } else if (day.getMonth() > this.calendar.date.getMonth()) {
          monthLocation = 'next';
        } else {
          monthLocation = 'current';
        }

        return this.template.build('monthDay', {
          time: day.getStart().getTime(),
          year: day.getYear(),
          month: day.getMonth(),
          day: day.getNumber(),
          text: day.getNumber(),
          monthLocation: monthLocation,
          disabled: (
            (this.isValidDate(this.minDate) && day.getEnd().getTime() < this.minDate.getTime()) ||
            (this.isValidDate(this.maxDate) && day.getStart().getTime() > this.maxDate.getTime())
          )
        });
      })
      .join('');

    // Highlight selected day when needed
    this.setSelectedDay(this.getSelectedDayDate(), false);
  }

  /**
   * Set selected day.
   * @param {string|number|Date} day Date object.
   * @param {boolean} changeMonth Change month automatically.
   */
  setSelectedDay(day, changeMonth) {
    day = new Date(day);
    if (this.isValidDate(day) && this.element('month-days') && this.element('month-selector')) {
      // Set selected day.
      this.element('month-days').dataset.selected = day.getTime();
      // Change month when necessary.
      let selectedMonth = new Date(parseInt(this.element('month-selector').dataset.selected, 10));
      if (
        changeMonth === true &&
        `${day.getFullYear()}${day.getMonth()}` !== `${selectedMonth.getFullYear()}${selectedMonth.getMonth()}`
      ) {
        this.changeMonth(day);
      } else {
        // Flag selected day.
        let dayElement = this.getDayElementByDate(day);
        for (const monthDay of this.element('month-days').querySelectorAll('div')) {
          monthDay.dataset.selected = '';
        }
        if (dayElement) {
          dayElement.dataset.selected = 'true';
        }
      }
    }
  }

  /**
   * Set limit date.
   * @param {string} type Limit type: min or max.
   * @param {string|number|Date} date Limit date.
   * @param {boolean} refresh Refresh calendar.
   */
  setLimitDate(type, date, refresh) {
    if (['min', 'max'].indexOf(type) !== -1) {
      let property = `${type}Date`;
      this[property] = this.parseDate(date, this[property]);
      if (refresh !== false) {
        if (
          (type === 'min' && this.getSelectedDayDate() < this.minDate) ||
          (type === 'max' && this.getSelectedDayDate() > this.maxDate)
        ) {
          this.setSelectedDay(this[property], true);
        }
        this.refreshCalendar();
      }
    }
  }

  /**
   * Get day element by date.
   * @param {string|number|Date} date Day date.
   * @return {Element|undefined}
   */
  getDayElementByDate(date) {
    date = this.parseDate(date);
    if (date) {
      return this.element('month-days').querySelector(
        `[data-year="${date.getFullYear()}"][data-month="${date.getMonth()}"][data-day="${date.getDate()}"]`
      );
    }
  }

  /**
   * Get selected day.
   * @param {mixed} def Value to return when it fails.
   * @return {Date|mixed}
   */
  getSelectedDayDate(def) {
    return this.parseDate(parseInt(this.element('month-days').dataset.selected, 10), def);
  }

  /**
   * Get selected hour.
   * @return {number|undefined}
   */
  getHours() {
    return (this.template.methods.getHours) ?
      this.template.methods.getHours(this) :
      0;
  }

  /**
   * Get selected minutes.
   * @return {number|undefined}
   */
  getMinutes() {
    return (this.template.methods.getMinutes) ?
      this.template.methods.getMinutes(this) :
      0;
  }

  /**
   * Adds specified event listener and stores it inside listeners collection.
   * @param {Element} element Target element.
   * @param {string} type Event type.
   * @param {function|EventListener} listener Event handler.
   * @param {function} matchCheck Target match check function.
   */
  addListenerContainer(element, type, listener, matchCheck) {
    super.addListener(type, (e) => {
      let target = e.target;

      while (target) {
        if (matchCheck(target) === true) {
          break;
        }
        target = target.parentNode;
      }

      if (target) {
        listener(target);
      }
    }, element);
  }

  /**
   * Parse date.
   * @param {string|number|Date} date Date.
   * @param {mixed} def Value to return when it fails.
   * @return {Date|mixed}
   */
  parseDate(date, def) {
    date = new Date(date);
    return this.isValidDate(date) ? date : def;
  }

  /**
   * Check for a valid date object.
   * @param {mixed} operand Operand.
   * @return {boolean}
   */
  isValidDate(operand) {
    return (
      operand !== null &&
      typeof operand === 'object' &&
      operand.constructor === (new Date()).constructor &&
      operand.getTime() > 0
    );
  }
}
