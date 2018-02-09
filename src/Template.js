import Template from '@circunspecter/modi/src/Template';

export default class extends Template {
  constructor(config, data) {
    super(config, data);
    this.partials = config.partials || {};
  }

  /**
   * Get template partial.
   * @param {string} name Partial name.
   * @return {string} Partial content.
   */
  getPartial(name) {
    return this.partials[name] || '';
  }

  /**
   * Make template replacements.
   * @param {string} tpl Template.
   * @param {object} data Replacements.
   * @return {string}
   */
  build(tpl, data) {
    return super.build(this.getPartial(tpl) || tpl, data);
  }
}
