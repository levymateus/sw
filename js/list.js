const List = (items) => {

  const root = document.createElement('ul')
  document.getElementById('root').appendChild(root)

  function append(text) {
    if (root) {
      const li = document.createElement('li')
      li.innerHTML = text
      root.appendChild(li)
      return li
    }
    return null
  }

  const props = ({
    items: new Set([]),
    push: function(item) {
      if (!this.items.has(item)) {
        this.items.add(item)
        return append(item)
      }
      return null
    },
    concat: function(items) {
      items.forEach(item => this.push(item))
    }
  })

  props.push.bind(props)
  props.concat.bind(props)

  if (items && items.length) {
    props.concat(items)
  }

  return props
}

export default List
