var { h } = require('mutant')
var nest = require('depnest')

exports.needs = nest({
  'intl.sync.i18n': 'first',
  'sheet.editTags': 'first'
})

exports.gives = nest('message.html.action')

exports.create = (api) => {
  const i18n = api.intl.sync.i18n
  return nest('message.html.action', msg => {
    return h('a.tag', {
      href: '#',
      'ev-click': (ev) => api.sheet.editTags({ msgId: msg.key }, (err, tags) => {
        console.log(err, tags)
        ev.target.classList.add(err ? 'alert' : 'success')
        setTimeout(() => ev.target.classList.remove(err ? 'alert' : 'success'), 500)
      })
    }, i18n('Tag'))
  })
}
