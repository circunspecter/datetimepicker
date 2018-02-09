require('./jsdom');
const chai = require('chai');
const assert = chai.assert;

require('babel-register')({
  only: [
    '/src',
    '/node_modules/@circunspecter'
  ],
  cache: false
});

const Datetimepicker = require('../src/Datetimepicker');

describe('Datetimepicker', () => {
  let datetimepicker;

  beforeEach(function() {
    document.body.innerHTML = '';
    datetimepicker = new Datetimepicker();
  });

  describe('constructor()', () => {
    it('Initializes.', () => {
      if (!document.body.children.length || document.body.children[0].className !== 'datetimepicker') {
        throw new Error('Initialization fails.');
      }
    });

    it('Prevent initialization.', () => {
      document.body.innerHTML = '';
      datetimepicker = new Datetimepicker({}, false);
      if (document.body.children.length) {
        throw new Error('Prevent initialization fails.');
      }
    });

    it('All parameters are optional.', () => {
      new Datetimepicker();
    });

    it("Doesn't fail when empty template is provided.", () => {
      new Datetimepicker({ template: {} });
    });
  });

  describe('buildCalendar()', () => {
    it('Sets selected day.', () => {
      let date = '2025-02-15';
      document.body.innerHTML = '';
      datetimepicker = new Datetimepicker({ selectedDate: date });
      assert.strictEqual(
        datetimepicker.element('month-days').dataset.selected,
        (new Date(date)).getTime().toString()
      );
    });

    it('Listens to month change requests.', () => {
      let success;
      let clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true
      });

      document.body.children[0].addEventListener('dtp:month:change', () => {
        success = true;
      });

      document.body
        .querySelector('[data-element="month-selector"] [data-action="prev"]')
        .dispatchEvent(clickEvent);

      assert.strictEqual(success, true);
    });

    it('Listens to days clicks.', () => {
      let success;
      let clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true
      });

      document.body.children[0].addEventListener('dtp:day:click', () => {
        success = true;
      });

      document.body
        .querySelector('[data-element="month-days"] div')
        .dispatchEvent(clickEvent);

      assert.strictEqual(success, true);
    });

    it('Listens to actions clicks.', () => {
      let success;
      let clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true
      });

      document.body.children[0].addEventListener('dtp:action:click', (e) => {
        success = (e.detail.action === 'accept');
      });

      document.body
        .querySelector('[data-element="actions"] [data-action="accept"]')
        .dispatchEvent(clickEvent);

      assert.strictEqual(success, true);
    });
  });

  describe('changeMonth()', () => {
    it('Changes month.', () => {
      let success;
      let today = new Date();
      let currMonth;
      let clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true
      });

      document.body.children[0].addEventListener('dtp:month:change', () => {
        success = (success !== false && datetimepicker.calendar.date.getMonth() === currMonth.getMonth());
      });

      // Prev
      currMonth = new Date(today.setMonth(today.getMonth() - 1));
      datetimepicker
        .element('month-selector')
        .querySelector('[data-action="prev"]')
        .dispatchEvent(clickEvent);

      // Next
      currMonth = new Date(today.setMonth(today.getMonth() + 1));
      datetimepicker
        .element('month-selector')
        .querySelector('[data-action="next"]')
        .dispatchEvent(clickEvent);

      assert.strictEqual(success, true);
    });
  });

  describe('refreshCalendar()', () => {
    it('Limits the selection of dates according to conf.', () => {
      document.body.innerHTML = '';
      datetimepicker = new Datetimepicker({
        selectedDate: '2025-02-05',
        minDate: '2025-02-02',
        maxDate: '2025-02-10'
      });

      let monthSelector = document.body.querySelector('[data-element="month-selector"]');
      let monthDays = document.body.querySelector('[data-element="month-days"]');
      let success = (
        monthSelector.querySelector('[data-action="prev"]').dataset.disabled === 'true' &&
        monthSelector.querySelector('[data-action="next"]').dataset.disabled === 'true' &&
        monthDays.querySelector('[data-day="7"]').dataset.disabled === 'false' &&
        monthDays.querySelector('[data-day="15"]').dataset.disabled === 'true'
      );

      assert.strictEqual(success, true);
    });
  });

  describe('show()', () => {
    it('Auto-selects the accepted date when it opens.', () => {
      let clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true
      });
      let selectedDay;

      document.body.innerHTML = '';
      datetimepicker = new Datetimepicker({
        selectedDate: '2025-02-15'
      });

      // Store & accept selected day
      datetimepicker.show();
      selectedDay = datetimepicker.element('month-days')
        .querySelector('[data-selected="true"]');
      datetimepicker.element('actions')
        .querySelector('[data-action="accept"]')
        .dispatchEvent(clickEvent);

      // Reopen, change selected day and cancel
      datetimepicker.show();
      datetimepicker.setSelectedDay('2025-02-16', false);
      datetimepicker.element('actions')
        .querySelector('[data-action="cancel"]')
        .dispatchEvent(clickEvent);

      // Reopen and check the selected day
      datetimepicker.show();
      assert.strictEqual(
        selectedDay.isEqualNode(datetimepicker.element('month-days').querySelector('[data-selected="true"]')),
        true
      );
    });
  });

  describe('setSelectedDay()', () => {
    it("Doesn't fail when selects a day from another month.", () => {
      datetimepicker.setSelectedDay('2017-01-01', false);
    });
  });

  describe('setLimitDate()', () => {
    it('Only attends to "min" and "max" types.', () => {
      datetimepicker.setLimitDate('foo');
      assert.strictEqual(datetimepicker.fooDate, undefined);
    });

    it('Refresh the calendar by default.', () => {
      document.body.innerHTML = '';
      datetimepicker = new Datetimepicker({
        selectedDate: '2025-02-01'
      });

      let monthDays = document.body.querySelector('[data-element="month-days"]');
      let success = (monthDays.querySelector('[data-day="10"]').dataset.disabled === 'false');

      datetimepicker.setLimitDate('max', '2025-02-09');

      success = (
        success === true &&
        monthDays.querySelector('[data-day="10"]').dataset.disabled === 'true'
      );
      assert.strictEqual(success, true);
    });

    it("It's possible to not refresh the calendar.", () => {
      document.body.innerHTML = '';
      datetimepicker = new Datetimepicker({
        selectedDate: '2025-02-01'
      });

      let monthDays = document.body.querySelector('[data-element="month-days"]');
      let success = (monthDays.querySelector('[data-day="10"]').dataset.disabled === 'false');

      datetimepicker.setLimitDate('max', '2025-02-09', false);

      success = (
        success === true &&
        monthDays.querySelector('[data-day="10"]').dataset.disabled === 'false'
      );
      assert.strictEqual(success, true);
    });

    it('Auto-selects the limit date when the current one is out of range.', () => {
      document.body.innerHTML = '';
      datetimepicker = new Datetimepicker({
        selectedDate: '2025-02-15'
      });

      let monthDays = document.body.querySelector('[data-element="month-days"]');
      let success = (monthDays.querySelector('[data-selected="true"]').dataset.day === '15');

      datetimepicker.setLimitDate('max', '2025-02-10', true);
      success = (
        success === true &&
        monthDays.querySelector('[data-selected="true"]').dataset.day === '10'
      );

      datetimepicker.setSelectedDay('2025-02-01');
      success = (
        success === true &&
        monthDays.querySelector('[data-selected="true"]').dataset.day === '1'
      );

      datetimepicker.setLimitDate('min', '2025-02-05', true);
      success = (
        success === true &&
        monthDays.querySelector('[data-selected="true"]').dataset.day === '5'
      );

      assert.strictEqual(success, true);
    });
  });

  describe('getDayElementByDate()', () => {
    it("Doesn't fail when an invalid date is provided.", () => {
      datetimepicker.getDayElementByDate('foo');
    });
  });

  describe('getHours()', () => {
    it('Returns "0" when template skips the hour selector.', () => {
      document.body.innerHTML = '';
      datetimepicker = new Datetimepicker({
        template: {}
      });
      assert.strictEqual(datetimepicker.getHours(), 0);
    });
  });

  describe('getMinutes()', () => {
    it('Returns "0" when template skips the minutes selector.', () => {
      document.body.innerHTML = '';
      datetimepicker = new Datetimepicker({
        template: {}
      });
      assert.strictEqual(datetimepicker.getMinutes(), 0);
    });
  });

  describe('addListenerContainer()', () => {
    it('Triggers listener only when the target matches.', () => {
      let success = true;
      let clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true
      });

      datetimepicker.addListenerContainer(datetimepicker.element('month-days'), 'click', () => {
        success = false;
      }, (target) => {
        return (target.dataset && target.dataset.day && target.dataset.disabled === 'false');
      });
      datetimepicker.element('month-days').dispatchEvent(clickEvent);
      assert.strictEqual(success, true);
    });
  });
});
