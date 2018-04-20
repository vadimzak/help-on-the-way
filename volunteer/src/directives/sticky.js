import StickyState from 'sticky-state'
import _ from 'lodash'
require('sticky-state/dist/sticky-state.css')

export default {
  inserted: function (el, binding) {
    el.style.top = el.style.top || '1px'
    el.classList.add('sticky')
    const sticky = new StickyState(el)
    if (binding.value && _.isObject(binding.value)) {
      if (_.isFunction(binding.value.onStickyStart)) {
        sticky.on('sticky:on', (e) => binding.value.onStickyStart(e))
      }
      if (_.isFunction(binding.value.onStickyOff)) {
        sticky.on('sticky:off', (e) => binding.value.onStickyOff(e))
      }
    }
  }
}
